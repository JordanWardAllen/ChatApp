module.exports = function(db, app){
    app.post('/api/getUser', function(req, res){
        IdToFind = req.body.id
        const collection = db.collection('users');
        collection.findOne({id: IdToFind} ,(err, data) =>{
            res.send(data)
        })
    })
}