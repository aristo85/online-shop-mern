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
const path = require('path');

require("dotenv").config();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.SESSION_SECRET || process.env.SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('uploads'));

mongo.connect(process.env.MONGO_URI || config.mongoURI, (err, db) => {
    if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');

//separating authentication and routing files with 'auth.js' and 'routes.js'
        auth(app, db);

        routes(app, db);


        // Serve static assets if production
        if(process.env.NODE_ENV === 'production') {
            // Set static folder
            app.use(express.static('client/build'));

            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
            })
        }

        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server Running on ${port}`)
        });


    }
});





