const Joi = require('joi');
const TasksList = require('../models/tasksList');
const Task = require('../models/task');

const addSchema = Joi.object({
    label: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .required(),
    note: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500)
    .allow(""),
    description: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500)
    .allow(""),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .allow(""),
    date_perso: Joi.date()    
    .min('now')
    .required(),
    is_realised: Joi.boolean()
    .truthy('true')
    .falsy('false'),
});

const tasksListSchema = Joi.object({
     
    note: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(2500)
    .allow(""),
    contact: Joi.string()
    .pattern(new RegExp('^[^<>%]{3,}$'))
    .max(250)
    .allow(""),   
    date_perso: Joi.date()
    .min('now')
    .required(),
    is_realised: Joi.boolean()
    .truthy('true')
    .falsy('false'), 

});

const checkboxTasksListSchema = Joi.object({
    move_id: Joi.number().integer()
    .min(1).required(),
    task_id:Joi.number().integer()
    .min(1).required(),    
    is_realised: Joi.boolean()
    .truthy('true')
    .falsy('false'), 

});

const tasksListController = {

    // pour déployer toutes les taches générales dans un déménagement
    createAllTasks: async (req, res) => { 

        //* créer une liste avec toutes les tâches de la table task pour un déménagement donné dans la table de liaison tasks_list
        try {
            console.log('>> tasksListController.createAllTasks : req.params => ', req.params);

            //  vérification de l'utilisateur
            const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == req.params.moveId); 
            if (!matchedMove.length) {
                // opération arrétée et envoi de message d'erreur
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: "Action interdite - Le déménagement concerné n'appartient pas à l'utilisateur actuel"}
                });
            }
            const tasksList = await TasksList.insertNewTasks(req.params.moveId);
            console.log(">> Ma checklist a bien été créée");
            return res.send(tasksList);
            
        } catch (error) {
            console.trace(error);
        }
    },
    // /api/move/:moveId/task/:taskId pour afficher le détail de la tache dans un déménagement
    getTaskById: async(req,res) => {

        try {

            //  vérification d'utilisateur
            const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == req.params.moveId); 
            if (!matchedMove.length) {
                // opération avortée et envoi message au client
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: "Action interdite - Le déménagement concerné n'appartient pas à l'utilisateur actuel"
                    }
                });
            }
            const task = await TasksList.getByPk(req.params.moveId, req.params.taskId);    
            return res.send(task);

        } catch (err) {
            console.trace(err);
        }
    },

    getTasksList: async(req,res) => {

        try {

            //  user verification
            // console.log(">> l.101 req.session.user");
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
        
        try {
                            
            // validation des données du formulaire
            const tasksListValidation = tasksListSchema.validate(req.body); 
            // si erreur trouvée
            if (!!tasksListValidation.error) {
                // message d'erreur retourné
                return res.status(400).send(tasksListValidation.error); 
            }
            // données du formulaire valides
            
            // on recherche la tâche dans la table de liaison avec les paramètres passés dans l'URL moveId et taskId qui sont les 2 clés primaires
            const selectedTaskInList = await TasksList.getByPk(req.params.moveId, req.params.taskId);

            // On vérifie que la tâche existe
            if (!selectedTaskInList ) {
                // si tâche non trouvée, opération avortée et envoi message 404 au client
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: "Pas trouvé - Cette tâche n'existe pas"
                    }
                });
            }
            
            // maj de la tâche avec les nouvelles valeurs
            for (const prop in req.body) {
                selectedTaskInList[prop] = req.body[prop]; 
            }
            console.log('>> l.160 tasksListController : req.body',req.body);
            
            const updatedTask = await selectedTaskInList.updateTasksList(); 
            
            req.session.user.contentUpdated = true; 
            console.log(">> tasksListController.updatedTasksList l.176 maj de la tâche avec nvelles valeurs => ",updatedTask);
            // envoi de la maj au client
            return res.send((updatedTask) ? updatedTask : false);
        } catch (error) {
            console.trace(error);
        }
        
    },

    // pour la maj des checkbox
    updatecheckboxTasksList: async (req, res) => {
        
        try {
                            
            // validation des données du formulaire
            const checkboxTasksListValidation = checkboxTasksListSchema.validate(req.body); 
            // si erreur trouvée
            if (!!checkboxTasksListValidation.error) {
                // message d'erreur retourné
                return res.status(400).send(checkboxTasksListValidation.error); 
            }
            // données du formulaire valides
            
            // on recherche la tâche dans la table de liaison avec les paramètres passés dans l'URL moveId et taskId qui sont les 2 clés primaires
            const selectedTaskInList = await TasksList.getByPk(req.params.moveId, req.params.taskId);

            // On vérifie que la tâche existe
            if (!selectedTaskInList ) {
                // si tâche non trouvée, opération avortée et envoi message 404 au client
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: "Pas trouvé - Cette tâche n'existe pas"
                    }
                });
            }
            
            // maj de la tâche avec les nouvelles valeurs
            for (const prop in req.body) {
                selectedTaskInList[prop] = req.body[prop]; 
            }
            console.log('>> tasksListCOntroller.updatecheckboxTasksList l.217 => req.body : ',req.body);
            
            const updatedTask = await selectedTaskInList.updateTasksList(); 
            
            req.session.user.contentUpdated = true; 
            console.log(">> tasksListController.updatecheckboxTasksList l.222 updatedTask => ",updatedTask);
            // envoi de la maj au client
            return res.send((updatedTask) ? updatedTask : false);
        } catch (error) {
            console.trace(error);
        }
        
    },

    // pour enregistrer une nouvelle tache
    createTaskInTasksList: async(req,res) => {
    
        try {
            // contrôle des données reçues par le body
            const payloadValidation = addSchema.validate(req.body);
            if (!!payloadValidation.error) {
                // if an error is found, update status code (400 for bad request)and send the error details
                return res.status(400).send(payloadValidation.error); 
            }
            const moveId = req.params.moveId;

            // étape 1 => création d'une instance de Task
            const newTask = new Task(req.body);             
            console.log(">> tasksListController.createTaskInTasksList création instance Task", newTask);
            //  Insertion nouvelle tache dans table Task
            const storedTask = await newTask.insertInTask(moveId);
            console.log(">> tasksListController Insertion nouvelle tache dans table Task", storedTask);

            // étape 2 => création d'une instance de TasksList
            const newTasksList = new TasksList(req.body);
            console.log(">> tasksListController.createTaskInTasksList création instance de TasksList", newTasksList);
            newTasksList.task_id = storedTask.id;
            //  Insertion nouvelle liaison dans table de liaison
            const storedTasksList = await newTasksList.insertInTasksList(moveId);
            console.log(">> tasksListController.createTaskInTasksList Insertion dans table de liaison", storedTasksList);

            res.send(storedTasksList);                

        } catch (err) {
            console.trace(err);
        }
    },

    deleteTaskInList: async(req,res) => {
        try {

            // 1er -> pour supprimer la liaison tache <-> demenagement
            const storedTaskInList = await TasksList.getByPk(req.params.moveId, req.params.taskId);
           
            // If no box was found 
            if (!storedTaskInList ) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: "Pas trouvé - cette tache n'existe pas dans la liste"
                    }
                });
            }
            // on supprime la liaison dans la table tasks_list
            const successTaskInList = await storedTaskInList.delete();      
            if (!successTaskInList) {
                return res.status(500).send({
                    statusCode : 500,
                    message: "Quelque chose s'est mal passé"
                });
            } else { console.log("1/ tasksListController.deleteTaskInList : on supprime la liaison dans la table tasks_list => bien passé");}

            // 2e -> pour supprimer la tache dans la table task
            const storedTask = await Task.getTaskByPk(req.params.taskId);
            console.log(">> l.195 storedTask.general_task",storedTask);
             // Si aucune tâche trouvée 
             if (!storedTask ) {
                 // exit méthode et envoi message d'erreur
                 return res.status(404).send({
                     error : {
                         statusCode: 404,
                         message: "Pas trouvé - cette tache n'existe pas dans la liste"
                     }
                 });
             } else { console.log("2/tasksListController.deleteTaskInList : on supprime la tâche perso dans la table task => bien passé");}
             // on supprime la tache si elle n'est pas générale
             if (!storedTask.general_task) {
                 const successTask = await storedTask.delete();      
                 if (!successTask) {
                     return res.status(500).send({
                         statusCode:"Quelque chose s'est mal passé"
                     });
                 }
             }

            res.send(successTaskInList);
            
        } catch (err) {
            console.trace(err);
        }
    }

};

module.exports = tasksListController;