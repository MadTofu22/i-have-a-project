INSERT INTO "projects" ("manager_id", "status", "due_date", "notes")
VALUES ('1', 'Active', '10.10.2021', 'a current project for manager 1');

INSERT INTO "skills" ("label", "description")
VALUES ('feng shui', 'the art of spacing and palletting'), ('computer softwares', 'autocad and other virtual design softwares'), ('architecture', 'architecting');

-- NEEDS CHANGING

-- "manager_id", "phone", "linkedin", "photo", "rate"

-- OLD: 
-- "first_name", "last_name", "manager_id", "email", "login", "phone", "linkedin", "photo", "rate"

INSERT INTO "designers" ("manager_id", "phone", "linkedin", "photo", "rate")
VALUES ('2', '6124387648', 'www.linkedin.com', 'photoURL', '5'),
('2', '6513986342', 'www.linkedin.com', 'photoURL', '5');

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

insert into software (designer_id, "label", proficient)
values ('1', 'AutoCAD', true),
('1', 'Blendr', false),
('1', 'Adobe Illustrator', true),
('1', 'MS Paint', false),
('1', 'FreeCAD', false);