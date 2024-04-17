const sessionController = {};

sessionController.setSSIDCookieLogin = (req, res, next) => {
    if (res.locals.authenticated === false) return next();
    const ssid = res.locals.userObj.id;
    res.cookie('ssid', ssid, { httpOnly: true });
    return next();
}

sessionController.setSSIDCookieSignUp = (req, res, next) => {
    if (res.locals.userExists === true) return next();
    const ssid = res.locals.userInfo.id;
    res.cookie('ssid', ssid, { httpOnly: true });
    return next();
}

sessionController.verifySession = (req, res, next) => {
    const { ssid } = res.cookie;
    if (ssid) return next;
}

sessionController.removeSSIDCookie = (req, res, next) => {
    res.clearCookie('ssid');
    return next();
}

module.exports = sessionController;
