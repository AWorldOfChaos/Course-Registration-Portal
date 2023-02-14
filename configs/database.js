const { Client } = require("pg");

const client = new Client("postgres://postgres:An1me4l1fe@localhost:5432/lab4db"); //Configuring PostgresSQL Database

module.exports = client;
