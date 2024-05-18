CREATE DATABASE goals_app;

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    goal_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('simple', 'admin')) DEFAULT 'simple',
    goals JSONB[] DEFAULT '{}'::JSON[]
);

CREATE TABLE goal_categories(
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL
);

INSERT INTO goal_categories (name) VALUES ('daily'), ('weekly'), ('monthly'), ('yearly');

INSERT INTO users (username, password, role) VALUES ('admin', '123', 'admin');

ALTER TABLE goals ADD COLUMN category_id INT, ADD CONSTRAINT fk_goal_category FOREIGN KEY (category_id) REFERENCES goal_categories(id);

-- jei gaunamas error terminale: value too long for type character varying(50) :

ALTER TABLE users
ALTER COLUMN username TYPE VARCHAR(255),
ALTER COLUMN password TYPE VARCHAR(255),
ALTER COLUMN role TYPE VARCHAR(255);

-- for myself:


-- !LAUNCH:

-- psql -U <user>

-- ! NAVIGATE:

-- \c <database>

-- ! DB LIST:

-- \l

-- ! RELATIONS LIST:

-- \dt

-- !CHECK TABLE CONTENT:

-- SELECT * FROM <table>;

-- !POSTGRES START/END/RESTART COMMANDS:
-- nepamirstam serveri stopinti atsijunge is psql

-- pg_ctl start -D "C:/Program Files/PostgreSQL/16/data"
-- pg_ctl stop -D "C:/Program Files/PostgreSQL/16/data"
-- pg_ctl restart -D "C:/Program Files/PostgreSQL/16/data"






