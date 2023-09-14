// In this module for Handle CRUD function. This project need get method.

function static(func, { req, res }) {
    if (req.method !== 'GET') return;
    const url = req.url;
    if (url === '/' || url.includes('/js/') || url.includes('/public/') || url.includes('html')) func(req, res);
}

function get(url, func, { req, res }) {
    if (req.method === 'GET' && req.url === url) func(req, res);
}

function post(url, func, { req, res }) {
    if (req.method === 'POST' && req.url === url) func(req, res);
}

module.exports = { static, get, post };