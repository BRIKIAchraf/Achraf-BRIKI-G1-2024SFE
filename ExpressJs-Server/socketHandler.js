// socketHandler.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  
    function broadcastNewAttendance(data) {
      io.emit('newAttendance', data);
    }
  
    function broadcastDeleteAllAttendances() {
      io.emit('allAttendancesDeleted');
    }
  
    return {
      broadcastNewAttendance,
      broadcastDeleteAllAttendances
    };
  };
  