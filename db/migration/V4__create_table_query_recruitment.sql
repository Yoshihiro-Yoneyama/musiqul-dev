CREATE TABLE musiqul_query.recruitment
(
    recruitment_id uuid PRIMARY KEY ,
    recruitment_name TEXT,
    owner_id uuid UNIQUE,
    genres TEXT[],
    song_title TEXT,
    artist TEXT,
    gender TEXT,
    generations TEXT[],
    instruments TEXT[]
);

CREATE TABLE musiqul_query.recruitment_owner
(
    owner_id uuid primary key REFERENCES musiqul_query.recruitment(owner_id),
    owner_name text
);