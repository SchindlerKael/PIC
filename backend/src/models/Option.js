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
        const experiment_options = this.sequelize.define('experiment_options', {
            weight: DataTypes.FLOAT,
            correct_answer: DataTypes.BOOLEAN,
        }, { timestamps: true });
        
        this.belongsToMany(models.Experiment, { foreignKey: 'option_id', through: experiment_options, as: 'experiments' });
        // this.belongsToMany(models.User, { foreignKey: 'option_id', through: 'user_answers', as: 'users' });
        // this.belongsToMany(models.Experiment, { foreignKey: 'option_id', through: 'user_answers', as: 'answers' });
    }
}

module.exports = Option;