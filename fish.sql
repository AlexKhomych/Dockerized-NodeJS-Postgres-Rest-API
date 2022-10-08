CREATE TABLE shark(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

INSERT INTO shark
    (name, color)
VALUES 
    ('sammy', 'blue'),
    ('george', 'green')