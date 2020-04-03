const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const auth = require('./middleware/auth');
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb');
const routes = require('./routes/routes');
const fileUpload = require('express-fileupload');
const ObjectId = require('mongodb').ObjectId;

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('uploads'));

mongo.connect(config.mongoURI, (err, db) => {
    if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');


        // db.collection('users').update(
        //     { _id: ObjectId("5e7328d1d2d2f719248682cf") },
        //     { $set:
        //             {
        //                 cart: [1,2,3]
        //             }
        //     }
        // );


        auth(app, db);

        routes(app, db);

        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server Running on ${port}`)
        });


    }
});





