const fs = require('fs');


module.exports = function(db, app){
    app.get('/api/read', function(req, res){
        const collection = db.collection('products');
        collection.find({}).toArray((err, data) =>{
            if (err){
                console.log(err)
            } else {
                res.send(data)
                stringedData = JSON.stringify(data)
                fileData = JSON.parse(stringedData) 

                //JSON OBJECT I think
                // console.log(stringedData)



                

                // fs.readFile('../dataExternal.json', (err, JSONdata) => {
                //     if (err) throw err;
                
                // stringedData = JSON.stringify(data)
                // fileData = JSON.parse(stringedData) 
                //     fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                //         if (err) throw err;
                //     })
                // })

            }
        })
    })

    
}