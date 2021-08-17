CREATE TABLE books (
  id INT auto_increment,
  title VARCHAR(255),
  author VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  PRIMARY KEY(id)
)

INSERT INTO books (title, author) VALUES ('Kevin', 'Salina');


