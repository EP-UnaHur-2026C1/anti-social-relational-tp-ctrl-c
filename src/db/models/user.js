'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {foreignKey: 'user_id', as: 'comentarios'});
      User.hasMany(models.Post, {foreignKey: 'user_id', as: 'posts'});

      User.belongsToMany(models.User, {
        through: 'User_Followers',
        as: 'following',
        foreignKey: 'follower_id',
        otherKey: 'following_id',
        timestamps: false
      })
      User.belongsToMany(models.User, {
        through: 'User_Followers',
        as: 'followers',
        foreignKey: 'following_id',
        otherKey: 'follower_id',
        timestamps: false
      });

    }
  }

  User.init({
    nickName: {type: DataTypes.STRING, allowNull: false, unique: true}
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;

};