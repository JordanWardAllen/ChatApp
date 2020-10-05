// module.exports = {
//     updatedata: function(db, idToUpdate, UpdatedValue, result){
//         const collection = db.collection('products');
//         var queriedrecord = {id :idToUpdate}
//         var updatedValues = { $set: {units: UpdatedValue}}
//         // collection.updateOne()
//         collection.updateOne(queriedrecord, updatedValues)
//             .then(result = collection.findOne(queriedrecord))
//             // .then(response => result(response))
//             .catch(err => console.log(err))
//     }
// }



module.exports = function(db, app, ObjectID){
    app.post('/api/update', function(req, res){

        if (!req.body){
            return res.sendStatus(400)
        }

        product = req.body.id
        const collection = db.collection('products');
        var objectid = new ObjectID(product.id)    
        console.log(objectid)
        collection.updateOne({ id :product },{$set:{name : req.body.name , price: req.body.price, description: req.body.description, quantity: req.body.quantity}}, {upsertL: true}, 
            (err, data) =>{
            if (err){
                console.log(err)
            } else {
                collection.find({}).toArray((err, data) => {
                    console.log(data)
                    res.send(data)
                })
            }
        })
    })
}