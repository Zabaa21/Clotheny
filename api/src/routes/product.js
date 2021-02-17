const server = require('express').Router();
const { Product, Category, Image } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

server.get('/', (req, res, next) => {
  const value = req.query.search
  if (value) {
    
    Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: '%' + value + '%', 
            },
          },
          {
            description: {
              [Op.iLike]: '%' + value + '%',
            },
          },
        ],
      },
    })
      .then((products) => {
        if (products.length === 0) {
          res.status(404).send('No se encontro producto');
        } else {
          res.send(products);
        }
      })
      .catch((err) => res.status(500).send(err));
  } else {
    
    Product.findAll({
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    })
      .then((products) => res.send(products))
      .catch((err) => res.status(500).send(err));
  }
});

server.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    res.json(product)
  } catch (e) {
    res.status(500).send({
      message: 'error'
    });
    next(e);
  }
})

server.get('/get/outstanding', async (req, res, next) => {
  try {
      const products = await Product.findAll({
        where: { outstanding: 1 },
        include: [{ model: Image }],
      });
      res.json(products)
    } catch (e) {
      res.status(500).send({
        message: "error"
      })
      next(e)
    }
})

server.get("/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  Category.findAll({
    where: { id: idCategory },
    include: [{ model: Product }],
  }).then((products) => {
    if (!products) {
      res.status(404).send("Error");
    } else {
      res.json(products);
    }
  });
});

module.exports = server;