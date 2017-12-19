var models = require('../models');

module.exports = function(app){
    // Get all posts
    app.get('/api/posts', function(req, res){
        models.Posts.findAll().then(function(data){
            res.json(data);
        });
    });

    // Get posts of a certain user
    app.get('/api/posts/:userId', function(req, res){
        models.Posts.findAll({
            where: {UserId: req.params.userId},
            include: [models.Users]
        }).then(function(data){
            res.json(data);
        });
    });

    //create new post
    app.post('/api/posts', function(req, res){
        models.Posts.create({
            body: req.body.body,
            UserId: req.user.id
        }).then(function(data){
            res.send('/home');
        })
    });

    //delete current user's post
    // app.delete('/api/posts', function(req, res){
    //     models.Posts.destroy({
    //         where: {
    //             userId: req.user.id
    //         }
    //     }).then(function(data){
    //         res.json(data);
    //     });
    // });
    app.put('/api/update-post', function (req, res) {
        models.Posts.update({

            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.redirect('/home');
        });
    });

    // Delete
    app.delete('/api/delete-post/:id', function (req, res) {
        models.Posts.destroy({
            where: {
                id: req.user.Id
            }
        }).then(function (data) {
            res.send('deleted');
        });
    });
//update user's post
    app.put("/api/posts", function(req, res) {
    models.Posts.update(
      req.body,
      {
        where: {
          UserId: req.body.id
        }
      }).then(function(data) {
        res.send('success');
      });
  });
}
