exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
    .get('Cookie')
    .split(':')[0]
    .trim()
    .split('=')[1] === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthentivcated: isLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'isLoggedIn=true; HttpOnly')
    res.redirect('/');
};
