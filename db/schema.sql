DROP DATABASE IF EXISTS corporate_db;
CREATE DATABASE corporate_db;
USE corporate_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;



CREATE TABLE department (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE employee {
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  manager_id INT
};

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_in (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) 
  REFERENCES department(id) ON DELETE CASCADE
);



