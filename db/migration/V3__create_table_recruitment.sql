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
    'GITTER',
    'ELECTRIC_BASE',
    'DRUM',
    'KEY_BOARD',
    'PIANO',
    'VIOLIN',
    'OTHER'
    );

CREATE TYPE musiqul_command.gender_type AS ENUM (
    'MALE_ONLY',
    'FEMALE_ONLY',
    'ALL'
    );

CREATE TYPE musiqul_command.recruitment_status_type AS ENUM (
    'OPEN',
    'CLOSE'
    );

CREATE TABLE musiqul_command.player
(
    player_id uuid PRIMARY KEY
);

CREATE TABLE musiqul_command.recruitment
(
    recruitment_id     uuid PRIMARY KEY,
    name               VARCHAR(100)                            NOT NULL,
    owner_id           uuid                                    NOT NULL REFERENCES musiqul_command.player (player_id),
    song_title         VARCHAR(500)                            NOT NULL,
    artist             VARCHAR(100)                            NOT NULL,
    required_age_range int4range,
    required_gender    musiqul_command.gender_type             NOT NULL,
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

CREATE TABLE musiqul_command.recruited_instrument
(
    recruitment_id uuid REFERENCES musiqul_command.recruitment (recruitment_id),
    instrument     musiqul_command.instrument_type NOT NULL,
    count          smallint                        NOT NULL,
    UNIQUE (recruitment_id, instrument)
)