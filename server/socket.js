module.exports = {
    connect: function(io, db){
        console.log('socket connected')
        const collection = db.collection('channel');
        
        io.on('connection', (socket)=> { 

            socket.on('chat', (chat)=>{   
                collection.findOne({channelName: chat.channelName}, (err, data)=>{
                    chatHistory = data.chatHist
                    chatHistory[chatHistory.length] = {chatMsg : chat.chatMsg}

                collection.updateOne({ channelName : chat.channelName },{$set:{chatHist : chatHistory}}, {upsertL: true},  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        io.emit('chat', chatHistory);
                    }
                })
            })
        }),

            socket.on('test', (test)=>{   
                collection.find({channelName: test}).toArray((err, data) =>{
                    console.log('connection fired')
                    io.emit('test', data[0].chatHist ); 
                })  
            }),
            socket.on('channel', (channel)=>{  
                collection.find().toArray((err, data) =>{
                    console.log('channel fired')
                    for (i =0; i < data.length; i++){
                        io.emit('channel', data[i].channelName);
                    }   
                })  
            })
        })
    }
}