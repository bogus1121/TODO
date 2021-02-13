const TodosController = require('./controllers/TodosController');
const AuthController = require('./controllers/AuthController');
const AuthControllerPolicy = require('./policies/AuthControllerPolicy');

module.exports = app => {
    app.post(
        '/register',
        AuthControllerPolicy.register,
        AuthController.register
    );
    app.post('/login', AuthController.login);

    app.get('/todos/:userId', TodosController.index);
    app.post('/todos', TodosController.post);
    app.put('/todos/:id', TodosController.update);
    app.delete('/todos/:id', TodosController.remove);
};
