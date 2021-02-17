const server = require('express').Router();
const { Order, OrderLine, Product, User } = require("../db.js");
const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');
const Op = Sequelize.Op;

// Create Order
server.post('/:userId', async (req, res, next) => {
    try {
      if(typeof parseInt(req.params.userId) === 'number'){
        const { state } = req.body
        const previousOrder = await Order.findOne({
          where: {
            [Op.or]: [
              { state: 'cart' },
              { state: 'created' },
              { state: 'processing' }
            ],
            userId: req.params.userId
          }
        })
        if(!previousOrder){
          const order = await Order.create({state})
          order.userId = req.params.userId;
          order.save()
          res.json(order);
        }
      }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Update Order
server.put('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const order = await Order.findOne({
          where: {
            [Op.or]: [
              { state: 'cart' },
              { state: 'created' },
              { state: 'processing' }
            ],
            userId
          }
        })
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity, shippingState, firstName, lastName, comments } = req.body;
        order.state = state;
        order.purchaseAmount= purchaseAmount;
        order.shippingCost = shippingCost;
        order.shippingAddress= shippingAddress;
        order.shippingZip = shippingZip;
        order.shippingCity= shippingCity;
        order.shippingState = shippingState;
        order.firstName= firstName;
        order.lastName = lastName;
        order.comments= comments;
        order.save()
        res.json(order)
    } catch (e) {
        res.status(500).json({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Delete Order
server.delete('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId);
        order.destroy()
        res.json(order)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List all orders
server.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List active order
server.get('/active/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
        const orders = await Order.findAll({
            where: {
              [Op.or]: [
                { state: 'cart' },
                { state: 'created' },
                { state: 'processing' }
              ],userId
            }
        })

        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List one order
server.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const order = await Order.findByPk(id)
      res.json(order)
    } catch (e) {
      res.status(500).send({
        message: 'There has been an error'
      });
      next(e);
    }
  })

// List user's orders
server.get('/all/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        let response = [];
        const orders = await Order.findAll( { where: {userId } });
        //orders.forEach(order => order.userId === userId && response.push(order));
        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Add item to cart
server.post('/users/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        state: 'cart',
      },
    });
    const product = await Product.findByPk(req.body.id);
    if(product.stock > 0){
      product.stock = product.stock - 1
      product.save()
      const prevOrderLine = await OrderLine.findOne({where: {productId: product.id, orderId: order.id}})
      if(!prevOrderLine){
        const orderLine = await OrderLine.create({
          productId: product.id, orderId: order.id, price: product.price, quantity: 1
        })  
        res.json(orderLine);
      } else {
        res.json({message: 'El producto ya está asociado al carrito'})
      }
    } else {
      res.json({message: "No hay mas stock del producto"})
    }

  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

// Get cart's items
server.get('/users/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        [Op.or]: [
          { state: 'cart' },
          { state: 'created' },
          { state: 'processing' }
        ],
        userId: req.params.userId
      },
    });
    
    const items = await OrderLine.findAll({
      where: {
        orderId: order.id,
      },
    });
    res.json(items);
  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});


//Get products from order "any state"
server.get('/users/:userId/order/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId: req.params.userId
      },
    });
    
    const items = await OrderLine.findAll({
      where: {
        orderId: order.id,
      },
    });
    res.json(items);
  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

// Delete item from cart
server.delete('/users/:userId/cart/:prodId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        [Op.or]: [
          { state: 'cart' },
          { state: 'processing' }
        ],
      },
    });
    const product = await Product.findByPk(req.params.prodId);
    const orderLine = await OrderLine.findOne({
      where:{
        productId: product.id,
        orderId: order.id,
      }
    });
    
    let quantity = orderLine.quantity
    orderLine.destroy()
    product.stock = product.stock + quantity
    product.save()
    
    res.json(orderLine);
  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

// Update item quantity
server.put('/users/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        [Op.or]: [
          { state: 'cart' },
          { state: 'created' }
        ],
      },
    });
    const product = await Product.findByPk(req.body.id);
    const orderLine = await OrderLine.findOne({
      where: {
        productId: product.id,
        orderId: order.id,
      },
    });
    let result = orderLine.quantity - req.body.quantity
    if(product.stock + result >= 0){
      product.stock = product.stock + result
      orderLine.quantity= req.body.quantity;
      product.save()
      orderLine.save()
      res.json(orderLine);
    } else {
      res.json({ message: 'No podes agregar mas productos porque no hay stock' });
    }

  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

//send mail after checkout
server.post('/email/checkout/:userId', async (req, res, next)=>{
  try {
        const { userId } = req.params
        const user = await User.findOne({
            where: {id: userId}
        })
        if (!user) {
          res.status(500).json({message: 'There has been an error validating user'})
        }else{
          const transporter = nodemailer.createTransport({
            host: "c2110783.ferozo.com",
            port: 465,
            secure: true,
            auth: {
              user: 'shop@henryshop.ml', 
              pass: 'RUq*bn/0fY',
            },       
          })
          const link = "http://localhost:3000/me"
          const mailOptions = {
            from: 'shop@henryshop.ml',
            to: user.email,
            subject: 'Thank you for your order!',
            html: `<h3>Hi! ${user.name}</h3><p>Thank you for your order.</p><br>
            Please visit this <a href=${link}> Link </a><br>
            There you can view your order detail.`
          }
          transporter.sendMail(mailOptions, (err, success) => {
            if (err) {
              res.status(400).json({
                err: "ERROR SENDING EMAIL",
              })   } })        
        }
      res.json({message: "Email sent ok"})
    }
  catch (e) {
        res.status(500).json({
        message: 'There has been an error'
        });
        next(e);
      }
})
          
module.exports = server;
