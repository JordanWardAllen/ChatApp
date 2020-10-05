module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        product = req.body
        const collection = db.collection('products');
        collection.find({'id' : product.id}).count((err, count) =>{
            if (count == 0){
                collection.insertOne({id: product.id, name : product.name , price: product.price, description: product.description, quantity: product.quantity}, (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        res.send(data);
                    }
                })
            } else {
                res.send({valid : false});
            }
        })
    })
}