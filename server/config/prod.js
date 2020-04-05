// this can be used with 'dotenv' module for environment
// variable, here if just going to be ignored with .gitignore
module.exports = {
    mongoURI: process.env.MONGODB_URI,
    SESSION_SECRET: process.env.SECRET
};