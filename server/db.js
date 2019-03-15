const Sequelize = require('sequelize');
const sequelize = new Sequelize('qlbh', 'root', 'long123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+07:00',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Customer = sequelize.define('customers', {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  });

  const Post = sequelize.define('posts', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  // Relations
Customer.hasMany(Post);
Post.belongsTo(Customer);

module.exports = sequelize;