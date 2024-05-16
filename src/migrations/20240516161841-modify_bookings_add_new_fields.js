'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     // without even writing migratiaons we can directly modify the model file and restart the server/application
     //it will still add those new columns to the table, but adding through migrations will show us the
     // incremental changes in future
    await queryInterface.addColumn(
      'Bookings',
      'noOfSeats',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    )

    await queryInterface.addColumn(
      'Bookings',
      'totalCost',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings','noOfSeats');
    await queryInterface.removeColumn('Bookings','totalCost');
  }
};
