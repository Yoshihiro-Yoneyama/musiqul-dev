CREATE TYPE musiqul_command.music_genre_type AS ENUM (
    'ROCK',
    'J_POP',
    'ANIME',
    'JAZZ',
    'CLASSIC',
    'METAL',
    'OTHER'
    );

CREATE TYPE musiqul_command.instrument_type AS ENUM (
    'VOCAL',
    'GUITAR',
    'ELECTRIC_BASE',
    'DRUM',
    'KEY_BOARD',
    'PIANO',
    'VIOLIN',
    'OTHER'
    );

CREATE TYPE musiqul_command.required_gender_type AS ENUM (
    'MALE_ONLY',
    'FEMALE_ONLY',
    'OTHER'
    );

CREATE TYPE musiqul_command.recruitment_status_type AS ENUM (
    'OPEN',
    'CLOSE'
    );

CREATE TYPE musiqul_command.required_generation_type AS ENUM (
    'TEEN',
    'TWENTIES',
    'THIRTIES',
    'FORTIES',
    'FIFTIES',
    'MORE_THAN_SIXTIES'
    );

CREATE TABLE musiqul_command.player
(
    player_id uuid PRIMARY KEY
);

CREATE TABLE musiqul_command.recruitment
(
    recruitment_id     uuid PRIMARY KEY,
    owner_id           uuid                                    NOT NULL REFERENCES musiqul_command.player (player_id),
    song_title         VARCHAR(500)                            NOT NULL,
    artist             VARCHAR(100)                            NOT NULL,
    name               VARCHAR(100)                            NOT NULL,
    deadline           timestamp                               NOT NULL,
    memo               VARCHAR(2000)                           NOT NULL,
    status             musiqul_command.recruitment_status_type NOT NULL,
    deleted            boolean                                 NOT NULL
);

CREATE TABLE musiqul_command.recruitment_music_genre
(
    recruitment_id uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    genre          musiqul_command.music_genre_type NOT NULL,
    UNIQUE (recruitment_id, genre)
);

CREATE TABLE musiqul_command.recruitment_owner_instrument
(
    recruitment_id   uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    owner_instrument musiqul_command.instrument_type NOT NULL,
    UNIQUE (recruitment_id, owner_instrument)
);

CREATE TABLE musiqul_command.recruitment_required_gender
(
    recruitment_id uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    required_gender musiqul_command.required_gender_type NOT NULL,
    UNIQUE (recruitment_id, required_gender)
);

CREATE TABLE musiqul_command.recruitment_required_generation
(
    recruitment_id  uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    generation_type musiqul_command.required_generation_type NOT NULL,
    UNIQUE (recruitment_id, generation_type)
);

CREATE TABLE musiqul_command.recruitment_recruited_instrument
(
    recruitment_id uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    instrument     musiqul_command.instrument_type NOT NULL,
    count          smallint                        NOT NULL,
    UNIQUE (recruitment_id, instrument)
)

