// controllers/device.controller.js

const axios = require('axios');
const FLASK_API_URL = 'http://localhost:5000';
const DEVICE_ID = 'A8N5230560263';

exports.scanDevice = (req, res) => {
  axios.post(`${FLASK_API_URL}/devices/scan`, { ...req.body, device_id: DEVICE_ID })
    .then(response => res.json(response.data))
    .catch(error => res.status(error.response ? error.response.status : 500).json({ message: error.message }));
};

exports.pingDevice = (req, res) => {
  axios.post(`${FLASK_API_URL}/device/${DEVICE_ID}/ping`)
    .then(response => res.json(response.data))
    .catch(error => res.status(error.response ? error.response.status : 500).json({ message: error.message }));
};

exports.listDevices = (req, res) => {
  axios.get(`${FLASK_API_URL}/devices`)
    .then(response => res.json(response.data))
    .catch(error => res.status(error.response ? error.response.status : 500).json({ message: error.message }));
};

exports.removeDevice = (req, res) => {
  axios.delete(`${FLASK_API_URL}/device/${DEVICE_ID}`)
    .then(response => res.json(response.data))
    .catch(error => res.status(error.response ? error.response.status : 500).json({ message: error.message }));
};

exports.updateDevice = (req, res) => {
  axios.patch(`${FLASK_API_URL}/device/${DEVICE_ID}`, req.body)
    .then(response => res.json(response.data))
    .catch(error => res.status(error.response ? error.response.status : 500).json({ message: error.message }));
};
