CREATE TABLE musiqul_query.recruitment
(
    recruitment_id uuid primary key ,
    recruitment_name text,
    owner_id uuid UNIQUE ,
    song_title text,
    artist text,
    genre text[],
    gender text[],
    generation text[],
    instrument text[]
);

CREATE TABLE musiqul_query.recruitment_owner
(
    owner_id uuid primary key REFERENCES musiqul_query.recruitment(owner_id),
    owner_name text
);