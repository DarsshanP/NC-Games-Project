# Project Summary

In this project I have built a RESTful API that allows you to access and interact with a database to provide information to front-end architecture. The purpose of this was to mimic real world backend services and gain experience in that field.

Here is a link to the hosted repo of this API:

[NC-Games-Hosted](https://github.com/DarthShan/NC-Games-Hosted)

As well as a link to a webpage where you can interact with the server:

[Cylic App](https://scary-cow-bathing-suit.cyclic.app/api)

# Running the repo

For and clone this repo and then once inside install the necessary dependencies using your terminal with the line:

```
npm i
```

After you've installed the dependencies you're going to have to seed your databases. Run these 2 lines of code one after the other to accomplish this:

```
npm run setup-dbs
npm run seed
```

To run the tests for the app use the code:

```
npm t app.test.js
```

# Create Environment Variables

When cloning this repo you must create two .env. files, one for the dev data and one for the test data. Inside each add the text 'PGDATABASE=_INSERT_DATABASE_NAME_HERE_, replacing the asterisks with the name of the respective databases.

# Requirements]

The minimum required version of node.js for this repo is: 19.0.0

The minimum required version of Postgres for this repo is: 8.7.3
