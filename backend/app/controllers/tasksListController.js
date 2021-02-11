const Joi = require('joi');
const TasksList = require('../models/tasksList');


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

const tasksListController = {

    createAllTasks: async (req, res) => { 

        //* créer une liste avec toutes les tâches de la table task pour un déménagement donné dans la table de liaison tasks_list
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


            const tasksList = await TasksList.insertNewTasks(req.params.moveId);
            
            return res.send(tasksList);
            
        } catch (error) {
            console.trace(error);
        }

        
    },

    getTasksList: async(req,res) => {

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

            const tasksList = await TasksList.getAllTaskFromMove(req.params.moveId);
    
            return res.send(tasksList);

        } catch (err) {
            console.trace(err);
        }
    },

    
    updateTasksList: async (req, res) => {
        //* Update the tasksList
        try {
            console.log(">> tasksListContr l.144 req.body", req.body); // exemple -> { task_id: '26', move_id: 19, is_realised: false }
            const tasksListValidation = tasksListSchema.validate(req.body); 
            // if an error is found 
            if (!!tasksListValidation.error) {
                // abort and send error 400 : bad request
                res.status(400).send(tasksListValidation.error); 
            }
            
            // form is valid !
            
            const selectedTaskInList = await TasksList.getByPk(req.params.moveId, req.params.taskId);
            // If no task
            if (!selectedTaskInList ) {
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
            // ! commenter car user n'existe pas ici We have a task 
            // if (req.session.user.id !== selectedTaskInList.user_id) {
            //     // prevent action and send an error
            //     return res.status(403).send({
            //         error : {
            //             statusCode: 403,
            //             message: {
            //                 en:"Forbidden action - Pointed box doesn't belong to the current user", 
            //                 fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
            //             }
            //         }
            //     });
            // }

            // Update the current task with paylod values
            for (const prop in req.body) {
                selectedTaskInList[prop] = req.body[prop]; 
            }
            
            // Execute request
            
            const updatedTask = await selectedTaskInList.updateTasksList(); 
            
            // const sessionMove = req.session.user.moves.filter(move => move.id == req.params.moveId); 

            //req.session.user.contentUpdated = true; 
            
            // return the updated task
            return res.send((updatedTask) ? updatedTask : false);
        } catch (error) {
            console.trace(error);
        }
        
    },

};

module.exports = tasksListController;