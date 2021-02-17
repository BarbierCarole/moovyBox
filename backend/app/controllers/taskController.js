const Joi = require('joi');
const Task = require('../models/task');


const taskSchema = Joi.object({
    id: Joi.number().integer()
    .min(1).required(),
    label: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .required(),
    description: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500),
    nber_days: Joi.number().integer(),
    general_task: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .required(),

});

const tasksListSchema = Joi.object({
     
    move_id: Joi.number().integer()
    .min(1).required(),
    task_id: Joi.number().integer()
    .min(1).required(),
    note: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250),
    is_realised: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .required(),
});

const taskController = {

    getTaskById: async(req,res) => {

        try {

            console.log('>> req.params :>> ', req.params);

            //  user verification
            const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == req.params.moveId); 
            if (!matchedMove.length) {
                // Abort operation and send error to client;
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - The requested move doesn't belongs to current user", 
                            fr:"Action interdite - Le déménagement concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }

            const task = await Task.getTaskByPk(req.params.moveId, req.params.taskId);
    
            return res.send(task);

        } catch (err) {
            console.trace(err);
        }
    },

};

module.exports = taskController;