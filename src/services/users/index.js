const router = require("express").Router();
const UserSchema = require("./schema");
const UserModel = require("mongoose").model("User", UserSchema);
const { authorize } = require("../auth/middleware");
const { authenticate } = require("../auth/tools");
const axios = require("axios");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Provide credentials");

    const user = new UserModel({ username, password });
    const { _id } = await user.save();

    res.status(201).send({ _id });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Provide credentials");

    const user = await UserModel.findOne({ username });

    if (user.password === password) {
      const token = await authenticate(user);

      res.status(200).send(token);
    } else {
      res.status(401).send({ message: "No username/password match" });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
});

router.get("/cats", authorize, async (req, res) => {
  try {
    const response = await axios.get("https://cataas.com/cat?json=true");
    if (response.status === 200) {
      const cats = response.data.url;
      console.log(cats);
      res.status(201).send({ url: " https://cataas.com" + cats });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
});

module.exports = router;
