// controllers/attendance.controller.js
const axios = require('axios');
const Attendance = require('../models/attendances.model');
const BASE_FLASK_API_URL = 'http://localhost:5000';
const wss = require('../index').wss;
exports.getAttendances = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_FLASK_API_URL}/attendances`, {
            headers: { 'Device-ID': 'A8N5230560263' }
        });

        await Attendance.deleteMany({});
        const attendances = response.data.map(attendance => ({
            punch: attendance.punch,
            status: attendance.status,
            timestamp: new Date(attendance.timestamp),
            uid: attendance.uid,
            user_id: attendance.user_id
        }));
        await Attendance.insertMany(attendances);
        res.status(200).json(attendances);
        
        // Broadcast updated attendances to all connected WebSocket clients
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'attendance_update',
              data: attendances
            }));
          }
        });
    } catch (error) {
        console.error('Error fetching and syncing attendances:', error);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
};
exports.deleteAllAttendances = async (req, res) => {
    try {
        // Suppression des pointages sur l'appareil
        await axios.delete(`${BASE_FLASK_API_URL}/attendances`, {
            headers: { 'Device-ID': 'A8N5230560263' }
        });
        // Suppression des pointages dans la base de données locale
        await Attendance.deleteMany({});
        res.status(200).json({ message: 'All attendances have been deleted successfully both locally and on the device.' });
    } catch (error) {
        console.error('Error deleting all attendances:', error);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
};
