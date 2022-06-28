INSERT INTO department (d_name)
VALUES ("Software Design"),
       ("Human Resources"),
       ("Project Management");

INSERT INTO e_role (title, salary, department_id)
VALUES ("Intern", 30000, 1),
       ("Manager", 150000, 2),
       ("Engineer", 100000, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Patrick", "Star", null, 1),
       ("Eugiene", "Krabs", 1, 2), 
       ("Spongebob", "Squarepants", null, 3);
     
