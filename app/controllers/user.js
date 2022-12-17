const UserModel = require("../model/user");

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

exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if(user.password == req.body.password){
        res.status(200).json({message : {success: true}});
    }
    res.status(200).json({message : {success: false}});
} catch (error) {
    res.json({ message: {error:error , sucess : false} });
  }
};
