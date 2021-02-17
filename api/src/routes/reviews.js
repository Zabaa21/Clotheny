const server = require('express').Router(); 
const { Product, User, Reviews } = require('../db.js');
const { verifyToken, verifyUser } = require('../middlewares/auth');
const sequelize = require('sequelize');


//[verifyToken, verifyRole],

//Crear ruta para crear/agregar Review
server.post(
  '/:productId/:userId',

  (req, res, next) => {
    const { description, rating } = req.body;
    const { productId, userId } = req.params;
    Reviews.create({
      rating,
      description,
      productId,
      userId,
    })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  }
);

//Obtener todas las reviews de un producto
server.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const reviews = await Reviews.findAll({
      where: { productId: productId },
      include: [{ model: Product }],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

//Editar una review de un producto
server.put('/:productId/:idReview', async (req, res, next) => {
  const { productId, idReview } = req.params;
   const { description, rating } = req.body;
  try {
    const reviews = await Reviews.update(
      {
        rating,
        description,
      },
      {
        where: { productId: productId, id: idReview },
      }
    );
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

//Delete una review de un producto
server.delete('/:idReview',  (req, res, next) => {
  const { idReview } = req.params;
    Reviews.findByPk(idReview)
      .then((rev) => {
        if (rev) {
          rev.destroy()
          res.status(200).json(rev)
        } else {
          res.status(400).json({ message: 'Review not found' });
        }
    })
    .catch((e) => {
      res.status(400).send('error');
    }); 
});

//Obtener promedio de las reviews de un producto :D
server.get("/:productId/avg", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const average = await Reviews.findAll({
      where: { productId: productId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'AvgRating']],
    });
    let avg = parseFloat(average[0].dataValues.AvgRating);
    res.json(avg);
  } catch (error) {
    next(error);
  }
});

// Obtener todos los productos a los que un usuario ha hecho review
server.get('/userProducts/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const allReviews = await Reviews.findAll({where: {userId}});
    res.json(allReviews);
  } catch (error) {
    next(error);
  }
})


module.exports = server;