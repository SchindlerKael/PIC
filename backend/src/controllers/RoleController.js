const Role = require('../models/Role');
const Permission = require('../models/Permission');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const roles = await Role.findAll();
    
        return res.json(roles);
    },

    async store(req, res) {
        try {
            const { title, permissions } = req.body;
            console.log(req.body);

            if(await Role.findOne({where: { title: title }}))
                return res.status(400).send({ error: 'Role title already exists' });

            const role = await Role.create({ title });

            permissions.map(async (permission_id) => {
                const permission = await Permission.findByPk(permission_id);

                if (!permission) {
                    return res.status(400).json({ error: 'Permission not found' });
                }

                return await role.addPermission(permission);
            });
            
            return res.json(role);
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

    async occupation(req, res) {
        try {
            const { user_id } = req.params;
            const { role_id } = req.body;

            const user = await User.findByPk(user_id);

            if (!user) 
                return res.status(400).json({ error: 'User not found' });

            const role = await Role.findByPk(role_id);

            if (!role) 
                return res.status(400).json({ error: 'Role not found' });

            await user.addRole(role);
                
            return res.json({user, role});
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

}