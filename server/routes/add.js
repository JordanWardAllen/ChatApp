module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        console.log('fired')
        user = req.body
        
        const collection = db.collection('users');
        collection.find().count((err, count) =>{
            newId = count
            newVal = {id: newId.toString(), username : user.username , pwd: user.pwd, email: user.email, role: user.role, valid: "true"};
            console.log(newVal)
                collection.insertOne(newVal, (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        res.send(newVal);
                        return newVal;
                    }
                })
        })
    })
}