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


/* ACCES RELATED ROUTES */

// Signup
router.post('/api/signup', authController.signup);
// Signin
router.post('/api/signin', authController.signin);
// Signin
router.post('/api/signout', authController.signout);

// Validate user account
router.get('/api/confirmation/:token', authController.confirmEmail);
// Resend a confirmation link for email validation
router.post('/api/reset-token', authController.resetToken);
// Validate request for password renewal
router.put('/api/profile/reset-password',authController.resetPassword); 


/* 
    TODO : Should redirect towards password renewal page 
*/
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
router.post('/api/profile/password', authCheckerMW, profileController.updatePassword);

// delete user account
router.delete('/api/profile', authCheckerMW, profileController.deleteAccount); 

/* MOVE RELATED ROUTES */

router.route('/api/move') 
    // Get all move from the current user
    .get(authCheckerMW, moveController.getUserMoves) 
    // Create a new move
    .post(authCheckerMW, moveController.createMove);

// router.route('/move/:id')
//     // Get all boxes in the given move
// TODO in box .get(authCheckerMW, boxController.getMoveBoxes) 
//     // Update the data of the pointed move
//     .put(authCheckerMW, moveController.updateMove)
//     // Delete the pointed move 
//     .delete(authCheckerMW, moveController.deleteMove);

router.route('/api/move/:moveId')
    // Update the data of the pointed move
    .put(authCheckerMW, moveController.updateMove)
    // Delete the pointed move 
    .delete(authCheckerMW, moveController.deleteMove);

/* BOX RELATED ROUTES */

router.route('/api/move/:moveId/box/')
    // Get all boxes in the given move
    .get(authCheckerMW, boxController.getBoxes)
    // Create a new box
    .post(authCheckerMW, boxOptionFillMW, boxController.createBox); 

router.route('/api/move/:moveId/box/:boxId')  
    // Update the data of the pointed box
    .put(authCheckerMW, boxOptionFillMW, boxController.updateBox)
    // Delete the pointed box
    .delete(authCheckerMW, boxController.deleteBox);

router.route('/api/box/search')
    // get boxes which content item
    .get(authCheckerMW,boxController.getSearchMoveBoxes);

/* ITEM RELATED ROUTES  */

router.route('/api/box/:boxId/item') // CB : before modif : "/item"
    // get all item of a pointed box
    .get(authCheckerMW, itemController.getItems)
    // Create a new item in a box
    .post(authCheckerMW, itemController.createItem);

router.route('/api/box/:boxId/item/:itemId')
    // Update the data of the pointed item   
    .put(authCheckerMW, itemController.updateItem)
    // Delete the pointed item   
    .delete(authCheckerMW, itemController.deleteItem);

/* SEARCH */

router.route('/search')
    //! enable "authCheckerMW" middleware after development 
    .get(authCheckerMW, itemController.searchItem);

router.get('/session', (req,res) => {return res.send(req.session.user)});

router.use('*', mainController.notFound); 

module.exports = router; 
