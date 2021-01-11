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
	"hours_est" int
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
	"location" varchar(100)
);

CREATE TABLE "education" (
	"id" SERIAL PRIMARY KEY,
	"designer_id" INT REFERENCES "designers" NOT NULL,
	"degree" varchar(100) NOT NULL,
	"location" varchar(100)
);

CREATE TABLE "software" (
	"id" SERIAL primary key,
	"label" varchar(80) not null
);

create table "designer_software_join" (
	"id" SERIAL primary key,
	"designer_id" INT references "designers" not null,
	"software_id" INT references "software" not null,
	"proficient" boolean not null
);

CREATE TABLE "contract_requests" (
	"id" SERIAL PRIMARY KEY,
	"requesting_manager_id" INT REFERENCES "user" NOT NULL,
	"contracted_manager_id" INT REFERENCES "user" NOT NULL,
	"contracted_designer_id" INT REFERENCES "designers" NOT NULL,
	"project_id" INT REFERENCES "projects" NOT NULL,
	"software_id" INT REFERENCES "software" NOT NULL,
	"requested_hours" INT,
	"date_sent" DATE,
	"request_status" VARCHAR(36) NOT NULL
);