DROP TABLE musiqul_command.recruitment_required_generation;

DROP TYPE flyway.required_generation_type;

CREATE TYPE musiqul_command.required_generation_type AS ENUM (
    'TEEN',
    'TWENTIES',
    'THIRTIES',
    'FORTIES',
    'FIFTIES',
    'MORE_THAN_SIXTIES'
    );

CREATE TABLE musiqul_command.recruitment_required_generation
(
    recruitment_id  uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    generation_type musiqul_command.required_generation_type NOT NULL,
    UNIQUE (recruitment_id, generation_type)
)