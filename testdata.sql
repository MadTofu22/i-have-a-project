-- Test Data Updated 1/4/2021

-- User Test Data

INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company", "designer_id")
VALUES ('simong@gmail.com', 'link', 'manager', 'Simon', 'Germscheid', 'Prime Digital Academy', null),
('tstutler@gmail.com', 'biscuits', 'admin', 'Tom', 'Stutler', 'Prime Digital Academy', null),
('elliotmalc@gmail.com', 'alchemy', 'designer', 'Elliot', 'Malcolm', 'Prime Digital Academy', '2'),
('rsmith@gmail.com', 'travis<3', 'designer', 'Rachel', 'Smith', 'Prime Digital Academy', '1'),
('peterp@gmail.com', '2021', 'manager', 'Peter', 'P', 'Prime Digital Academy', null);

-- Project Test Data 

INSERT INTO "projects" ("manager_id", "status", "due_date", "start", "notes", "project_name")
VALUES ('1', 'Active', '10.10.2021', '9.10.2020', 'a current project for manager 1', 'October2021 Project'),
('2', 'Inactive', '11.11.2020', '8.23.2020', 'a finished project for manager 2', 'November2020 Project'),
('1', 'Active', '2.02.2021', '1.02.2021', 'a current project for manager 1', 'February2021 Project');

-- Skills Test Data

INSERT INTO "skills" ("designer_id", "proficiency", "label")
VALUES ('1', '5', 'feng shui'), ('1', '5', 'communication'), ('1', '5', 'time management'), ('2', '3', 'feng shui'), ('2', '1', 'communication'), ('2', '4', 'softwares');


-- Designers Test Data

INSERT INTO "designers" ("manager_id", "phone", "linkedin", "photo", "rate", "availability_hours", "weekend_availability")
VALUES ('2', '6124387648', 'www.linkedin.com', 'photoURL', '25', '30', 'true'),
('1', '6513986342', 'www.linkedin.com', 'photoURL', '35', '20', 'false');

-- TEST DATA FOR GET PRFOFILE
-- Added by Tom S
insert into career (designer_id, title, "location")
values ('1', 'Supervisor', 'CIA'),
('1', 'Clerk', 'FAA'),
('1', 'Analyst', 'NSA');

insert into education (designer_id, "degree", "location")
values ('1', 'MBA', 'Harvard'),
('1', 'PhD Bio-Physics', 'MIT');

insert into skills (designer_id, proficiency, label)
value ('1', '4', 'Communication'),
('1', '5', 'Modern Style'),
('1', '1', 'Cowyboy Theme');

insert into software (label)
values ('AutoCAD'), ('Blendr'), ('Adobe Illustrator'), ('MS Paint'), ('FreeCAD');

insert into designer_software_join (designer_id, "label", proficient)
values ('1', '1', true),
('1', '2', false),
('1', '3', true),
('1', '4', false),
('1', '5', false);