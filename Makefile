# musiqul-dev Makefile
# Common development tasks for the musiqul project

.PHONY: help build test start stop clean setup migrate-up migrate-info migrate-clean dev-api dev-web dev lint jooq-generate

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
	@echo "  migrate-clean  - Clean database"
	@echo "  jooq-generate  - Generate JOOQ classes from database"
	@echo "  lint           - Run linting on web project"

# Initial setup
setup:
	@echo "Setting up project..."
	docker-compose pull
	cd workspace/musiqul-web && npm install

# Build all services
build:
	@echo "Building all services..."
	docker-compose build

# Run tests
test:
	@echo "Running API tests..."
	cd workspace/musiqul-api && ./gradlew test
	@echo "Running web linting..."
	cd workspace/musiqul-web && npm run lint

# Start all services in background
start:
	@echo "Starting all services..."
	docker-compose up -d

# Stop all services
stop:
	@echo "Stopping all services..."
	docker-compose down

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	cd workspace/musiqul-api && ./gradlew clean
	cd workspace/musiqul-web && rm -rf .next node_modules/.cache

# Development environment
dev: migrate-up
	@echo "Starting development environment..."
	docker-compose up

# API development
dev-api:
	@echo "Starting API development server..."
	cd workspace/musiqul-api && ./gradlew bootRun

# Web development
dev-web:
	@echo "Starting web development server..."
	cd workspace/musiqul-web && npm run dev

# Database migrations
migrate-up:
	@echo "Running database migrations..."
	docker-compose run --rm flyway migrate

migrate-info:
	@echo "Checking migration status..."
	docker-compose run --rm flyway info

migrate-clean:
	@echo "Cleaning database..."
	docker-compose run --rm flyway clean

# JOOQ code generation
jooq-generate: migrate-up
	@echo "Generating JOOQ classes from database..."
	cd workspace/musiqul-api && ./gradlew generateJooq

# Linting
lint:
	@echo "Running web linting..."
	cd workspace/musiqul-web && npm run lint