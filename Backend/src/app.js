const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "fe-inventory-mini-project.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Inventory Management System API', data: null });
});

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan', data: null });
});

app.use(errorHandler);

module.exports = app;
