const { Model, DataTypes } = require('sequelize');

class Option extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
        sequelize,
        tableName: 'options',
        })
    }

    static associate(models) {
        const ExperimentOptions = this.sequelize.define('experiment_options', {
            weight: DataTypes.FLOAT,
            correct_answer: DataTypes.BOOLEAN,
        }, { timestamps: true });
        
        this.belongsToMany(models.Experiment, { foreignKey: 'option_id', through: ExperimentOptions, as: 'experiments' });
        
    }
}

module.exports = Option;