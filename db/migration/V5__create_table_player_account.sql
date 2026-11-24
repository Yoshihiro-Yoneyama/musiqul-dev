CREATE TABLE musiqul_command.player_account (
    player_id     UUID         NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_player_account PRIMARY KEY (player_id),
    CONSTRAINT uq_player_account_email UNIQUE (email)
);

-- 1アカウント = 1 player。player.player_id をそのまま player_account への FK にすることで
-- 「アカウントなき player は存在しない」「1アカウントにつき高々1 player」を DB で保証する。
ALTER TABLE musiqul_command.player
    ADD CONSTRAINT fk_player_player_account
        FOREIGN KEY (player_id) REFERENCES musiqul_command.player_account (player_id);
