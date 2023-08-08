const Sequelize = require('sequelize');

module.exports = class Todos extends Sequelize.Model {
  // init: table setting
  static init(sequelize) {
    return super.init({
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,

        },
        is_done: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        checked_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Todo',
        tableName: 'todos',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      })
  }
}
