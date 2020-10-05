module.exports = function(db, app, ObjectID){
    app.post('/api/update', function(req, res){

        if (!req.body){
            return res.sendStatus(400)
        }

        userID = req.body.id
        const collection = db.collection('users');
        // var objectid = new ObjectID(product.id)    
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