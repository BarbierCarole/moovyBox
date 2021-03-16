const Joi = require('joi');
const Task = require('../models/task');


const taskSchema = Joi.object({
    id: Joi.number().integer()
    .min(1).required(),

});
const taskUpdateSchema = Joi.object({
    
    label: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .required(),
    description: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500)
    .allow('') ,
});

const taskController = {

    //api/move/:moveId/task/:taskId pour afficher le détail de la tache
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

            const task = await Task.getTaskByPk(req.params.taskId);
    
            return res.send(task);

        } catch (err) {
            console.trace(err);
        }
    },


    updateTask: async (req, res) => {
        // Update the tasksList
        try {
            const taskUpdateValidation = taskUpdateSchema.validate(req.body);
            console.log(">>> l.97 req.body taskContreoller", req.body);
           
            // If payload is not correct send error; 
            if (!!taskUpdateValidation.error) {
                console.log("taskController taskUpdateValidation pb");
                return res.status(400).send(taskUpdateValidation.error); 
            }
            console.log(">> tasksListContr l.144 req.body", req.body); // exemple -> { task_id: '26', move_id: 19, is_realised: false }
           
            const selectedTask = await Task.getTaskByPk( req.params.taskId);
            // If no task
            if (!selectedTask ) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - This action doesn't exists", 
                            fr:"Pas trouvé - Cette tâche n'existe pas"
                        }
                    }
                });
            }

            // Update the current task with paylod values
            for (const prop in req.body) {
                selectedTask[prop] = req.body[prop]; 
            }
            console.log('l.183 tasklisController : req.body',req.body)
            // Execute request
            
            const updatedTask = await selectedTask.updateTask(); 
            
            // const sessionMove = req.session.user.moves.filter(move => move.id == req.params.moveId); 
            req.session.user.contentUpdated = true; 
            
            // return the updated task
            return res.send((updatedTask) ? updatedTask : false);
        } catch (error) {
            console.trace(error);
        }
    },
};

module.exports = taskController;