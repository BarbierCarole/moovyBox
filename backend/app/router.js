const express = require('express');
const router = express.Router(); 

//const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const boxOptionFillMW = require('./middlewares/boxOptionFill'); 

const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const profileController = require('./controllers/profileController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 
const itemController = require('./controllers/itemController'); 
const tasksListController = require('./controllers/tasksListController');
const taskController = require('./controllers/taskController');

/* ACCES RELATED ROUTES */

// Signup
router.post('/api/signup', authController.signup);
// Signin
router.post('/api/signin', authController.signin);
// Signout
router.post('/api/signout', authController.signout);

// Validate user account
router.get('/api/confirmation/:token', authController.confirmEmail);
// Resend a confirmation link for email validation
router.post('/api/reset-token', authController.resetToken);
// Validate request for password renewal
router.put('/api/profile/reset-password',authController.resetPassword); 

router.get('/api/profile/reset-password/:token', authController.resetPasswordRedirection); 

/* PROFILE RELATED ROUTES */ 

// Update pseudo
router.put('/api/profile/pseudo', authCheckerMW, profileController.updatePseudo); 
// Change email
// - Request a change of email
router.post('/api/profile/email', authCheckerMW, profileController.requestEmailUpdate); 
// - Validate change from current email 
router.get('/api/profile/confirm-email-update/:token',  profileController.confirmEmailUpdate);
// - Validate change from new email and update data
router.get('/api/profile/confirm-new-email-update/:token',  profileController.updateEmail); 

// Modify user password
router.put('/api/profile/password', authCheckerMW, profileController.updatePassword);

// delete user account
router.delete('/api/profile', authCheckerMW, profileController.deleteAccount); 

/* MOVE RELATED ROUTES */

router.route('/api/move') 
    // Get all move from the current user
    .get(authCheckerMW, moveController.getUserMoves) 
    // Create a new move
    .post(authCheckerMW, moveController.createMove);

router.route('/api/move/:moveId')
    // Update the data of the pointed move
    .put(authCheckerMW, moveController.updateMove)
    // Delete the pointed move 
    .delete(authCheckerMW, moveController.deleteMove);

/* BOX RELATED ROUTES */

router.route('/api/move/:moveId/boxes/')
    // Get all boxes in the given move
    .get(authCheckerMW, boxController.getBoxes)
    // Create a new box
    .post(authCheckerMW, boxOptionFillMW, boxController.createBox); 

router.route('/api/box/:boxId')  
    // Update the data of the pointed box
    .put(authCheckerMW, boxOptionFillMW, boxController.updateBox)
    // Delete the pointed box
    .delete(authCheckerMW, boxController.deleteBox);

/* SEARCH */
router.route('/api/move/:moveId/boxes/searchedItem/:searchedItem')
.get(authCheckerMW, boxController.getSearchItemInBoxes);

/* ITEM RELATED ROUTES  */

router.route('/api/box/:boxId/items') 
    // get all items of a pointed box
    .get(authCheckerMW, itemController.getItems)
    // Create a new item in a box
    .post(authCheckerMW, itemController.createItem);

router.route('/api/box/:boxId/item/:itemId')
    // Update the data of the pointed item   
    .put(authCheckerMW, itemController.updateItem)
    // Delete the pointed item   
    .delete(authCheckerMW, itemController.deleteItem);


/* TASK ROUTES */
// liste des tâches
router.route('/api/move/:moveId/tasksList')
    // Afficher toutes les tâches d'un déménagement
    .get(authCheckerMW, tasksListController.getTasksList)

router.route('/api/move/:moveId/tasksList/:taskId/checkbox') 
    // pour modifier les checkbox uniquement
    .put(authCheckerMW, tasksListController.updatecheckboxTasksList);   

router.route('/api/move/:moveId/tasksList/:taskId') 
    // pour modifier la tâche de la table de liaison
    .put(authCheckerMW, tasksListController.updateTasksList)
    .delete(authCheckerMW, tasksListController.deleteTaskInList);

router.route('/api/move/:moveId/NewTasksList')
    // la liste des tâches se crée automatiquement quand l'utilisateur demande de la créer
    .post(authCheckerMW, tasksListController.createAllTasks)
    .get(authCheckerMW, tasksListController.getTasksList);
 
router.route('/api/move/:moveId/task/:taskId')
    .get(authCheckerMW, tasksListController.getTaskById)    
    .put(authCheckerMW, taskController.updateTask);

router.route('/api/move/:moveId/task')
    .post(authCheckerMW, tasksListController.createTaskInTasksList);

router.get('/session', (req,res) => {return res.send(req.session.user)});

router.use('*', mainController.notFound); 

module.exports = router; 
