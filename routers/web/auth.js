const { Router } = require('express');
const path = require('path');

const authWebRouter = new Router();

authWebRouter.get('/', (req, res) => {
    res.redirect('/'); /*/home*/
})

authWebRouter.get('/login', (req, res) => {
    const username = req.session?.username;
    if (username) {
        res.redirect('/'); /*/home*/
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'));
    }
})

authWebRouter.get('/logout', (req, res) => {
    const username = req.session?.username;
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { username });
            } else {
                res.redirect('/'); /*/home*/
            }
        })

    } else {
        res.redirect('/') /*/home*/
    }
})


authWebRouter.post('/login', (req, res) => {
    req.session.username = req.body.username;
    res.redirect('/'); /*/home*/
})





module.exports = authWebRouter;