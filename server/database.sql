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

ALTER TABLE goals ADD COLUMN category_id INT, ADD CONSTRAINT fk_goal_category FOREIGN KEY (category_id) REFERENCES goal_categories(id);



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

-- pg_ctl start -D "C:/Program Files/PostgreSQL/16/data"
-- pg_ctl stop -D "C:/Program Files/PostgreSQL/16/data"
-- pg_ctl restart -D "C:/Program Files/PostgreSQL/16/data"






