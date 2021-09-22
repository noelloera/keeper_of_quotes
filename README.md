# Keeper of Quotes

## Introduction

Full-stack application which allows for the storage of quotes in a Mongo DB connected database. This application uses CRUD server principles.

## Table of Contents

- [General Info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)

## General Info

Keeper of Quotes uses HTML, CSS, and JavaScript for front-end mobile responsiveness and UI logic. Express.js powers the backend REST API along side mongoose for MongoDB queries. Provide routes for for rendering the client side static application as well as provides the routes for the storage and the update of existing data from MongoDB database.

1. The server listens for calls made to PORT
2. Upon root request "/" the server feeds the client static file
3. The server follows CRUD requests for the quotes being stored in the database
4. Dependent on path calls. Corresponding user data will be sent from MongoDB queries, and updates.
5. Followed Test-Driven-Development principles. Contains respective test files

## Features

- Data persistent
- MongoDB data storage
- Mobile responsive front-end

## Technologies

- HTML
- CSS
- Javascript
- Express
- Wdio
- Chai-Http v4
- Morgan v1
- Mongoose v5
- Nodemon v2
- Dotenv v8
- Body-parser v1

## Setup

Running this project requires local installation of npm:

1. $ cd ..Quotekeeper
2. $ npm install
3. $ node app.js / nodemon app.js

## Status

Application is functional. Development still ongoing.
