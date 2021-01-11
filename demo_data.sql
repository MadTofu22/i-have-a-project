-- This script populates every table with demo data for a presentation

-- Populate the initial managers into the USER table
INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company")
VALUES ('alexs@3dagents.com', 'managerPW', 'manager', 'Simon', 'Germscheid', '3D Agents'),
('bradleyj@staryflyerimages.com', 'managerPW', 'manager', 'Peter', 'Pierce', 'Staryflyer Images'),
('toms@marvelousmeshes.com', 'managerPW', 'manager', 'Tom', 'Stutler', 'Marvelous Meshes'),
('samanthap@we3d.com', 'managerPW', 'manager', 'Samantha', 'Ponterre', 'We3D');

-- Populate the first set of designers into the DESIGNERS table

INSERT INTO designers (manager_id, phone, linkedin, photo, rate, availability_hours, weekend_availability)
VALUES ('2', '(612) 867-5309', 'www.linkedin.com/coco.chanel', 'images/starflyer.jpg', '25', '0', 'FALSE'),
('2', '(302) 867-5309', 'www.linkedin.com/karl.lagerfeld', 'images/starflyer.jpg', '35', '0', 'FALSE'),
('2', '(952) 867-5309', 'www.linkedin.com/gianni.versace', 'images/starflyer.jpg', '40', '0', 'FALSE'),
('3', '(831) 867-5309', 'www.linkedin.com/yves.saint_laurent', 'images/marvelous.jpg', '30', '0', 'FALSE'),
('3', '(204) 867-5309', 'www.linkedin.com/in/donatella.versace', 'images/marvelous.jpg', '35', '0', 'FALSE'),
('1', '(539) 867-5309', 'www.linkedin.com/in/marc.jacobs', 'images/3dagents.jpg', '42', '0', 'FALSE'),
('1', '(777) 867-5309', 'www.linkedin.com/in/hubert.givenchy', 'images/3dagents.jpg', '33', '0', 'FALSE'),
('1', '(212) 867-5309', 'www.linkedin.com/in/pierre.cardin', 'images/3dagents.jpg', '20', '0', 'FALSE'),
('4', '(905) 867-5309', 'www.linkedin.com/in/donna.karan', 'images/3dagents.jpg', '50', '0', 'FALSE'),
('4', '(404) 867-5309', 'www.linkedin.com/in/alexander.mcqueen', 'images/we3d.jpg', '45', '0', 'FALSE');


-- Populate the first round of designers and the presentation profiles into the USER table
INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company", "designer_id")
VALUES ('cococ@staryflyerimages.com', 'designerPW', 'designer', 'Coco', 'Chanel', 'Staryflyer Images', '1'),
('karll@staryflyerimages.com', 'designerPW', 'designer', 'Karl', 'Lagerfeld', 'Staryflyer Images', '2'),
('gianniv@staryflyerimages.com', 'designerPW', 'designer', 'Gianni', 'Versace', 'Staryflyer Images', '3'),
('yvess@marvelousmeshes.com', 'designerPW', 'designer', 'Yves', 'Saint Laurent', 'Marvelous Meshes', '4'),
('donatellav@marvelousmeshes.com', 'designerPW', 'designer', 'Donatella', 'Versace', 'Marvelous Meshes', '5'),
('marcj@3dagents.com', 'designerPW', 'designer', 'Marc', 'Jacobs', '3D Agents', '6'),
('hubertg@3dagents.com', 'designerPW', 'designer', 'Hubert', 'Givenchy', '3D Agents', '7'),
('pierrec@3dagents.com', 'designerPW', 'designer', 'Pierre', 'Cardin', '3D Agents', '8'),
('donnak@we3d.com', 'designerPW', 'designer', 'Donna', 'Karan', 'We3D', '9'),
('alexanderm@we3d.com', 'designerPW', 'designer', 'Alexander', 'McQueen', 'We3D', '10');

INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company")
VALUES ('sgermscheid@gmail.com', '', 'manager', 'Simon', 'Germscheid', 'Prime Rendering'),
('elliotmalcolm@hotmail.com', '', 'manager', 'Elliot', 'Malcolm', 'Digital Masterworks'),
('rachelclairephoto@gmail.com', '', 'admin', 'Rachel', 'Smith', 'IHAP');

-- Populat the 2nd round of designers in to the DESIGNER table
INSERT INTO "designers" ("manager_id", "phone", "linkedin", "photo", "rate", "availability_hours", "weekend_availability")
VALUES ('16', '(612) 555-9843', 'www.linkedin.com/in/lucy-coleman', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-3574', 'www.linkedin.com/in/megan-howell', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-6571', 'www.linkedin.com/in/chloe-dominguez', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-8794', 'www.linkedin.com/in/jessica-brown', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-3235', 'www.linkedin.com/in/charlotte-mejia', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-1858', 'www.linkedin.com/in/emily-reyes', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-5466', 'www.linkedin.com/in/sarah-mcgee', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-4871', 'www.linkedin.com/in/harry-hoffman', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-3521', 'www.linkedin.com/in/oliver-cobb', 'images/simon.png', '40', '0', 'FALSE'),
('16', '(612) 555-2093', 'www.linkedin.com/in/daniel-howell', 'images/simon.png', '40', '0', 'FALSE'),
('16', '', '', '', '40', '0', 'FALSE');

-- Populate the last wave of designers into the USER table
INSERT INTO "user" ("email", "password", "user_type", "first_name", "last_name", "company", "designer_id")
VALUES ('lucyc@simonsaysgraphics.com', 'ssg1', 'designer', 'Lucy', 'Coleman', 'Prime Rendering', '11'),
('meganh@simonsaysgraphics.com', 'ssg2', 'designer', 'Megan', 'Howell', 'Prime Rendering', '12'),
('chloed@simonsaysgraphics.com', 'ssg3', 'designer', 'Chloe', 'Dominguez', 'Prime Rendering', '13'),
('jessicab@simonsaysgraphics.com', 'ssg4', 'designer', 'Jessica', 'Brown', 'Prime Rendering', '14'),
('charlottem@simonsaysgraphics.com', 'ssg5', 'designer', 'Charlotte', 'Mejia', 'Prime Rendering', '15'),
('emilyr@simonsaysgraphics.com', 'ssg6', 'designer', 'Emily', 'Reyes', 'Prime Rendering', '16'),
('sarahm@simonsaysgraphics.com', 'ssg7', 'designer', 'Sarah', 'Mcgee', 'Prime Rendering', '17'),
('harryh@simonsaysgraphics.com', 'ssg8', 'designer', 'Harry', 'Hoffman', 'Prime Rendering', '18'),
('oliverc@simonsaysgraphics.com', 'ssg9', 'designer', 'Oliver', 'Cobb', 'Prime Rendering', '19'),
('danielh@simonsaysgraphics.com', 'ssg10', 'designer', 'Daniel', 'Howell', 'Prime Rendering', '20'),
('peterp@gmail.com', 'peter', 'designer', 'Peter', 'Pierce', 'Prime Rendering', '21');

-- Populate the SKILLS table
INSERT INTO "skills" (designer_id, proficiency, label)
VALUES ('1', '5', 'Creativity'),
('2', '4', 'Leadership'),
('3', '3', 'Typography'),
('4', '5', 'Interpersonal Communication'),
('5', '2', 'Branding'),
('6', '4', 'Interactive Media'),
('7', '3', 'Creativity'),
('8', '4', 'Leadership'),
('9', '5', 'Typography'),
('10', '4', 'Interpersonal Communication'),
('1', '3', 'Branding'),
('4', '5', 'Interactive Media'),
('5', '2', 'Creativity'),
('6', '4', 'Leadership'),
('3', '3', 'Typography'),
('4', '4', 'Interpersonal Communication'),
('10', '5', 'Branding'),
('2', '1', 'Interactive Media'),
('11', '4', 'Communication'),
('12', '5', 'Communication'),
('13', '3', 'Communication'),
('14', '5', 'Communication'),
('15', '5', 'Communication'),
('16', '4', 'Communication'),
('17', '3', 'Communication'),
('18', '5', 'Communication'),
('19', '4', 'Communication'),
('20', '3', 'Communication'),
('11', '2', 'Branding'),
('12', '5', 'Branding'),
('13', '5', 'Branding'),
('14', '4', 'Branding'),
('15', '2', 'Branding'),
('16', '3', 'Branding'),
('17', '3', 'Branding'),
('18', '5', 'Branding'),
('19', '4', 'Branding'),
('20', '4', 'Branding'),
('11', '5', 'Creativity'),
('12', '3', 'Creativity'),
('13', '5', 'Creativity'),
('14', '5', 'Creativity'),
('15', '4', 'Creativity'),
('16', '3', 'Creativity'),
('17', '5', 'Creativity'),
('18', '4', 'Creativity'),
('19', '3', 'Creativity'),
('20', '2', 'Creativity');

-- Populate the SOFTWARE table
INSERT INTO "software" (label)
VALUES ('AutoCAD'),
('Blender'),
('Adobe Illustrator'),
('MS Paint'),
('FreeCAD');

-- Populate the CAREER table
insert into career (designer_id, title, location)
values ('1', 'Junior Modeler', 'Graphic Goals'),
('2', 'Junior Designer', 'Designers Inc'),
('2', 'Intern', 'Graphic Goals'),
('3', 'Junior Modeler', 'Graphic Goals'),
('3', 'Intern', 'Graphic Goals'),
('4', 'Senior Modeler', 'Designers Inc'),
('4', 'Junior Modeler', 'Designers Inc'),
('4', 'Intern', 'Designers Inc'),
('5', 'Junior Modeler', 'Designers Inc'),
('5', 'Intern', 'Fractal Gaming'),
('6', 'Associate Designer', 'Fractal Gaming'),
('6', 'Junior Designer', 'Fractal Gaming'),
('7', 'Lead Designer', 'Fractal Gaming'),
('7', 'Associate Designer', 'Fractal Gaming'),
('7', 'Intern', 'Fractal Gaming');

insert into education (designer_id, "degree", "location")
values ('1','B.A. Graphic Design', 'University of Minnesota'),
('2','B.A. Graphic Design', 'St. Olaf College'),
('3','B.A. Graphic Design', 'Carleton College'),
('4','B.A. Graphic Design', 'Gustavus Adolphus College'),
('5','B.A. Graphic Design', 'Saint Johns University'),
('6','B.A. Graphic Design', 'College of St. Benedict'),
('7','B.A. Graphic Design', 'University of St. Thomas'),
('8','B.A. Graphic Design', 'Augsburg University'),
('9','B.A. Graphic Design', 'Bethel University'),
('10','B.A. Graphic Design', 'Bethel University');

insert into designer_software_join (designer_id, software_id , proficient)
values ('1', '1', 'true'),
('2', '1', 'true'),
('2', '2', 'true'),
('3', '3', 'true'),
('3', '5', 'true'),
('4', '6', 'true'),
('4', '1', 'true'),
('5', '4', 'true'),
('5', '2', 'true'),
('5', '5', 'true'),
('6', '3', 'true'),
('6', '2', 'true'),
('7', '1', 'true'),
('8', '4', 'true'),
('8', '6', 'true'),
('8', '1', 'true'),
('8', '4', 'true'),
('8', '3', 'true'),
('9', '2', 'true'),
('9', '1', 'true'),
('10', '6', 'true'),
('10', '3', 'true'),
('21', '1', 'false'),
('21', '2', 'false'),
('21', '3', 'false'),
('21', '4', 'false'),
('21', '5', 'false');

INSERT INTO "projects" ("manager_id", "status", "due_date", "start", "notes", "project_name")
VALUES ('16', 'inactive', '12/24/2020', '12/01/2020', 'Target post xmas ad, print', 'Target Post Christmas Advert'),
('16', 'inactive', '12/25/2020', '12/02/2020', 'Kohls post xmas ad, print', 'Kohls Post Christmas Advert'),
('16', 'active', '1/15/2021', '12/03/2020', 'Yardbird post xmas ad, mixed media', 'Yardbird Spring Line Commercial'),
('16', 'inactive', '2/28/2021', '12/30/2020', 'TB summer pitch, collab with Jerry S.', 'Taco Bell Summer Pitch Pre-work'),
('16', 'active', '1/10/2021', '12/29/2020', 'Chipotle ad proposal, rework graphics 4-6', 'Chipotle Ad Proposal'),
('16', 'active', '1/11/2021', '12/30/2020', 'YETI trade show branding, ready for edits', 'YETI Graphics and Trade Show Branding'),
('16', 'active', '1/12/2021', '1/3/2021', 'Follow up with Tim', 'REI Spring Ad'),
('16', 'active', '1/13/2021', '1/7/2021', 'Waiting on Cory', 'HOM Furniture Commercial Piece Design');

insert into contract_requests (requesting_manager_id, contracted_manager_id , contracted_designer_id, project_id, software_id, requested_hours, date_sent, request_status)
values ('16', '5', '2', '1', '3', '5', '12/03/2020', 'completed'),
('16', '4', '4', '1', '2', '10', '12/03/2020', 'completed'),
('16', '1', '1', '1', '3', '15', '12/29/0202', 'completed'),
('16', '3', '6', '1', '4', '12', '12/30/2020', 'completed'),
('16', '1', '9', '1', '3', '4', '12/30/2020', 'completed'),
('16', '5', '3', '1', '4', '20', '1/3/2021', 'pending');

insert into designer_calendar_item (designer_id, start, "hoursCommitted", available)
values ('1', '2021-1-14', '3', 'TRUE'),
('2', '2021-1-14', '3', 'TRUE'),
('3', '2021-1-14', '3', 'TRUE'),
('4', '2021-1-14', '3', 'TRUE'),
('5', '2021-1-14', '3', 'TRUE'),
('6', '2021-1-14', '3', 'TRUE'),
('7', '2021-1-14', '5', 'TRUE'),
('8', '2021-1-14', '5', 'TRUE'),
('9', '2021-1-14', '5', 'TRUE'),
('10', '2021-1-14', '5', 'TRUE'),
('1', '2021-1-15', '10', 'TRUE'),
('2', '2021-1-15', '10', 'TRUE'),
('3', '2021-1-15', '10', 'TRUE'),
('4', '2021-1-15', '10', 'TRUE'),
('5', '2021-1-15', '10', 'TRUE'),
('6', '2021-1-15', '10', 'TRUE'),
('7', '2021-1-15', '10', 'TRUE'),
('8', '2021-1-15', '10', 'TRUE'),
('9', '2021-1-15', '10', 'TRUE'),
('10', '2021-1-15', '10', 'TRUE');