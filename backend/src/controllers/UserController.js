const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = {
    async index(req, res) {
        const users = await User.findAll();
    
        return res.json(users);
    },

    async store(req, res) {
        try {
            const { name, email, password } = req.body;

            if(await User.findOne({where: { email: email }}))
                return res.status(400).send({ error: 'User already exists' });
        
            const user = await User.create({ name, email, password });
        
            return res.json(user);
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

    async authenticate(req, res) {
        try {
            const { email, password } =  req.body;

            const user = await User.findOne({
                attributes: ['id', 'name', 'email', 'password'],
                where: { email: email },
                include: { 
                    association: 'roles', 
                    attributes: ['title'], 
                    through: { attributes: [] },
                    include: { 
                        association: 'permissions', 
                        attributes: ['title'], 
                        through: { attributes: [] }
                    }
                }
            });

            if(!user)
                return res.status(400).send({ error: 'User not found' });

            if(!await bcrypt.compare(password, user.password))
                return res.status(400).send({ error: 'invalid password' });
            
            const token = jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: 86400,
            });

            return res.json({
                user,
                token,
            });
        } catch (error) {
            return res.status(400).send({ error: 'Authentication failed' });
        }
    }
}