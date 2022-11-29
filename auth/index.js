const webAuth = async (req, res, next) => {
    if (req.session?.username) {
        next()
    } else {
        res.redirect('/login')
    }
}

const apiAuth = async (req, res, next) => {
    if (req.session?.username) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

module.exports = {webAuth , apiAuth};