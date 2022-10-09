CREATE TABLE sharks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

INSERT INTO sharks
    (name, color)
VALUES 
    ('sammy', 'blue'),
    ('george', 'green')