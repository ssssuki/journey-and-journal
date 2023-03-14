#Journey and Journal
##Share your Journey!


## Project in Action  [Journey and Journal](http://www.journeyandjournal.click)


### Journey and Journal

This app lets users easily share their travel photos and stories with a community of fellow travelers. Search for photos and stories from others who have been to the same places and connect with them through likes and comments. Join our community and start sharing your adventures with the world!


#### Team Members

- Erik Wehrmann
- Karen Mui
- Susu Xiang

#### Stack Choices

- Front-End: ReactJS
- Back-End: ExpressJS
- Database: PostgreSQL
- Frameworks: Axios, SASS, Bootstrap, GoogleMapAPI,

### DB Setup

1. In vagrant machine type `psql -U vagrant -d template1`
2. Then create the database `CREATE DATABASE final OWNER labber;`

3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `final`

5. Install dependencies: `npm i`
6. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`
