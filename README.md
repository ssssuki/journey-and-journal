#Journey and Journal
##Share your Journey!


## Project in Action - [Journey and Journal](http://www.journeyandjournal.click)


### Journey and Journal

This app lets users easily share their travel photos and stories with a community of fellow travelers. Search for photos and stories from others who have been to the same places and connect with them through likes and comments. Join our community and start sharing your adventures with the world!

![截屏2023-03-14 下午3 35 33](https://user-images.githubusercontent.com/116608701/225124558-e568bbff-0e87-4136-96d1-c5cb4ee70a1e.png)
![截屏2023-03-14 下午3 36 23](https://user-images.githubusercontent.com/116608701/225124615-f5f3b53c-48b7-43d6-ae1e-e728d55ee0dd.png)
![截屏2023-03-14 下午3 37 11](https://user-images.githubusercontent.com/116608701/225124663-9465491e-7110-478f-a31d-4561b59b1758.png)
![截屏2023-03-14 下午3 35 48](https://user-images.githubusercontent.com/116608701/225124710-f15d4ce7-69d1-4d59-8dc3-5eaee1475aa6.png)

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
