const { Model, DataTypes } = require('sequelize');
const UserAnswers = require('../models/UserAnswers');

class Experiment extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            suport_text: DataTypes.TEXT,
            expected_rate: DataTypes.FLOAT,
            event_rate: DataTypes.FLOAT,
            initial_value: DataTypes.FLOAT,
            is_closed: DataTypes.BOOLEAN,
        }, {
        sequelize,
        tableName: 'experiments',
        })
    }

    static associate(models) {
        const ExperimentOptions = this.sequelize.define('experiment_options', {
            weight: DataTypes.FLOAT,
            correct_answer: DataTypes.BOOLEAN,
        }, { timestamps: true });

        this.belongsToMany(models.Option, { foreignKey: 'experiment_id', through: ExperimentOptions, as: 'options' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsToMany(models.User, { foreignKey: 'experiment_id', through: UserAnswers, as: 'users' });
    }
}

module.exports = Experiment;