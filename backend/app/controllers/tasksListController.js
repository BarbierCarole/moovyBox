const Joi = require('joi');
const TasksList = require('../models/tasksList');


const TaskSchema = Joi.object({
    id: Joi.number().integer()
    .min(1).required(),
    label: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .required(),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500),
});

const TasksListSchema = Joi.object({
     
    move_id: Joi.number().integer()
    .min(1).required(),
    task_id: Joi.number().integer()
    .min(1).required(),
    date_completion: Joi.number().integer(),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250),
    is_realised: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .required(),
});

const tasksListController = {

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

    // createTask: async (req, res) => {

    //     //* Create a new task in DB
    //     try {
            
    //         const payloadValidation = taskSchema.validate(req.body); 
    //         // if an error is found 
    //         if (!!payloadValidation.error) {
    //             // abort and send error 400 : bad request
    //             return res.status(400).send(payloadValidation.error); 
    //         }
            
    //         // form is valid !
            
    //         // Check if the destination move belongs to user
    //         const move = req.session.user.moves.filter(moveObj => moveObj.id == req.body.move_id); 
            
    //         // If no move matches
    //         if (!move.length) {
    //             // abort and send error 403 : Forbidden action
    //             return res.status(403).send({
    //                 error : {
    //                     statusCode: 403,
    //                     message: {
    //                         en:"Forbidden action - The requested move doesn't belongs to current user", 
    //                         fr:"Action interdite - Le déménagement concerné n'appartient pas à l'utilisateur actuel"
    //                     }
    //                 }
    //             });
    //         }
            
    //         // User is authorized to perform operation ! 
            
    //         //Compare the label field with the DB values
    //         const taskLabelMatch = await Task.taskLabelExists(req.body); 
    //         console.log("taskLabelMatch :>>", taskLabelMatch);
            
    //         //If the label is the same of the DB value of the same user
    //         if (taskLabelMatch){
    //             // send a error to client : 409  COnflict
    //             return res.status(409).send({
    //                 error : {
    //                     statusCode: 409,
    //                     message: {
    //                         en:"Conflict - This task label already exists", 
    //                         fr:"Conflit - Cette étiquette de carton existe déjà"
    //                     }
    //                 }
    //             });
                
    //         }
            
    //         // The task label in available for this move ! 
            
    //         // Add current user_id to payload
    //         req.body.user_id = req.session.user.id; 
        
    //         // create an instance of a task
    //         const newTask = new Task(req.body); 
            
    //         // Save the current task object to DB
    //         const selectedTask = await newTask.insert(); 

    //         // Content was updated : on search generate a new item
    //         req.session.user.contentUpdated = true; 
            
    //         // Send the newly added task entry to client            
    //         return res.send(selectedTask);        
            
    //     } catch (error) {
    //         console.trace(error);
    //     }

        
    // },

    // updateTaskAll: async (req, res) => {
    //     //* Update the task
    //     try {

    //         const taskValidation = taskSchema.validate(req.body); 
    //         // if an error is found 
    //         if (!!taskValidation.error) {
    //             // abort and send error 400 : bad request
    //             res.status(400).send(taskValidation.error); 
    //         }
            
    //         // form is valid !
            
    //         const selectedTask = await Task.getByPk(req.params.taskId);
    //         // If no task
    //         if (!selectedTask ) {
    //             // Abort and send error : 404 not found
    //             return res.status(404).send({
    //                 error : {
    //                     statusCode: 404,
    //                     message: {
    //                         en:"Not found - This action doesn't exists", 
    //                         fr:"Pas trouvé - Cette tâche n'existe pas"
    //                     }
    //                 }
    //             });
    //         }
    //         // We have a task
    //         if (req.session.user.id !== selectedTask.user_id) {
    //             // prevent action and send an error
    //             return res.status(403).send({
    //                 error : {
    //                     statusCode: 403,
    //                     message: {
    //                         en:"Forbidden action - Pointed box doesn't belong to the current user", 
    //                         fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
    //                     }
    //                 }
    //             });
    //         }

    //         // Update the current task with paylod values
    //         for (const prop in req.body) {
    //             selectedTask[prop] = req.body[prop]; 
    //         }
            
    //         // Execute request
            
    //         const updatedTask = await selectedTask.update(); 
            
    //         // const sessionMove = req.session.user.moves.filter(move => move.id == req.params.moveId); 

    //         // Content was updated : on search generate a new item
    //         req.session.user.contentUpdated = true; 
            
    //         // return the updated task
    //         return ((updatedTask) ? updatedTask : false);
    //     } catch (error) {
    //         console.trace(error);
    //     }
        
    // },

    // updateCheckedTask: async (req, res) => {
    //     //* Update the task
    //     try {

    //         const taskValidation = checkedtaskSchema.validate(req.body); 
    //         // if an error is found 
    //         if (!!taskValidation.error) {
    //             // abort and send error 400 : bad request
    //             res.status(400).send(taskValidation.error); 
    //         }
            
    //         // form is valid !
            
    //         const selectedTask = await Task.getByPk(req.params.taskId);
    //         // If no task
    //         if (!selectedTask ) {
    //             // Abort and send error : 404 not found
    //             return res.status(404).send({
    //                 error : {
    //                     statusCode: 404,
    //                     message: {
    //                         en:"Not found - This action doesn't exists", 
    //                         fr:"Pas trouvé - Cette tâche n'existe pas"
    //                     }
    //                 }
    //             });
    //         }
    //         // We have a task
    //         if (req.session.user.id !== selectedTask.user_id) {
    //             // prevent action and send an error
    //             return res.status(403).send({
    //                 error : {
    //                     statusCode: 403,
    //                     message: {
    //                         en:"Forbidden action - Pointed box doesn't belong to the current user", 
    //                         fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
    //                     }
    //                 }
    //             });
    //         }

    //         // Update the current task with paylod values
    //         for (const prop in req.body) {
    //             selectedTask[prop] = req.body[prop]; 
    //         }
            
    //         // Execute request
            
    //         const updatedTask = await selectedTask.update(); 
            
    //         // const sessionMove = req.session.user.moves.filter(move => move.id == req.params.moveId); 

    //         // Content was updated : on search generate a new item
    //         req.session.user.contentUpdated = true; 
            
    //         // return the updated task
    //         return ((updatedTask) ? updatedTask : false);
    //     } catch (error) {
    //         console.trace(error);
    //     }
        
    // },

};

module.exports = tasksListController;