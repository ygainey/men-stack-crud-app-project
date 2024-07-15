const isSignedIn = (req, res, next) => { //next passes to the next middleware
    if (req.session.user){ 
        return next();
    }
    res.redirect('/sign-in');
};
  
module.exports = isSignedIn;