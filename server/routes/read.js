module.exports = function(db, app){

    // Read API returns to the client all existing users in the MongoDB
    app.get('/api/read', function(req, res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) =>{
            if (err){
                console.log(err)
            } else {
                res.send(data)
                return data
            }
        })
    }) 
}