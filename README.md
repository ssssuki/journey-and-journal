### Versions

- Node v16.19.0

## Project Description

### Travel Log

This app is a place for the user to log and review this travel destinations. The user with be able to post photos, write a short description, post the location, and create a journal for each destination.

The user will will be able to like(save) and comment on posts. You can use the posts to look back on memories or recommend the destination to others.
Multiple destinations can be grouped together in a "folder" based on geography, category, or anything else the user would like.

The target audience are family and friends who want to post and remember their vacations together, newcomers to traveling who want inspiration on fun and safe places to visit, and photographers/artists/film makers looking for the right spot to capture.

#### Team Members

- Erik Wehrmann
- Karen Mui
- Susu Xiang

#### Stack Choices

- Front-End: ReactJS
- Back-End: ExpressJS
- Database: PostgreSQL
- Frameworks: SASS, Bootstrap

### DB Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`
