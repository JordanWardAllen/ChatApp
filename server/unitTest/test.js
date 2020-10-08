var assert = require('assert');
var io = require('socket.io-client');
let chai = require('chai')
let chaiHttp = require('chai-http');
var app = require('../server.js');
// var http = require('http');
// var options = {

// }

var should = chai.should();
chai.use(chaiHttp);




// describe('Server test', ()=>{
//     before(()=>{
//         console.log("Before test")
//     })


//     after(()=>{
//         console.log('After test')
//     })

    describe('/api/read', ()=>{
        it('it should GET all products', (done)=>{
            chai.request(app)
                .get('/api/read')
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })


    describe('/api/read', ()=>{
        it('it should GET all products', (done)=>{
            chai.request(app)
                .get('/api/read')
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })


    describe('/api/getUser', ()=>{
        it('it should POST id of 1 user', (done)=>{
            chai.request(app)
                .post('/api/getUser').send({'id': "2"})
                .end((err, res) =>{
                    res.should.have.status(200);
                    assert.strictEqual(res.body.username, "JimBob")
                    done();
                })
        })
    })

    describe('/api/add', ()=>{
        it('it should POST all products', (done)=>{
            chai.request(app)
                .post('/api/add').send({username : "newUsername" , pwd: "newPwd", email: "newEmail", role: "newRole", valid: "true"})
                .end((err, res) =>{
                    res.should.have.status(200);
                    assert.strictEqual(res.body.username, "newUsername")
                    done();
                })
        })


    describe('/api/remove', ()=>{
        it('it should POST id to be removed', (done)=>{
            chai.request(app)
                .post('/api/remove').send({'id': "3"})
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.have.lengthOf(3)
                    done();
                })
        })
    })

    describe('/api/auth', ()=>{
        it('it should return authenticated login', (done)=>{
            chai.request(app)
                .post('/api/auth').send({email: "email1", pwd : 'pwd1'})
                .end((err, res) =>{
                    res.should.have.status(200);
                    assert.strictEqual(res.body.valid, "true");
                    done();
                })
        })
    })
    

    describe('/api/update', ()=>{
        it('it should POST id to be updated', (done)=>{
            chai.request(app)
                .post('/api/update').send({id: "0", username: "updatedUsername",  pwd: "pwd1", email: "email1", role: "Super", imgSrc: "burt.jpg", valid: "true"})
                .end((err, res) =>{
                    res.should.have.status(200);            
                    assert.strictEqual(res.body.username, "updatedUsername")
                    done();
                })
        })
    })


    // describe('/api/imgUpload', ()=>{
    //     it('it should return authenticated login', (done)=>{
    //         chai.request(app)
    //             .post('/api/imgUpload').send({email: "email1", pwd : 'pwd1'})
    //             .end((err, res) =>{
    //                 res.should.have.status(200);
    //                 assert.strictEqual(res.body.valid, "true");
    //                 // res.body.should.have.lengthOf(3)
    //                 done();
    //             })
    //     })
    // })


    


});