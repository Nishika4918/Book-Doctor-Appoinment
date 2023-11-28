const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
      if (err) {
        console.log("token doesn't match");
        return res.status(200).send({
          message: "Authorization failed",
          success: false,
        });
      } else {
        console.log("token match");
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    res.status(401).send({
      message: "Authorization failed",
      success: false,
    });
  }
};
