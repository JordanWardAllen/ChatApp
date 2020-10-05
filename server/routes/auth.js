module.exports = function(db, app){
    app.post('/api/auth', function(req, res){
        const collection = db.collection('users');
        collection.findOne({email : req.body.email, pwd : req.body.pwd} ,(err, data) =>{
            if (data != null){
                res.send(data)
            } else {
                res.send({valid: "false"})
            }
        })
    })
}
