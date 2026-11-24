# musiqul-dev Makefile
# Common development tasks for the musiqul project

.PHONY: help build test start stop clean setup migrate-up migrate-info migrate-validate migrate-clean db-reset db-dump db-restore dev-api dev-web dev lint jooq-generate

# Default target
help:
	@echo "Available commands:"
	@echo "  setup          - Initial project setup"
	@echo "  build          - Build all services"
	@echo "  test           - Run all tests"
	@echo "  start          - Start all services in background"
	@echo "  stop           - Stop all services"
	@echo "  clean          - Clean build artifacts"
	@echo "  dev            - Start development environment"
	@echo "  dev-api        - Start API development server"
	@echo "  dev-web        - Start web development server"
	@echo "  migrate-up     - Run database migrations"
	@echo "  migrate-info   - Show migration status"
	@echo "  migrate-validate - Validate applied migrations"
	@echo "  migrate-clean  - Clean database"
	@echo "  db-reset       - Recreate the database volume, run migrations and regenerate JOOQ classes"
	@echo "  db-dump        - Dump the database to DUMP_FILE (default: msqdb-backup.sql)"
	@echo "  db-restore     - Restore DUMP_FILE into an empty database"
	@echo "  jooq-generate  - Generate JOOQ classes from database"
	@echo "  lint           - Run linting on web project"

# Initial setup
setup:
	@echo "Setting up project..."
	docker compose pull
	cd web && npm install

# Build all services
build:
	@echo "Building all services..."
	docker compose build

# Run tests
test:
	@echo "Running API tests..."
	cd api && ./gradlew test
	@echo "Running web linting..."
	cd web && npm run lint

# Start all services in background
start:
	@echo "Starting all services..."
	docker compose up -d

# Stop all services
stop:
	@echo "Stopping all services..."
	docker compose down

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	cd api && ./gradlew clean
	cd web && rm -rf .next node_modules/.cache

# Development environment
dev:
	@echo "Starting development environment..."
	docker compose up

# API development
dev-api:
	@echo "Starting API development server..."
	cd api && ./gradlew bootRun --args='--spring.profiles.active=local'

# Web development
dev-web:
	@echo "Starting web development server..."
	cd web && npm run dev

# Database migrations
migrate-up:
	@echo "Running database migrations..."
	docker compose run --rm flyway migrate

migrate-info:
	@echo "Checking migration status..."
	docker compose run --rm flyway info

migrate-validate:
	@echo "Validating migrations..."
	docker compose run --rm flyway validate

migrate-clean:
	@echo "Cleaning database..."
	docker compose run --rm flyway clean

# JOOQ code generation
jooq-generate:
	@echo "Generating JOOQ classes from database..."
	cd api && ./gradlew generateJooq

# Linting
lint:
	@echo "Running web linting..."
	cd web && npm run lint

# Reset database (recreate the db-data volume), run migrations and regenerate JOOQ classes
db-reset:
	docker compose down db -v
	docker compose up -d --wait db
	@$(MAKE) migrate-up
	@$(MAKE) jooq-generate

# Dump / restore the database (e.g. when upgrading the PostgreSQL major version)
DUMP_FILE ?= msqdb-backup.sql

db-dump:
	@echo "Dumping database to $(DUMP_FILE)..."
	docker compose exec -T db pg_dump -U pgadmin -d msqdb --no-owner > $(DUMP_FILE)

db-restore:
	@echo "Restoring database from $(DUMP_FILE)..."
	docker compose exec -T db psql -U pgadmin -d msqdb -v ON_ERROR_STOP=1 -q < $(DUMP_FILE)
