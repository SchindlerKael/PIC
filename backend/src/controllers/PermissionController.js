const Permission = require('../models/Permission');

module.exports = {
    async index(req, res) {
        const permissions = await Permission.findAll();
    
        return res.json(permissions);
    },

    async store(req, res) {
        try {
            const { title } = req.body;

            if(await Permission.findOne({where: { title: title }}))
                return res.status(400).send({ error: 'permission title is already in use' });
        
            const permission = await Permission.create({ title });
            
            return res.json(permission);
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

}