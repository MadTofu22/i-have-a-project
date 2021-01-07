-- Test Data Updated 1/5/2021

-- User Test Data

INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company", "designer_id")
VALUES ('simong@gmail.com', 'link', 'manager', 'Simon', 'Germscheid', 'Prime Digital Academy', null),
('tstutler@gmail.com', 'biscuits', 'manager', 'Tom', 'Stutler', 'Prime Digital Academy', null),
('elliotmalc@gmail.com', 'alchemy', 'designer', 'Elliot', 'Malcolm', 'Prime Digital Academy', '2'),
('rsmith@gmail.com', 'travis<3', 'designer', 'Rachel', 'Smith', 'Prime Digital Academy', '1'),
('peterp@gmail.com', '2021', 'manager', 'Peter', 'P', 'Prime Digital Academy', null),
('testManager1', 'test', 'manager', 'testManager1', 'testManager1', 'test1', null),
('testManager2', 'test', 'manager', 'testManager2', 'testManager2', 'test2', null),
('testDesigner1', 'test', 'designer', 'testDesigner1', 'testDesigner1', 'test1', '3'),
('testDesigner2', 'test', 'designer', 'testDesigner2', 'testDesigner2', 'test2', '4'),
('testDesigner3', 'test', 'designer', 'testDesigner3', 'testDesigner3', 'test1', '5'),
('testDesigner4', 'test', 'designer', 'testDesigner4', 'testDesigner4', 'test2', '6'),
('testDesigner5', 'test', 'designer', 'testDesigner5', 'testDesigner5', 'test1', '7');

-- Project Test Data 

INSERT INTO "projects" ("manager_id", "status", "due_date", "start", "notes", "project_name")
VALUES ('1', 'Active', '10.10.2021', '9.10.2020', 'a current project for manager 1', 'October2021 Project'),
('2', 'Inactive', '11.11.2020', '8.23.2020', 'a finished project for manager 2', 'November2020 Project'),
('1', 'Active', '2.02.2021', '1.02.2021', 'a current project for manager 1', 'February2021 Project'),
('7', 'active', '2/01/2021', '1/01/2021', 'project4', 'project4'),
('7', 'active', '2/01/2021', '1/01/2021', 'project5', 'project5'),
('7', 'active', '2/01/2021', '1/01/2021', 'project6', 'project6'),
('7', 'active', '2/01/2021', '1/01/2021', 'project7', 'project7'),
('7', 'active', '2/01/2021', '1/01/2021', 'project8', 'project8');

-- Designers Test Data

INSERT INTO "designers" ("manager_id", "phone", "linkedin", "photo", "rate", "availability_hours", "weekend_availability")
VALUES ('2', '6124387648', 'www.linkedin.com', 'photoURL', '25', '30', 'true'),
('1', '6513986342', 'www.linkedin.com', 'photoURL', '35', '20', 'false'),
('7', '6513986342', 'designer1', 'photo1', '40', '20', false),
('7', '6513986342', 'designer2', 'photo2', '40', '20', false),
('7', '6513986342', 'designer3', 'photo3', '40', '20', false),
('7', '6513986342', 'designer4', 'photo4', '40', '20', false),
('7', '6513986342', 'designer5', 'photo5', '40', '20', false);

-- Skills Test Data

INSERT INTO "skills" ("designer_id", "proficiency", "label")
VALUES ('1', '5', 'feng shui'), 
('1', '5', 'communication'), 
('1', '5', 'time management'), 
('2', '3', 'feng shui'), 
('2', '1', 'communication'), 
('2', '4', 'softwares');


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
values ('1', '4', 'Communication'),
('1', '5', 'Modern Style'),
('1', '1', 'Cowyboy Theme');

insert into software (label)
values ('AutoCAD'), ('Blendr'), ('Adobe Illustrator'), ('MS Paint'), ('FreeCAD');

insert into designer_software_join (designer_id, software_id , proficient)
values ('1', '1', true),
('1', '2', false),
('1', '3', true),
('1', '4', false),
('1', '5', false);

insert into contract_requests (requesting_manager_id, contracted_manager_id , contracted_designer_id, project_id, software_id, requested_hours, date_sent, request_status)
values ('7', '7', '4', '4', '1', '20', '1/1/2021', 'pending'), 
('7', '7', '6', '5', '1', '20', '1/1/2021', 'pending'),
('7', '1', '1', '6', '1', '20', '1/1/2021', 'pending'),
('7', '1', '2', '6', '1', '20', '1/1/2021', 'pending');