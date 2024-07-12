const Sequelize = require('sequelize');

module.exports = class Todos extends Sequelize.Model {
  // init: table setting
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          field: 'user_id',
        },
        isDone: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          field: 'is_done',
        },
        checkedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'checked_at',
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Todo',
        tableName: 'todos',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
