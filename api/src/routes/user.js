const server = require("express");
const bcrypt = require("bcrypt");
const router = server.Router();
const passport = require("passport");
const { User } = require("../db.js");
const { verifyRole } = require("../middlewares/auth");

//Crear Usuario
router.post("/", (req, res) => {
  const {
    name,
    lastName,
    dni,
    email,
    password,
    birthDate,
    gender,
    address,
    country,
    phone
  } = req.body;

  const encryptedPass = bcrypt.hashSync(password, 10);

  User.findAll({where: {email}})
  .then(response => {
    if(response.length){
      res.json({message: 'The email is already associated to another user.'});
    } else {
      User.create({
        name,
        lastName,
        dni,
        email,
        password: encryptedPass,
        birthDate,
        gender,
        address,
        country,
        phone,
      })
    }
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    console.log(err);
  });
})

//Actualizar Usuario
router.post("/edit/:id", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    }
    let id = req.params.id;
    User.update(
      {
        name: user.name,
        lastName: user.lastName,
        address: user.address,
        birthDate: user.birthDate,
        country: user.country,
        gender: user.gender,
        phone: user.phone,
        dni: user.dni,
        role: user.role,
        email: user.email,
      },
      { where: { id: id } }
    )
      .then((user) => {
        res.status(200).send("The user was updated.");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("There has been an error when trying to update.");
      });
  })(req, res, next);
});

// List all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).send({
      message: "There has been an error",
    });
    next(e);
  }
});

// List one user
router.get("/:id", async (req, res, next) => {
  let id = req.params.id
  try{
    const user = await User.findByPk(id)
    res.json(user)
  } catch (e) {
    res.status(500).send({
      message: "User not found"
    })
    next(e);
  }
})

// Edit user from profile
router.put('/edit/:userId/me', async (req, res, next) => {
  try{
    const { userId } = req.params
    const { user } = req.body
    const editedUser = await User.update({
        name: user.name,
        lastName: user.lastName,
        address: user.address,
        birthDate: user.birthDate,
        country: user.country,
        phone: user.phone,
        dni: user.dni,
        email: user.email
      }, { where: { id: userId } } )
    res.json(editedUser)
  } catch (e) {
    res.status(500).send({
      message: "User not found"
    })
    next(e);
  }
})

// Upload image
router.put('/image/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { url } = req.body;
    const editedUser = await User.findByPk(userId)
    editedUser.image = url;
    editedUser.save()
    res.json({editedUser, url})
  } catch (e) {
    res.status(500).send({
      message: "User not found"
    })
    next(e);
  }
})

//Eliminar Usuario
router.delete("/:id", verifyRole, (req, res) => {
  let id = req.params.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).send(`The user has been deleted`);
      } else {
        res.status(400).send(`We couldn't find the user with id: ${id}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
