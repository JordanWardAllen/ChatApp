module.exports = function(db, app){
    app.post('/api/getUser', function(req, res){
        IdToUpdate = req.body.id
        const collection = db.collection('users');
        collection.findOne({id: IdToUpdate} ,(err, data) =>{
            res.send(data)
        })
    })
}
