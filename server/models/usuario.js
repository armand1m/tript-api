'use strict';

const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.Sequelize;

  var Usuario = sequelize.define('Usuario', {
    usu_cd_usuario: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    usu_ds_email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    usu_ds_senha: {
      allowNull: false,
      type: Sequelize.STRING
    },
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      comparePassword: function (password) {
        var that = this;

        return new Promise(function(resolve, reject) {
          bcrypt.compare(password, that.usu_ds_senha, function(err, res) {
            if (err) {
              reject(err);
            }

            resolve(res);
          })
        });

        // return bcrypt.compareSync(password, this.usu_ds_senha);
      }
    },
    hooks: {
      beforeCreate: function(usuario, options, cb) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return cb(err);
          }

          bcrypt.hash(usuario.usu_ds_senha, salt, function (err, hash) {
            if (err) {
              throw err;
            }

            usuario.usu_ds_senha = hash;

            return cb(null, options);
          });
        });
      }
    }
  });

  return Usuario;
};
