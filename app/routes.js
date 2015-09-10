// app/routes.js

// grab the nerd model we just created
var Item = require('./models/item');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/items', function(req, res) {
            // use mongoose to get all nerds in the database
            Item.find({"id" : 1},function(err, items) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(items); // return all nerds in JSON format
            });
        });
        
         // sample api route
        app.post('/api/UpdateItems', function(req, res) {
          
            var newValue= req.body.value;
            
            Item.update({"id":1}, {$addToSet: { userList: newValue}} , function(err, items) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err){
                    res.send(err);
                }else{
                    Item.find({"id" : 1},function(err, items) {

                    // if there is an error retrieving, send the error. 
                                    // nothing after res.send(err) will execute
                    if (err)
                        res.send(err);

                    res.json(items); // return all nerds in JSON format
                });
                }
                
            });
        });
         // sample api route
        app.post('/api/deleteItem', function(req, res) {            
            Item.update( {"id": 1 }, {$pull : {"userList" : req.body.value } } , function(err, items) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err){
                    res.send(err);
                }else{
                    Item.find({"id" : 1},function(err, items) {

                        // if there is an error retrieving, send the error. 
                                        // nothing after res.send(err) will execute
                        if (err){
                            res.send(err);
                        }
                        res.json(items); // return all nerds in JSON format
                    });
                }
                
            });
        });
        
          // sample api route
        app.post('/api/updateItem', function(req, res) {            
            var key = "userList."+req.body.index;
            Item.update( {"id": 1 , key : 1 }, {$set : {"userList.$.content" : req.body.value } } , function(err, items) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err){
                    res.send(err);
                }else{
                    Item.find({"id" : 1},function(err, items) {

                    // if there is an error retrieving, send the error. 
                                    // nothing after res.send(err) will execute
                    if (err)
                        res.send(err);

                    res.json(items); // return all nerds in JSON format
                });
                }
                
            });
        });

   

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };