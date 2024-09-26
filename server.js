// import our dependencies
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

// configure environment variables
dotenv.config();

// create a connection object

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// test the connection

db.connect((err) => {
  if (err) {
    return console.log("Error connecting to the database: ", err);
  }

  // connection is successful
  console.log("Successfully connected to MySQL: ", db.threadId);
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// retrieve all patients
app.get("/get_pateints", (req, res) => {
  const getPatients = "SELECT first_name, last_name FROM patients";
  db.query(getPatients, (err, data) => {
    // if I have an error

    if (err) {
      return res.status(400).send("Failed to get patients", err);
    }

    // res.status(200).render('data', { data })
    res.status(200).send(data);
  });
});

// retrieve all providers by first_name, last_name, Providers_specialty.

app.get("/get_providers", (req, res) => {
  const getProviders =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(getProviders, (err, data) => {
    // if I have an error

    if (err) {
      return res.status(400).send("Failed to get patients", err);
    }

    // res.status(200).render('data', { data })
    res.status(200).send(data);
  });
});

// retrieve Filter patients by First Name

app.get("/get_pateints_first_name", (req, res) => {
  const getPatients = "SELECT first_name FROM patients";
  db.query(getPatients, (err, data) => {
    // if I have an error

    if (err) {
      return res.status(400).send("Failed to get patients", err);
    }

    // res.status(200).render('data', { data })
    res.status(200).send(data);
  });
});

// retrieve all providers by Specialty

app.get("/get_providers_specialty", (req, res) => {
  const getProviders = "SELECT provider_specialty FROM providers";
  db.query(getProviders, (err, data) => {
    // if I have an error

    if (err) {
      return res.status(400).send("Failed to get patients", err);
    }

    // res.status(200).render('data', { data })
    res.status(200).send(data);
  });
});

// start and listen to the server

app.listen(3000, () => {
  console.log("server is runing on port3300...");
});
