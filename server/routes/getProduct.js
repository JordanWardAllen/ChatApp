module.exports = function(db, app){
    app.post('/api/getProduct', function(req, res){
        IdToUpdate = req.body.id
        const collection = db.collection('products');
        collection.findOne({id: IdToUpdate} ,(err, data) =>{
            res.send(data)
        })
    })
}