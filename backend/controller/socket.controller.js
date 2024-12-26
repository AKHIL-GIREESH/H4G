const disconnectFromSocket = (io, socket) => {
    console.log(`User ${socket.id} disconnected`);
}
module.exports = {disconnectFromSocket};