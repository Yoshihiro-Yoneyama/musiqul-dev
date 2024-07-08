CREATE TABLE musiqul_command.recruitment_required_generation
(
    recruitment_id uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    generation_type required_generation_type NOT NULL ,
    UNIQUE (recruitment_id, generation_type)
)