'use strict';
const {
  Model
} = require('sequelize');

const {Op} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User,{
        foreignKey : "UserId"
      })
    }
    
    static search(name) {
      if(!name) {
        name = ""
      }
      return {[Op.iLike]: `%${name}%`}
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Name is required`
        }
      }
    },
    bio: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `bio is required`
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `gender is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};