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
    role VARCHAR(20) NOT NULL,
    goals JSONB[] DEFAULT '{}'::JSON[]
);




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






