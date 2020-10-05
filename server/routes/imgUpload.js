module.exports = function(db, app, formidable){
    app.post('/api/imgUpload', function(req, res){
        var form = new formidable.IncomingForm({uploadDir : '../src/assets/userImages'});
        form.keepExtensions = true;

        form.on('error', (err)=>{
            
            res.send({
                result : "failed",
                data : {},
                numberOfImges : 0,
                message : "Failed to upload image. Error is : " + err
            })
            throw err;
        })



        form.on('fileBegin' , (name, file)=>{
            file.path = form.uploadDir + "/" + file.name;
        })


        form.on('file', (field, file)=>{
            res.send({
                result : "OK",
                data : {"filename" : file.name, "size" : file.size},
                numberOfImages : 1,
                message : "Upload was successful"
            })
        })


        form.parse(req);

        // if (!req.body){
        //     return res.sendStatus(400)
        // }
        // console.log('fired')
        // user = req.body
        
        // const collection = db.collection('users');
        // collection.find().count((err, count) =>{
        //     newId = count
        //     newVal = {id: newId.toString(), username : user.username , pwd: user.pwd, email: user.email, role: user.role, valid: "true"};
        //     console.log(newVal)
        //         collection.insertOne(newVal, (err, data) =>{
        //             if (err){
        //                 console.log(err)
        //             } else {
        //                 res.send(newVal);
        //                 return newVal;
        //             }
        //         })
        // })
    })
}