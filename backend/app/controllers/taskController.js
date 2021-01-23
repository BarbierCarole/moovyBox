const Joi = require('joi');
const Task = require('../models/task');


const taskSchema = Joi.object({
    label: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .required(), 
    date: Joi.date()
    .min('now')
    .required(), 
    note: Joi.string()
    .pattern(new RegExp('^[^<>%]{0,}$'))
    .allow("")
    .max(2500),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(150),
    move_id: Joi.number().integer()
    .min(1).required(),
    user_id: Joi.number().integer()
    .min(1).required(),
});

const taskController = {

    getTasks: async(req,res) => {

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

            const tasks = await Task.getAllTaskFromMove(req.params.moveId);
            console.log('>> taskController : tasks :', tasks);
            return res.send(tasks);

        } catch (err) {
            console.trace(err);
        }
    },

    createTask: async (req, res) => {

        //* Create a new task in DB
        try {
            
            const payloadValidation = taskSchema.validate(req.body); 
            
            // if an error is found 
            if (!!payloadValidation.error) {
                // abort and send error 400 : bad request
                return res.status(400).send(payloadValidation.error); 
            }
            
            // form is valid !
            
            // Check if the destination move belongs to user
            const move = req.session.user.moves.filter(moveObj => moveObj.id == req.body.move_id); 
            
            // If no move matches
            if (!move.length) {
                // abort and send error 403 : Forbidden action
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
            
            // User is authorized to perform operation ! 
            
            //Compare the label field with the DB values
            const taskLabelMatch = await Task.taskLabelExists(req.body); 
            console.log("taskLabelMatch :>>", taskLabelMatch);
            
            //If the label is the same of the DB value of the same user
            if (taskLabelMatch){
                // send a error to client : 409  COnflict
                return res.status(409).send({
                    error : {
                        statusCode: 409,
                        message: {
                            en:"Conflict - This task label already exists", 
                            fr:"Conflit - Cette étiquette de carton existe déjà"
                        }
                    }
                });
                
            }
            
            // The task label in available for this move ! 
            
            // Add current user_id to payload
            req.body.user_id = req.session.user.id; 
        
            // create an instance of a task
            const newTask = new Task(req.body); 
            
            // Save the current task object to DB
            const storedTask = await newTask.insert(); 

            // Content was updated : on search generate a new item
            req.session.user.contentUpdated = true; 
            
            // Send the newly added task entry to client
            console.log(">> res :", res);
            return res.send(storedTask);        
            
        } catch (error) {
            console.trace(error);
        }

        // try {
            
        //     // validation of datas of form
        //     const payloadValidation = taskSchema.validate(req.body); 
        //     if (!!payloadValidation.error) {
        //         // abort and send error 400 : bad request
        //         return res.status(400).send(payloadValidation.error); 
        //     }

        //     // verification 
        //     const move = req.session.user.moves.filter(moveObj => moveObj.id == req.body.move_id); 
            
        //     // If no move matches
        //     if (!move.length) {
        //         // abort and send error 403 : Forbidden action
        //         return res.status(403).send({
        //             error : {
        //                 statusCode: 403,
        //                 message: {
        //                     en:"Forbidden action - The requested move doesn't belongs to current user", 
        //                     fr:"Action interdite - Le déménagement concerné n'appartient pas à l'utilisateur actuel"
        //                 }
        //             }
        //         });
        //     }

        //     // to see if the label exists or not
        //     const taskLabelMatch = await Task.taskLabelExists(req.body); 
        //     console.log("taskLabelMatch :>>", taskLabelMatch);
        //     //If the label is the same of the DB value of the same user
        //     if (taskLabelMatch){
        //         // send a error to client : 409  COnflict
        //         return res.status(409).send({
        //             error : {
        //                 statusCode: 409,
        //                 message: {
        //                     en:"Conflict - This task already exists", 
        //                     fr:"Conflit - Cette action existe déjà"
        //                 }
        //             }
        //         });
                
        //     }
        //     const newTask = new Task(req.body);
        //     const listTask = await newTask.insert();
        //     if (!!listTask) {
        //         // Content was updated : on search generete a new task
        //         req.session.user.contentUpdated = true;    
        //     }   
            
        //     // Send the newly added task entry to client
        //     return res.send(listTask);  

        // } catch (error) {
        //     console.trace(error);

        // }
    },

};

module.exports = taskController;