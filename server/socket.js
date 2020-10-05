module.exports = {
    connect: function(io, db){
        console.log('socket connected')
        const collection = db.collection('chat');
        
        io.on('connection', (socket)=> { 

            socket.on('chat', (chat)=>{      
                collection.insertOne({chatMsg: chat.chatMsg, sender : chat.sender, group: chat.group, channel: chat.channel}, (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        io.emit('chat', chat);
                    }
                })
            }),

            socket.on('test', (test)=>{   
                collection.find({}).toArray((err, data) =>{
                    console.log('connection fired')
                    io.emit('test', data ); 
                })  
            })
        })
    }
}