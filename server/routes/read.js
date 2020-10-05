module.exports = function(db, app){
    app.get('/api/read', function(req, res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) =>{
            if (err){
                console.log(err)
            } else {
                res.send(data)
            }
        })
    }) 
}