const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router
    .route('/register')
    .get((req, res) => {
        res.send('Register page');
    })
    .post(controller.register);

router
    .route('/signin')
    .get((req, res) => {
        res.send('Signin page');
    })
    .post(controller.signin);
router
    .route('/confirm/:confirmationCode')
    .get(controller.confirm);
router
    .route('/note')
    .post(controller.addNote)
    .delete(controller.deleteNote);
router
    .route('/clearnotes')
    .delete(controller.clearNotes);

module.exports = router;