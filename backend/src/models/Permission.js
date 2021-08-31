const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
    static init(sequelize) {
        super.init({
        title: DataTypes.STRING,
        }, {
        sequelize,
        tableName: 'permissions',
        })
    }

    static associate(models) {
        this.belongsToMany(models.Role, { foreignKey: 'permission_id', through: 'role_permissions', as: 'roles' });
    }
}

module.exports = Permission;