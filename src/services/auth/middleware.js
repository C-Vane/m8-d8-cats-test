const UserSchema = require("../users/schema");
const UserModel = require("mongoose").model("User", UserSchema);
const { verifyJWT } = require("./tools");

const authorize = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (token) {
      const decoded = await verifyJWT(token);

      const user = await UserModel.findById(decoded._id);

      if (!user) {
        const err = new Error("Invalid token");
        err.status = 401;
        next(err);
      }
      req.token = token;
      req.user = user;
      next();
    } else {
      const err = new Error("Please authenticate");
      err.status = 401;
      next(err);
    }
  } catch (e) {
    const err = new Error("Please authenticate");
    err.status = 401;
    next(err);
  }
};

module.exports = { authorize };
