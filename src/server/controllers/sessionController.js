const sessionController = {};

sessionController.setSSIDCookie = (req, res, next) => {
    const ssid = res.locals.userInfo.id;
    res.cookie('ssid', ssid, { httpOnly: true });
}

sessionController.verifySession = (req, res, next) => {
    const ssid = res.cookie.ssid;
    if (ssid) return next;
}

module.exports = sessionController;
