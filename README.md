# ShortLink: A URL shortener service

For each URL passed into this API, a short/encoded URL will be generated and a unique path(urlId) will be generated along with it. Then, the long URL, short URL, and unique ID will be stored in the database.
When a user sends a POST request to encode endpoint, the URL will be searched within the database, if it exist, it returns the result to the client, otherwise, it encodes the long URL, saves it and returns the result to the client 

## Languages & Technologies Used

⭐ Node
⭐ Typescript
⭐ MongoDB
⭐ Mongoose
⭐ Express
⭐ Shortid
⭐ Git

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to run the API.

### `npm run test`

Runs the app in the test mode.\
Open [http://localhost:4000](http://localhost:4000) to test the API.

### `npm run start`

Runs the app in the production mode.\
Open [https://damp-stream-12094.herokuapp.com/url](https://damp-stream-12094.herokuapp.com/url) to test the API.

## `Documentation Link`
Open [https://documenter.getpostman.com/view/18779430/UVksKYjA](https://documenter.getpostman.com/view/18779430/UVksKYjA) to view the API documentation.


You will also see any lint errors in the console.