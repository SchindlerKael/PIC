const { Model, DataTypes } = require('sequelize');

class UserAnswers extends Model {
    static init(sequelize) {
        super.init({
            option_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            experiment_id: DataTypes.INTEGER,
        }, {
        sequelize,
        tableName: 'user_answers',
        })
    }
}

module.exports = UserAnswers;