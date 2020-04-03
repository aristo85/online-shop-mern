const passport = require('passport');
const bCrypt = require('bcrypt');
const product = require('./routeProducts')

module.exports = (app, db) => {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            db.collection('users').findOne({ username: req.body.username }, function(err, user) {
                if (err) {
                    next(err);
                } else if (user) {
                    req.user = user;
                }
            });
            return next();
        }
        res.json({
            login: false,
            success: false,
            isAuth: false
        })
    }

    app.get('/api/users/auth', ensureAuthenticated, (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role !== 0,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            username: req.user.username,
            cart: req.user.cart
        });
    });

    app.post('/api/users/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.status(200).json({
                loginSuccess: true
            });
    })

    app.get('/api/users/logout', (req, res) => {
        req.logout();
        res.status(200).send({
            success: true
        });
        });

    app.post('/api/users/register', (req, res, next) => {
            db.collection('users').findOne({ username: req.body.username }, function(err, user) {
                //if the error with mongo
                if (err) {
                    next(err);
                    //checking the existence of the username in DB
                } else if (user) {
                    res.json({ success: false, error: "this username is taken"});
                    //adding new user info to DB 'users' collection
                } else {
                    const hash = bCrypt.hashSync(req.body.password, 10);
                    db.collection('users').insertOne({
                            username: req.body.username,
                            password: hash,
                            lastname: req.body.lastname,
                            name: req.body.name,
                            email: req.body.email,
                            role: 0,
                            cart: [],
                            history: []
                        },
                        (err, doc) => {
                            if (err) {
                                res.redirect('/');
                            } else {
                                next(null, user);
                            }
                        }
                    )
                }
            })
        },
        //checking for authentication and staying logged in directly after the register
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res, next) => {
            res.status(200).json({
                success: true
            });
        }
    );
//making new file "routeProducts.js"  for http requests of 'product' collection
    product(app, db, ensureAuthenticated);


//if the route is not recognized
    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });

}