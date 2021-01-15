# I Have A Project

I Have A Project is a proof of concept software-as-a-service application, under developmental NDA, that enables project managers to outsource and source creative talent according to their project needs. 
Our client described to us the fast moving world of creative design, how agency managers struggle to balance their team-size and creative bandwidth through their daily changing needs.
Sometimes a project manager will have to quickly expand their team on a project by project basis to avoid negative consequences, such as missing deadlines, slow growth, and unhappy clients. These common downsides can have lasting impacts on the business and it’s team members.
On the other side, a manager might have a surplus of unused talent, and be in a position to loan out a designer on their staff to a different team or company.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create the tables provided database.sql file. Fill the tables with the test data provided in the testdata.sql file.

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000/#/Login`

## Built With
This application is built with node, express, pg, React, React Redux, CSS, Material UI, jQuery, calendar.io, and email.js.

## Acknowledgement

Thanks to Prime Digital Academy who helped us make this application a reality. 
Thank you to our instructors Casie and Kris. Thank you to our amazing cohort. You have been a rock solid support system. Thank you to our clients who allowed us to breathe life into their concept. 



