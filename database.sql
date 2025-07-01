CREATE DATABASE studentdata;

USE studentdata;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  grade VARCHAR(10)
);
