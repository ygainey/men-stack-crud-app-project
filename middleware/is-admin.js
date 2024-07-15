const isAdminSignedIn = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.redirect('/')
    }
    res.render('admin/index.ejs')
    next()   
}
  
module.exports = isAdminSignedIn;