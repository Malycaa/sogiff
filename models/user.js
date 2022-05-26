'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcryptjs")
const { Op } = require("sequelize")
var nodemailer = require('nodemailer');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: "UserId"
      })

      User.hasOne(models.Profile, {
        foreignKey: "UserId"
      })
    }

    styleName() {
      return `****${this.username}****`
    }



  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Username is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `password is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `email is required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Role is required`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};