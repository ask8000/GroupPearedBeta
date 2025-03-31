CREATE TABLE submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    approved BOOLEAN DEFAULT FALSE
);