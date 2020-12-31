CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR (80) UNIQUE,
    "password" VARCHAR (1000) NOT NULL,
	"user_type" varchar(40),
	"first_name" varchar(30),
	"last_name" varchar(50),
	"company" varchar(100),
	"designer_id" int 
);

CREATE TABLE "designers" (
	"id" SERIAL PRIMARY KEY,
	"manager_id" int REFERENCES "user" NOT NULL,
	"phone" varchar(15),
	"linkedin" varchar(255),
	"photo" varchar(255),
	"rate" DECIMAL,
	"availability_hours" integer,
	"weekend_availability" boolean
);

-- CHECK TO SEE IF WE CAN GET BY WITH WHAT MAY BE A CIRCULAR REFERENCE BETWEEN DESIGNERS AND USERS

CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"proficiency" int NOT NULL,
	"label" varchar(80) NOT NULL
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"manager_id" int references "user" NOT NULL,
	"status" varchar(50),
	"due_date" TIMESTAMP,
	"start" TIMESTAMP,
	"notes" varchar(510),
	"project_name" varchar(256)
);

CREATE TABLE "projects_designers_join" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"project_id" INT REFERENCES "projects" NOT NULL,
	"rate" DECIMAL,
	"hours_est" int,
	"request_status" varchar(30)
);

CREATE TABLE "designer_calendar_item" (
	"event_id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"project_id" INT REFERENCES "projects",
	"name" varchar(64),
	"start" DATE NOT NULL,
	"hoursCommitted" int NOT NULL,
	-- In final update change hoursCommitted to snake case FIX THIS
	"available" BOOLEAN NOT NULL
);

CREATE TABLE "career" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"title" varchar(100) NOT NULL,
	"location" varchar(100),
);

CREATE TABLE "education" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"degree" varchar(100) NOT NULL,
	"location" varchar(100),
);


-- NEEDS CHANGING

-- "email", "password", "employee_type", "first_name", "last_name", "company", "designer_id"

INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company", "designer_id")
VALUES ('zpets@gmail.com', 'feckland87', 'Designer', 'Franz', 'Eckland', 'Z-Pets',1), 
('bubblehub@gmail.com', 'kdanger88', 'Manager', 'Kelly', 'Danger', 'BubbleHub', 2), 
('cellsgraphic@gmail.com', 'tbrookshaw89', 'Designer', 'Thomas', 'Brookshaw', 'Cell Graphic', 3);


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
