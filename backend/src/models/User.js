const { Model, DataTypes } = require('sequelize');
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
    }
}

module.exports = User;