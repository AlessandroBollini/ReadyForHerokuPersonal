const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('d5l65651gaj9fe', 'lncbrjrnwhydbw', '7be508cdaa455d07f5f42792b97b3a7fe2c8d3760b363327c9632257b4961da6', {
    host: 'ec2-54-77-40-202.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false
        }
      },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
class Wallet extends Model { }
Wallet.init({
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    publicKey: {
        type: DataTypes.STRING,
        unique: true
    },
    privateKey: DataTypes.STRING,
    seedPhrase: DataTypes.STRING,
    used:DataTypes.BOOLEAN,
    image:DataTypes.STRING
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports.Wallet = Wallet;