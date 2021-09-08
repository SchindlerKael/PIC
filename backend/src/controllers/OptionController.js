const Option = require('../models/Option');

module.exports = {
    async index(req, res) {
        const options = await Option.findAll();
    
        return res.json(options);
    },

    async store(req, res) {
        try {
            const { name } = req.body;

            if(await Option.findOne({where: { name: name }}))
                return res.status(400).send({ error: 'option name is already in use' });
        
            const option = await Option.create({ name });
            
            return res.json(option);
        } catch (error) {
            return res.status(400).send({ error: 'ola' });
        }
    },

}