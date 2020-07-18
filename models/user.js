'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified:  DataTypes.BOOLEAN ,
    image: DataTypes.STRING,
    uuid : DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {paranoid: true});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Podcast,{foreignKey:'userId', as: 'podcasts' })
    User.hasMany(models.Channel,{foreignKey:'userId', as: 'channels' })
    User.belongsTo(models.Company, {foreignKey:'companyId', as:'company', hooks:true})
  };
  return User;
};