module.exports = {
    connect: function(io, db){
        console.log('socket connected')
        const channelCollection = db.collection('channel');
        const groupCollection = db.collection('group');
        const userCollection = db.collection('users');
        
        io.on('connection', (socket)=> { 

            socket.on('chat', (chat)=>{   
                channelCollection.findOne({channelName: chat.channelName}, (err, data)=>{

                    console.log("new message socket fired.")
                    if (data){
                        if (data.chatHist[0].chatMsg == "testMsg1"){
                            console.log("no chat history")
                            chatHistory = data.chatHist
                            chatHistory[0] = {chatMsg : chat.chatMsg}
                        } else {
                            chatHistory = data.chatHist
                            chatHistory[chatHistory.length] = {chatMsg : chat.chatMsg}
                        }
                    } else {
                        console.log("no chat history found at")
                    }

                channelCollection.updateOne({ channelName : chat.channelName },{$set:{chatHist : chatHistory}}, {upsertL: true},  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        io.emit('chat', chatHistory);
                    }
                })
            })
        }),

            socket.on('test', (test)=>{   
                channelCollection.find({channelName: test}).toArray((err, data) =>{
                    console.log('connection fired')
                    if (data[0].chatHist){
                        io.emit('test', data[0].chatHist ); 
                    } else {
                        console.log("chatHistory error for" + data[0])
                    }
                    
                })  
            }),
            socket.on('channel', (channel)=>{  
               ListOfchannels = [] 
                groupCollection.findOne({groupName: channel}, (err, data) =>{
                    console.log('channel fired')
                    for (i =0; i < data.channelList.length; i++){
                            ListOfchannels[i] = data.channelList[i].channelName
                    }

                    io.emit('channel', ListOfchannels);
                })  
            }),
            socket.on('newChannel', (newChannel)=>{  
                console.log("new channel fired")              
                channelCollection.insertOne({channelName : newChannel.channelName, chatHist : [{chatMsg : "No current chat history"}]}, (err, data)=>{
                    console.log("new channel created")
                })
                groupCollection.findOne({ groupName : newChannel.groupName },  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        // currentChannelList = data.channelList
                        newChannelList = data.channelList
                        newChannelList[data.channelList.length] = {channelName : newChannel.channelName}
                        console.log(newChannelList)
                    }
                

                    groupCollection.updateOne({ groupName : newChannel.groupName },{$set:{channelList : newChannelList}}, {upsertL: true},  (err, data) =>{
                        if (err){
                            console.log(err)
                        } else {
                            // io.emit('newChannel', chatHistory);
                                console.log(data)
                        }
                    })
                })


                // { channelName : "Channel 1", chatHist: [{chatMsg: "testMsg1"}, {chatMsg: "testMsg2"}]}


                // const collection2 = db.collection('group');
                // collection2.find().toArray((err, data) =>{
                //     console.log('channel fired')
                //     for (i =0; i < data.length; i++){
                //         for (t =0; t < data[i].groupMem.length; t++){
                //             if (data[i].groupMem[t].username == channel){
                //                 array = data[i].channelList
                //             }

                //         }
                //     }      
                //     for (j = 0; j < array.length; j++){
                //         console.log(array[j].channelName)
                //          io.emit('channel', array[j].channelName);
                //     }
                // })  
            }),
            
            socket.on('user', ()=>{  
                console.log('user fired')
                userCollection.find().toArray((err, data) =>{
                    for (i = 0; i< data.length; i++){
                        // console.log(data[i].username)
                        io.emit('user', data[i].username);
                    }
                    
                })  
            }),
            socket.on('group', (group)=>{  
                console.log('group fired')
                groupList = []
                userCollection.findOne({username : group}, (err, data)=>{
                    if (data.role == "Super"){
                        groupCollection.find().toArray((err, data) =>{
                            for (i = 0; i< data.length; i++){
                                console.log(data[i].groupName)
                                groupList[i] = data[i].groupName
                            }
                            io.emit('group', groupList);
                        })   
                    } else {
                        groupList = []
                        groupCollection.find().toArray((err, data) =>{
                            
                            for (i = 0; i< data.length; i++){
                                for (j = 0; j < data[i].groupMem.length ;j++){
                                    if (data[i].groupMem[j].username == group){
                                        groupList[i - 1] = data[i].groupName 
                                    }
                                }
                            }
                            io.emit('group', groupList);
                            
                        }) 
                    }
                })

            }),

            socket.on('userAssignment', (userAssignment)=>{  
                console.log('userAssignment fired')
                groupCollection.findOne({ groupName : userAssignment.groupName },  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        // currentChannelList = data.channelList
                        newMemberList = data.groupMem
                        newMemberList[data.groupMem.length] = {username : userAssignment.username}
                        console.log(newMemberList)
                    }
                    groupCollection.updateOne({ groupName : userAssignment.groupName },{$set:{groupMem : newMemberList}}, {upsertL: true},  (err, data) =>{
                        if (err){
                            console.log(err)
                        } else {
                            console.log('successfully updated member list')
                        }
                    })
                    
                })
                // groupList = []
                // userCollection.findOne({username : group}, (err, data)=>{
                //     if (data.role == "Super"){
                //         groupCollection.find().toArray((err, data) =>{
                //             for (i = 0; i< data.length; i++){
                //                 console.log(data[i].groupName)
                //                 groupList[i] = data[i].groupName
                //             }
                //             io.emit('group', groupList);
                //         })   
                //     } else {
                //         groupList = []
                //         groupCollection.find().toArray((err, data) =>{
                            
                //             for (i = 0; i< data.length; i++){
                //                 for (j = 0; j < data[i].groupMem.length ;j++){
                //                     if (data[i].groupMem[j].username == group){
                //                         groupList[i - 1] = data[i].groupName 
                //                     }
                //                 }
                //             }
                //             io.emit('group', groupList);
                            
                //         }) 
                //     }
                // })

            })
        })
    }
}