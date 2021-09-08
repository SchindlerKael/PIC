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
        const user_answers = this.sequelize.define('user_answers', {
            option_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // references: { model: 'options', key: 'id' },
                // onUpdate: 'CASCADE',
                // onDelete: 'CASCADE',
              },        
        }, { timestamps: true });

        this.belongsToMany(models.Role, { foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
        this.hasMany(models.Experiment, { foreignKey: 'user_id', as: 'experiments' });
        this.belongsToMany(models.Experiment, { foreignKey: 'user_id', through: user_answers, as: 'answers' });
    }
}

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
}

module.exports = User;