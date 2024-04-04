function auth (req,res,next) {
    console.log(req.session.email)
    if(req.session.email === "admin@admin.com" && req.session.password === "1234"){
        return next()
    } return res.send("Acces dennied")
}

export default auth 