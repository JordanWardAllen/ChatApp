module.exports = function(db, app){

    // GetUser API queries the MongoDB for a single user of the users collection that match the request ID.
    app.post('/api/getUser', function(req, res){
        IdToUpdate = req.body.id
        const collection = db.collection('users');
        collection.findOne({id: IdToUpdate} ,(err, data) =>{
            res.send(data)
        })
    })
}
