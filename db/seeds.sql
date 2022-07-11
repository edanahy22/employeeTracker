INSERT INTO department (d_name)
VALUES ("Software Design"),
       ("Human Resources"),
       ("Project Management");

INSERT INTO e_role (title, salary, department_id)
VALUES ("Engineer", 100000, 1),
       ("Human Resources Specialist", 80000, 2),
       ("Manager", 100000, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Spongebob", "Squarepants", 3, 1),
       ("Squidward", "Tenticles", 3, 2),
       ("Eugiene", "Krabs", null, 3); 
       
     
