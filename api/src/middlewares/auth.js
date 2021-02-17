//Verify Role
let verifyRole = (req, res, next) => {
  let role = req.user.role;
  parseInt(role);
  if (role === 1) {
    next();
  } else {
    return res.json({
      err: {
        message: "El usuario no tiene permisos",
      },
    });
  } 
};

module.exports = { verifyRole };
