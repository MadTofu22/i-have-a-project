CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"label" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL
);

CREATE TABLE "designers" (
	"designer_id" SERIAL PRIMARY KEY,
	"first_name" varchar(30),
	"last_name" varchar(50),
	"manager_id" int,
	"email" varchar(150) UNIQUE,
	"login" varchar(30),
	"phone" varchar(15),
	"linkedin" varchar(255),
	"photo" varchar(255),
	"rate" DECIMAL
);

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(255) UNIQUE,
	"password" varchar(40),
	"user_type" varchar(40)
);

CREATE TABLE "designer_skills_join" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"proficiency" int NOT NULL,
	"skills_id" INT REFERENCES "skills"
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"manager_id" BOOLEAN NOT NULL,
	"status" varchar(50),
	"due_date" TIMESTAMP,
	"notes" varchar(510)
);

CREATE TABLE "projects_designers_join" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"project_id" INT REFERENCES "projects" NOT NULL,
	"rate" DECIMAL NOT NULL,
	"hours_est" int NOT NULL,
	"project_signature" BOOLEAN NOT NULL,
	"roster_signature" BOOLEAN NOT NULL,
	"project_name" varchar(255) NOT NULL
);

CREATE TABLE "designer_calendar_item" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"project_id" INT REFERENCES "projects" NOT NULL,
	"start_date" TIMESTAMP NOT NULL,
	"total_hours" int NOT NULL,
	"available" BOOLEAN NOT NULL
);

CREATE TABLE "career" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"start_date" DATE,
	"end_date" DATE NOT NULL,
	"title" varchar(100) NOT NULL
);

CREATE TABLE "education" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"graduation_date" DATE NOT NULL,
	"degree" varchar(100) NOT NULL
);

CREATE TABLE "certification" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"graduation_date" DATE NOT NULL,
	"certification" varchar(100) NOT NULL
);



INSERT INTO "users" ("username", "password", "user_type")
VALUES ('Casie', '1234', 'Manager'), ('Kris', '1234', 'Manager'), ('Edon', '1234', 'Manager');


INSERT INTO "projects" ("manager_id", "status", "due_date", "notes")
VALUES ('1', 'Active', '10.10.2021', 'a current project for manager 1');


INSERT INTO "skills" ("label", "description")
VALUES ('feng shui', 'the art of spacing and palletting'), ('computer softwares', 'autocad and other virtual design softwares'), ('architecture', 'architecting');


INSERT INTO "designers" ("first_name", "last_name", "manager_id", "email", "login", "phone", "linkedin", "photo", "rate")
VALUES ('Franz', 'Eckland', '2', 'zpets@gmail.com', 'feckland87', '6124387648', 'www.linkedin.com', 'photoURL', '5'),
('Kelly', 'Danger', '3', 'bubblehub@gmail.com', 'kdanger88', '6513986342', 'www.linkedin.com', 'photoURL', '5'),
('Thomas', 'Brookshaw', '1', 'cellsgraphic@gmail.com', 'tbrookshaw89', '4679862439', 'www.linkedin.com', 'photoURL', '5');
