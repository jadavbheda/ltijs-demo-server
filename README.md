# Ltijs Demo Server with MySQL (instead of MongoDB)

> Ltijs v5 demo server that work with MySQL server
 
> This project is forked from https://github.com/Cvmcosta/ltijs-demo-server, contains only MySQL related changes and may not maintain for future upgrades. 

> This project for now uses https://github.com/jadavbheda/ltijs-sequelize instead of actual ltijs-sequelize till it fixes this issue https://github.com/Cvmcosta/ltijs-sequelize/issues/2 (I already raised PR for it)

### Usage

- Download or clone the repo

- Setup `.env` file with the relevant variables

  ```
  DB_HOST=localhost
  DB_NAME=ltidb
  DB_USER=user
  DB_PASS=pass
  LTI_KEY=LTIKEY
  PORT=5000
  ```

- Run `npm install`

- Run `npm start` 

### React application
 * Demo server uses default react client build in `public` directory  
 * The code for the react application used with this project can be found [here](https://github.com/Cvmcosta/ltijs-demo-client).
