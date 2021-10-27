const { Model, DataTypes } = require('sequelize');
const UserAnswers = require('../models/UserAnswers');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING, 
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            hooks: {
                beforeCreate: async (user, options) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            },
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Role, { foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
        this.hasMany(models.Experiment, { foreignKey: 'user_id', as: 'experiments' });
        this.belongsToMany(models.Experiment, { foreignKey: 'user_id', through: UserAnswers, as: 'answers' });
    }
}

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
}

module.exports = User;