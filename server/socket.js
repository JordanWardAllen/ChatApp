module.exports = {
    connect: function(io, db){
        console.log('socket connected')
        const collection = db.collection('channel');
        
        io.on('connection', (socket)=> { 

            socket.on('chat', (chat)=>{   
                collection.findOne({channelName: chat.channelName}, (err, data)=>{
                    chatHistory = data.chatHist
                    chatHistory[chatHistory.length] = {chatMsg : chat.chatMsg}
                    // console.log(chatHistory)
                    // chatHistory+= ({chatMsg : chat.chatMsg})
                    // console.log(chatHistory[0])
                    // chatHistory.append(chat.chatMsg)
               
                // {chatMsg: chat.chatMsg, sender : chat.sender, group: chat.group, channel: chat.channel}  
                collection.updateOne({ channelName : chat.channelName },{$set:{chatHist : chatHistory}}, {upsertL: true},  (err, data) =>{
                // collection.insertOne({channelName: chat.channelName, chatHist :  chatHistory}, (err, data) =>{
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
                    console.log(test)
                    console.log(data[0].chatHist)
                    io.emit('test', data[0].chatHist ); 
                })  
            })
        })
    }
}