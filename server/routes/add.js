module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        user = req.body
        newVal = {id: user.id, username : user.username , pwd: user.pwd, email: user.email, role: user.role, valid: "true"};
        const collection = db.collection('users');
        collection.find({'id' : user.id}).count((err, count) =>{
            if (count == 0){
                collection.insertOne(newVal, (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        res.send(newVal);
                        return newVal;
                    }
                })
            } else {
                res.send({valid : false});
            }
        })
    })
}