const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

//Schema
require('./models/User');
require('./models/Survey');

require('./services/passport');
const keys = require('./config/keys');

//Connecting mongoose to instance of MongoDb
mongoose.connect(keys.mongoURI);

//Generating Express Apps.
const app = express();

//Middlewares
app.use(bodyParser.json());

//Telling express to make use of cookie.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Route handler
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//For Production only
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets 
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file 
    // if it doesn't  recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Express is telling Node to listen to PORT.
const PORT = process.env.PORT || 5000;
app.listen(PORT);