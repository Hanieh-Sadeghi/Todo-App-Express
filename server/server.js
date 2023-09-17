const http = require('http');
const controller = require('./controller');
const routes = require('./utils/routes');

const server = http.createServer();
const PORT = 3000;

server.on('request', (req, res) => {

    routes.static(controller.staticFiles, { req, res });
    routes.get('/todos', controller.getTodos, { req, res });
    routes.post('/todos', controller.postTodos, { req, res });

    routes.get('/signin', controller.signin, { req, res });
    routes.post('/signin', controller.signinHandler, { req, res });

    routes.get('/signup', controller.signup, { req, res });
    routes.post('/signup', controller.signupHandler, { req, res });
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});
