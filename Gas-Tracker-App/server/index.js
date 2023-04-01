const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Create connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'ColeGarboski',
  password: '',
  database: 'gastracker'
});

// Get all gas prices from all stations
app.get('/gas-prices', (req, res) => {
  let sql = `
    SELECT 
      s.StationName,
      f.FuelTypeName,
      p.Price,
      c.CompanyName
    FROM 
      Price p
      JOIN Station s ON p.StationID = s.StationID
      JOIN FuelType f ON p.FuelTypeID = f.FuelTypeID
      JOIN Company c ON s.CompanyID = c.CompanyID
  `;

  const queryParams = [];
  if (req.query.companyName) {
    sql += ' WHERE c.CompanyName = ?';
    queryParams.push(req.query.companyName);
  }

  if (req.query.fuelTypeName) {
    sql += req.query.companyName ? ' AND f.FuelTypeName = ?' : ' WHERE f.FuelTypeName = ?';
    queryParams.push(req.query.fuelTypeName);
  }

  pool.query(sql, queryParams, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Get all companies
app.get('/companies', (req, res) => {
  const sql = `
    SELECT CompanyName from Company
  `;

  pool.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Get all fuel types
app.get('/fuel-types', (req, res) => {
  const sql = `
    SELECT FuelTypeName from FuelType
  `;

  pool.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Get all stations for a company
app.get('/stations/:companyName', (req, res) => {
  const { companyName } = req.params;

  const sql = `
    SELECT 
      s.StationName,
      s.StationAddress
    FROM 
      Station s
      JOIN Company c ON s.CompanyID = c.CompanyID
    WHERE 
      c.CompanyName = ?
  `;

  pool.query(sql, [companyName], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Get all prices for a station
app.get('/prices/:stationName', (req, res) => {
  const { stationName } = req.params;

  const sql = `
    SELECT 
      f.FuelTypeName,
      p.Price
    FROM 
      Price p
      JOIN Station s ON p.StationID = s.StationID
      JOIN FuelType f ON p.FuelTypeID = f.FuelTypeID
    WHERE 
      s.StationName = ?
  `;

  pool.query(sql, [stationName], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});