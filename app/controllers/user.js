const UserModel = require("../model/user");
const UserLocation = require("../model/userlocation");
exports.create = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user
    .save()
    .then((data) => {
      res.send({
        message: "sucess",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "SOME ERROR",
      });
    });
};

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user.password == req.body.password) {
      res.status(200).json({ message: { success: true } });
    }
    res.status(200).json({ message: { success: false } });
  } catch (error) {
    res.json({ message: { error: error, sucess: false } });
  }
};
exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addlocation = async (req, res) => {
  const location = new UserLocation({
    username: req.body.username,
    userlongitude: req.body.userlongitude,
    userlatitude: req.body.userlatitude,
    usercity: req.body.usercity,
  });
  await location
    .save()
    .then((data) => {
      res.send({
        message: "sucess",
        userlocation: data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
    });
};
exports.getlocation = async (req, res) => {
  try {
    const location = await UserLocation.find({ usercity: req.body.usercity });
    res.status(200).json(location);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
