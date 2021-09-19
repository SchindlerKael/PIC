const Experiment = require('../models/Experiment');
const Sequelize = require('sequelize');
const Option = require('../models/Option');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const experiments = await Experiment.findAll({
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("users.id"))), "answerCount"]] 
            },
            include: [{ 
                association: 'user', 
                attributes: ['name'], 
            },{
                association: 'users', 
                attributes: [],
                through: { attributes: [] }
            }],
        group: ['Experiment.id', 'user.id']
        });
    
        return res.json(experiments);
    },

    async getExperiment(req, res) {
        const { experiment_id } = req.params;

        const experiments = await Experiment.findOne({
            where: {
                id: experiment_id,
            },
            include: [{ 
                association: 'user', 
                attributes: ['name'], 
            },{
                association: 'options', 
                attributes: ['name'],
                through: { attributes: ['weight', 'correct_answer'] }
            }],
        });
    
        return res.json(experiments);
    },

    async store(req, res) {
        try {
            const user_id = req.user_id;
            const { title, suport_text, expected_rate, event_rate, initial_value, options } = req.body;

            const user = await User.findByPk(user_id);

            if (!user) 
              return res.status(400).json({ error: 'User not found' });

            if(await Experiment.findOne({where: { title: title }}))
                return res.status(400).send({ error: 'Experiment title already exists' });

            const experiment = await Experiment.create({ 
                title, 
                suport_text, 
                expected_rate, 
                event_rate, 
                initial_value, 
                user_id 
            });

            options.map(async (opt) => {
                const {option_id, weight, correct_answer} = opt;
                const option = await Option.findByPk(option_id);

                if (!option) {
                    return res.status(400).json({ error: 'Option not found' });
                }

                return await experiment.addOption(option, { 
                    through: {weight, correct_answer} 
                });
            });
            
            return res.json(experiment);
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

    async answer(req, res) {
        try {
            const user_id = req.user_id;
            const { experiment_id } = req.params;
            const { options } = req.body;

            const user = await User.findByPk(user_id);

            if (!user) 
                return res.status(400).json({ error: 'User not found' });

            const experiment = await Experiment.findByPk(experiment_id);

            if (!experiment) 
                return res.status(400).json({ error: 'Experiment not found' });

            options.map(async (option_id) => {
                const option = await Option.findByPk(option_id);

                if (!option) 
                    return res.status(400).json({ error: 'Option not found' });
                
                return await experiment.addUser(user, { 
                    through: {option_id} 
                });
            });
                
            return res.json({user, experiment});
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

}