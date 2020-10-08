module.exports = function(db, app, formidable){

    // imgUpload API receives an image data as a request and if valid, uploads the image to the src/assets folder.
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
    })
}