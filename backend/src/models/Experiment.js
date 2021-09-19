const { Model, DataTypes } = require('sequelize');

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
        const experiment_options = this.sequelize.define('experiment_options', {
            weight: DataTypes.FLOAT,
            correct_answer: DataTypes.BOOLEAN,
        }, { timestamps: true });

        const user_answers = this.sequelize.define('user_answers', {
            option_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // references: { model: 'options', key: 'id' },
                // onUpdate: 'CASCADE',
                // onDelete: 'CASCADE',
              },        
        }, { timestamps: true });

        this.belongsToMany(models.Option, { foreignKey: 'experiment_id', through: experiment_options, as: 'options' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsToMany(models.User, { foreignKey: 'experiment_id', through: user_answers, as: 'users' });
    }
}

module.exports = Experiment;