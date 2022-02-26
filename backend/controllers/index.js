const User = require('../models/User');
const colors = require('colors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemail = require('../config/nodemailer');

// @route Post api/register
// @desc Register user
// @params email, firstName, lastName, email, password
// @access Private
exports.register = async (req, res, next) => {
    const errors = [];
    
    try{
        const token = jwt.sign({email: req.body.email}, process.env.SECRET);
        
        const {firstName, lastName, email } = req.body;
        const fullName = `${firstName} ${lastName}`;
        const password = bcrypt.hashSync(req.body.password, 10, function(err, hash){
            return hash;
        });

        const valid = () => {
            try {
                if (firstName.length === 0 || firstName === undefined || firstName === null){
                    errors.push('First name is required');
                }
            }catch{
                errors.push('First name is required');
            }
            try {
                if (lastName.length === 0 || lastName === undefined || lastName === null){
                    errors.push('Last name is required');
                }
                
            }catch{
                errors.push('Last name is required');
            }
            try {
                if (email.length === 0 || email === undefined || email === null){
                    errors.push('Email is required');
                }
            }catch{
                errors.push('Email is required');
            }
            try {
                if (req.body.password.length === 0 || req.body.password === undefined || req.body.password === null){
                    errors.push('Password is required');
                }
            }catch{
                errors.push('Password is required');
            }
            if (errors.length > 0) {
                return false;
            }
            return true;
        }
        

        if (User.countDocuments() === 0) {
            if (valid() === true) {

                const newUser = User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmationCode: token
                });
                nodemail.sendConfirmationEmail(fullName, email, token);
                return res.status(201).json({
                    success: true,
                    data: "User created successfully, check your email for confirmation code" + newUser

                });
            }
        }else {
            if (valid() === true) {
                User.findOne({email: email}, (err, user) => {
                    if (err){
                        console.log(err.red);
                        return res.status(400).json({
                            success: false,
                            error: err
                        });
                    }
                    if (user) {
                        return res.status(200).json({
                            success: false,
                            error: 'Email already exists'
                        });
                    }else {
                        const newUser = User.create({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            confirmationCode: token
                        });
                        nodemail.sendConfirmationEmail(fullName, email, token);
                        return res.status(201).json({
                            success: true,
                            data: "User created successfully, check your email for confirmation code"
                        });
                    }
                });
            }else {
                return res.status(200).json({
                    success: false,
                    error: errors
                });
            }
        }

    }catch(err){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }
};

// @route Post api/signin
// @desc Sign in user
// @params email, password
// @access Public
exports.signin = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const sessionToken = jwt.sign({email: email}, process.env.SECRET, {expiresIn: '24h'});
        const user = User.findOne({email: email}, (err, user) => {
            const matches = bcrypt.compareSync(password, user.password);
            if (err){
                console.log(err.red);
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }
            if (matches && !user.isConfirmed) {
                return res.status(400).json({
                    success: false,
                    error: 'Account not confirmed'
                });
            }
            if (matches) {
                user.sessionToken = sessionToken;
                user.save();
                return res.status(200).json({
                    success: true,
                    message: 'Signin successful',
                    sessionToken: sessionToken
                });
            }else{
                return res.status(400).json({
                    success: false,
                    error: 'Invalid email or password'
                });
            }
        });
    }catch(err){
        console.log(err).red;
        return res.status(400).json({
            success: false,
            error: err
        });
    }
}

// @route Get api/confirm/:confirmationCode
// @desc Confirm user account
// @params confirmationCode
// @access Private
exports.confirm = async (req, res, next) => {
    const {confirmationCode} = req.params;
    const user = await User.findOne({confirmationCode: confirmationCode});
    if (user) {
        user.isConfirmed = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Account confirmed'
        });
    }else{
        return res.status(400).json({
            success: false,
            message: 'No user found'
        });
    }
};

// @route Post api/note
// @desc Add note 
// @params email, sessionToken, title, content
// @access Private
exports.addNote = async (req, res, next) => {
    const email = await req.body.email;
    const sessionToken = req.body.sessionToken;
    const title = req.body.title;
    const content = req.body.content;
    const user = await User.findOne({email: email, sessionToken: sessionToken});
    if (title === '' || title === undefined || title === null) {
        return res.status(400).json({
            success: false,
            message: 'Title is required'
        });
    }
    if (content === '' || content === undefined || content === null) {
        return res.status(400).json({
            success: false,
            message: 'Content is required'
        });
    }
    if (email === '' || email === undefined || email === null) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    if (sessionToken === '' || sessionToken === undefined || sessionToken === null) {
        return res.status(400).json({
            success: false,
            message: 'Session token is required'
        });
    }
    if (user && sessionToken) {
        user.notes = [...user.notes, {title: title, content: content}];
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Note added successfully',
        });
    }else{
        return res.status(400).json({
            success: false,
            message: 'Invalid email or session token'
        });
    }
}

// @route Delete api/note
// @desc Delete note 
// @params email, sessionToken, noteId
// @access Private
exports.deleteNote = async (req, res, next) => {
    const email = await req.body.email;
    const sessionToken = req.body.sessionToken;
    const noteId = req.body.noteId;
    const user = await User.findOne({email: email, sessionToken: sessionToken});
    if (noteId === '' || noteId === undefined || noteId === null) {
        return res.status(400).json({
            success: false,
            message: 'Note id is required'
        });
    }
    if (email === '' || email === undefined || email === null) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    if (sessionToken === '' || sessionToken === undefined || sessionToken === null) {
        return res.status(400).json({
            success: false,
            message: 'Session token is required'
        });
    }
    if (user && sessionToken) {
        const info = {
            $pull: {
                notes: {
                    _id: noteId
                }
            }
        };
        user.notes.pull({_id: noteId});
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
        });
    }else{
        return res.status(400).json({
            success: false,
            message: 'Invalid email or session token. Note not deleted'
        });
    }
};

// @route Delete api/clearnotes
// @desc Clears notes 
// @params email, sessionToken
// @access Private
exports.clearNotes = async (req, res, next) => {
    const email = await req.body.email;
    const sessionToken = req.body.sessionToken;
    const user = await User.findOne({email: email, sessionToken: sessionToken});

    if (email === '' || email === undefined || email === null) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    if (sessionToken === '' || sessionToken === undefined || sessionToken === null) {
        return res.status(400).json({
            success: false,
            message: 'Session token is required'
        });
    }
    if (user && sessionToken) {
        user.notes = [];
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Notes cleared successfully',
        });
    }else{
        return res.status(400).json({
            success: false,
            message: 'Invalid email or session token. Notes not cleared.'
        });
    }
};