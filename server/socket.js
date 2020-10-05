module.exports = {
    connect: function(io){
        console.log('socket connected')
        io.on('connection', (socket)=> {  
            // console.log(socket)    
                // io.emit('getUsers', fileData.User);   
                // io.emit('chat', fileData.Chat); 
            socket.on('message', (message)=>{
                console.log('on msg')
                console.log(message) 
                io.emit('message', message);
            }),
            socket.on('chat', (chat)=>{    
                // console.log(chat)   
                io.emit('chat', chat.messagecontent);
            })
        })
    }
}