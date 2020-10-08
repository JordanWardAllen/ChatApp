module.exports = function(db, app, ObjectID){

    // update API updates the MongoDB of the user that matches the request ID to the values of the rest of the request object. 
    // Currently returning the request data if unsuccessful for testing
    app.post('/api/update', function(req, res){

        if (!req.body){
            return res.sendStatus(400)
        }

        userID = req.body.id
        const collection = db.collection('users');
 
        collection.updateOne({ id : userID },{$set:{username : req.body.username , pwd: req.body.pwd, email: req.body.email, role: req.body.role}}, {upsertL: true}, 
            (err, data) =>{
            if (err){
                console.log(err)
            } else {
                collection.findOne({id: userID} , (err, data) => {
                    res.send(data)
                    return {id : userID , username : req.body.username , pwd: req.body.pwd, email: req.body.email, role: req.body.role}
                })
            }
        })
    })
}