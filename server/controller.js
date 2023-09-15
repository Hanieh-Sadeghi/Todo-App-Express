const { readFile } = require('./utils/readFile');
const db = require('./model')

//check double username
// add jwt
// error handler
// check return tocke to client in signinHandler function

function staticFiles(req, res) {
    const url = req.url === '/' ? '/index.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

function getTodos(req, res) {
    authentication(req, res, (status, user) => {
        if (!status) return redirectToLoginPage(req, res);
        sendJsonData(req, res, { 'status': true, 'todos': user.todos })
    })
}

function postTodos(req, res) {

    authentication(req, res, (status, user, data) => {
        if (!status) return redirectToLoginPage(req, res);

        req.on('data', chunk => {
            user.todos = JSON.parse(chunk.toString('utf-8'));
            db.write_data(data);
        })
        sendJsonData(req, res, { 'status': true, 'response': 'Todos saved successfully!' })
    })
}

function signin(req, res) {
    const url = req.url === '/signin' ? '/signin.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');

        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

function signinHandler(req, res) {
    var data;

    req.on('data', (chunk) => {
        data = JSON.parse(chunk.toString('utf-8'));
    });

    req.on('end', () => {

        if (data.username !== '' && data.password !== '') {
            const username = data.username;
            const password = data.password;

            response = { 'name': '', 'username': '', 'status': 'fail', 'token': '' }

            db.read_data((data, err) => {
                data.forEach((element) => {
                    const check = element.username === username && element.password === password;
                    if (!check) return

                    token = makeToken();
                    element.token = token;

                    response.name = element.name;
                    response.username = element.username;
                    response.status = 'success';
                    response.token = token;
                })

                db.write_data(data);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            });

        }
    })
}

function signup(req, res) {
    const url = req.url === '/signup' ? '/signup.html' : req.url;

    readFile(url, (error, data) => {

        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            return res.end()
        }

        if (req.url.includes('js')) res.setHeader('Content-Type', 'application/javascript');
        if (req.url.includes('css')) res.setHeader('Content-Type', 'text/css');
        if (req.url.includes('html')) res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}

function signupHandler(req, res) {
    var data;

    req.on('data', chunk => data = JSON.parse(chunk.toString('utf-8')))

    req.on('end', () => {

        if (data.username !== '' || data.password !== '') {

            const user = {
                'id': '0',
                'name': data.name,
                'username': data.username,
                'password': data.password,
                'email': data.email,
                'token': '',
                'todos': []
            }

            db.read_data((res, err) => {
                user.id = res.length + 1;
                res.push(user);
                db.write_data(res);
            });

            return sendJsonData(req, res, {
                'status': true,
                'response': 'user sign up successfully!',
                'url': `http://${req.headers['host']}/signin`,
            })
        }

        sendJsonData(req, res, {
            'status': false,
            'response': 'Try agin',
            'url': `http://${req.headers['host']}/signup`,
        })

    })
}

function makeToken(length = 40) {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function authentication(req, res, callBack) {
    const token = req.headers.authentication;
    db.checkToken(token, callBack)
}

function redirectToLoginPage(req, res) {
    const response = {
        'status': false,
        'response': 'login fail. please first login',
        'url': `http://${req.headers['host']}/signin`
    }
    sendJsonData(req, res, response);
}

function sendJsonData(req, res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.write(JSON.stringify(data));
    res.end();
}


module.exports = {
    staticFiles,
    getTodos,
    postTodos,
    signin,
    signinHandler,
    signup,
    signupHandler,
};

