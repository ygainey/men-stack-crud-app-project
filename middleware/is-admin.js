const isAdminSignedIn = (req, res, next) => {
    if(!req.session.user.isAdmin){
        return res.redirect('/index')
    }
    next()   
}
  
module.exports = isAdminSignedIn;