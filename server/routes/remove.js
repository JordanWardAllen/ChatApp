module.exports = function(db, app, ObjectID){
    app.post('/api/remove', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }

        IdToDelete = req.body.id
        const collection = db.collection('users');
        collection.deleteOne({id: IdToDelete}, (err, doc) =>{
            if (err){
                console.log("Error" + err)
            } else {
                collection.find({}).toArray((err, data) => {
                    res.send(data)
                    return data
                })
            }
        })
    })
}
