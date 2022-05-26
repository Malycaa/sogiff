'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }


  }
  Post.init({
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `URL is required` },
        isUrl: { msg: 'urlGIF must be url' },
        isGif(value) {
          let formatFile = value.slice(value.length - 4)
          if (formatFile !== '.gif') {
            throw new Error('url must be GIF format')
          }
        }
      }
    },

    like: DataTypes.INTEGER,

    unlike: DataTypes.INTEGER,

    UserId: DataTypes.STRING,

    caption: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Caption is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};