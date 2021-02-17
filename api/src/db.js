require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


const { Product, Category, Image, User, Order, OrderLine, Reviews, Palette, WishList, WishLine } = sequelize.models;

// Aca vendrian las relaciones
Product.belongsToMany(Category, { through: "productCategory" });
Category.belongsToMany(Product, { through: "productCategory" });

Product.belongsToMany(Image, { through: "productImage" });
Image.belongsToMany(Product, { through: "productImage" });

User.hasMany(Order);
Order.belongsTo(User); // agrega userId a la tabla

Order.belongsToMany(Product, {through: OrderLine});
Product.belongsToMany(Order, {through: OrderLine});

User.hasMany(WishList);
WishList.belongsTo(User); // agrega userId a la tabla

WishList.belongsToMany(Product, {through: WishLine});
Product.belongsToMany(WishList, {through: WishLine});

Product.hasMany(Reviews);
Reviews.belongsTo(Product); // tiene un productId

User.hasMany(Reviews);
Reviews.belongsTo(User); // Agrega un userId a la tabla

Palette.hasMany(User);
User.belongsTo(Palette);




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};