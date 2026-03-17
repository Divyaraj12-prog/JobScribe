const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';
const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const clearCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
};

async function registerController(req, res) {
    try {
        const { fullname: { firstname, lastname }, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            userId: newUser._id,
            fullName: newUser.fullname,
            email: newUser.email,
            role: newUser.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token, authCookieOptions);

        res.status(201).json({
            message: 'User created successfully',
            id: newUser._id,
            fullName: newUser.fullname,
            email: newUser.email,
            role: newUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        

        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found, try registering' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            userId: user._id,
            fullName: user.fullname,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token, authCookieOptions);

        res.status(200).json({
            message: 'Login successful',
            id: user._id,
            fullName: user.fullname,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullname,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
}

async function updateMeController(req, res) {
    try {
        const userId = req.user.userId;
        const { fullname: { firstname, lastname }, email } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { fullname: { firstname, lastname }, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({
            userId: updatedUser._id,
            fullName: updatedUser.fullname,
            email: updatedUser.email,
            role: updatedUser.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token, authCookieOptions);

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullname,
                email: updatedUser.email,
                role: updatedUser.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user data', error });
    }
}

async function changePasswordController(req, res) {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
}

async function logoutController(req, res) {
    try {
        res.clearCookie('token', clearCookieOptions);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
}

async function deleteAccountController(req, res) {
    try{
        const userId = req.user.userId;
        await userModel.findByIdAndDelete(userId);
        res.clearCookie('token', clearCookieOptions);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error });

    }
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    updateMeController,
    changePasswordController,
    deleteAccountController,
    logoutController
}
