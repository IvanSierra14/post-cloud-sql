'use strict';
const crypto2 =require('crypto2');
const uuid = require('uuid-v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users',[{
        type: 'Admin',
        name: 'prisa',
        surname: 'tailorcast',
        companyId: 1,
        username: 'tailorcast',
        password: await crypto2.hash.sha1('tailor@com'),
        email: 'tailorcast@paradigmadigital.com',
        image: 'https://storage.googleapis.com/prisatailorcast-avatar/avatar.png',
        uuid : uuid(),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        type: 'Admin',
        name: 'user',
        surname: 'paradigma',
        companyId: 1,
        username: 'user',
        password: await crypto2.hash.sha1('data!Rules'),
        email: 'user@paradigmadigital.com',
        image: 'https://storage.googleapis.com/prisatailorcast-avatar/avatar.png',
        uuid : uuid(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Superadmin',
        name: 'superadmin',
        surname: 'tailorcast',
        companyId: 1,
        username: 'superadmin',
        password: await crypto2.hash.sha1('iamTailorGod!'),
        email: 'superadmin@paradigmadigital.com',
        image: 'https://storage.googleapis.com/prisatailorcast-avatar/avatar.png',
        uuid : uuid(),
        createdAt: new Date(),
        updatedAt: new Date()
      }],{});
    } catch (e) {
      console.error(e)
    }
  },

  down: async(queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.query('`TRUNCATE TABLE "Users" CASCADE;`');
    } catch (e) {
      console.error(e);
    }
  }
};
