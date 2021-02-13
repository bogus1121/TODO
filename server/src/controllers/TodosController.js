const Task = require('../models/Task');
const uuid = require('uuid');

module.exports = {
    async index(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { userId: req.params.userId },
                order: [['createdAt', 'DESC']]
            }); //{limit: 10}
            res.send(tasks);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured trying to load tasks'
            });
        }
    },

    async update(req, res) {
        try {
            const editedTask = await Task.update(
                {
                    taskName: req.body.taskName,
                    priority: req.body.priority
                },
                { where: { id: req.params.id } }
            );
            res.send(editedTask);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured trying to update the task'
            });
        }
    },

    async post(req, res) {
        try {
            const task = await Task.create({
                id: uuid.v4(),
                userId: req.body.userId,
                taskName: req.body.task,
                priority: req.body.priority
            });
            res.send(task);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured trying to create the data'
            });
        }
    },

    async remove(req, res) {
        try {
            await Task.destroy({ where: { id: req.params.id } });
            res.sendStatus(204);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured trying to update the task'
            });
        }
    }
};
