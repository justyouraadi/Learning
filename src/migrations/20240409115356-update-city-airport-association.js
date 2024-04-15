'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'FOREIGN KEY',
      fields:['cityId'],
      name:'city_fkey_constraint_name',
      references:{
        table:'Cities',
        field:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_fkey_constraint_name');
  }
};

/**
 * sql command to check association's
 * 
 * select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = "airports";
 */
