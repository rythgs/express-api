'use strict';

export default function(sequelize, DataTypes) {
  const Job = sequelize.define('Job', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
        Job.belongsToMany(models.User, {
          onDelete: 'cascade',
          through: 'jobs_users'
        });
      }
    },
  });

  return Job;
}
