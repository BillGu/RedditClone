# Reddit Clone

This application is a simple mockup of the actual reddit application. Users can create topics and vote on other people's topics.

Application deployed on: https://aqueous-meadow-60213.herokuapp.com/

## Table of Contents 
1. [About - Tech Stack](#about) 
2. [Deployment Instructions](#deployment)
3. [Testing](#testing)


## About - Tech Stack <a name="about"/>

This application was built entirely on nodejs. The backend was done with expressJS and the frontend done on ReactJS. The ExpressJS Application serves the APIs necessary to create, list and vote on the topics. Along with reactJS, redux (thunk middleware) was used to connect to the APIs from the backend.

Note: There is **no data persistence** in this application (no relational database was used). An in-memory data structure was designed and lives on the express server itself (as a result, data is wiped when the server restarts)



## Deployment Instructions <a name="deployment"/>


npm is required to run the application locally. Nodemon is preferred for the server as it automatically restarts on update 

To deploy the application (first run server then client):
```bash
npm install
npm start
cd ./client
npm install
npm start
```


## Testing <a name="testing"/>


A series of unit tests have been written using Mocha and Chai to test the capability of the backend servers. To run the tests, just run `npm test` from the root folder. 

A series of positive and negative testing will be carried out. 
- checks if topics can be created, voted on and ordered on view
- checks if errors are thrown on illegal input








