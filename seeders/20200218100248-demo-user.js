'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users',[{
        name: "Primer Usuario",
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
