const UserModel = require("../model/user");
const UserLocation = require("../model/userlocation");
const Userpost = require("../model/userposts");
var multer = require("multer");
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
exports.updateuser = async (req, res) => {
  // console.log(req.body, "req");
  try {
    // const user = await UserModel.findOne(req.body.find);
    const user = await UserModel.findOneAndUpdate(
      req.body.find,
      req.body.update,
      {
        new: true,
      }
    ).catch(() => {
      throw err;
    });
    if (!user) {
      res.send("not exist");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getuser = async (req, res) => {
  try {
    const user = await UserModel.find({ username: req.body.username });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
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
exports.getpost = async (req, res) => {
  try {
    const post = await Userpost.find({ username: req.body.username });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addlocation = async (req, res) => {
  try {
    console.log('loc run')
    const location = await UserLocation.findOneAndUpdate(
      { username: req.body.username },
      {
        userlongitude: req.body.userlongitude,
        userlatitude: req.body.userlatitude,
        usercity: req.body.usercity,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getlocation = async (req, res) => {
  try {
    const location = await UserLocation.find({ usercity: req.body.usercity });
    res.status(200).json(location);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.followuser = async (req, res) => {
  try {
    const following = await UserModel.findOneAndUpdate(
      { username: req.body.username },
      { $push: { followingrequest: req.body.tofollowname } },
      { new: true }
    );
    const follower = await UserModel.findOneAndUpdate(
      {
        username: req.body.tofollowname,
      },
      { $push: { followerrequest: req.body.username } },
      { new: true }
    );
    res.status(200).json(following);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.acceptfollow = async (req, res) => {
  try {
    const follow = await UserModel.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $push: { followers: req.body.followername },
        $pull:{
          followerrequest : req.body.followername
        }
      },
      { new: true }
    );
  await UserModel.findOneAndUpdate(
      {
        username: req.body.followername,
      },

      {
        $push: { following: req.body.username },
        $pull: {
          followingrequest: req.body.username,
        },
      },
      { new: true }
    );
    res.status(200).json(follow);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deletefollowrequest = async (req, res) => {
  try {
    const del = await UserModel.updateOne(
      { username: req.body.username },
      {
        $pull: {
          followerrequest: req.body.followername,
        },
      },
      { new: true }
    );
    
    res.status(200).json(del);
    await UserModel.updateOne(
      { username: req.body.followername },
      {
        $pull: {
          followingrequest: req.body.username,
        },
      },
      { new: true }
    );

  } catch (er) {
    res.status(500).json(er);
    console.log(er,'error')
  }
};
exports.deletefollower = async (req,res) => {
  try{
    const del = await UserModel.updateOne(
      {username : req.body.username},
      {
        $pull : {
          followers : req.body.followername
        }
      },
      {new : true}
    )
    res.status(200).json(del)
    await UserModel.updateOne(
      {username : req.body.followername},
      {
        $pull : {
          following : req.body.username
        }
      },
      {new : true}
    )
  }
  catch(err){
    res.status(500).json(err)
    console.log(err,'err')
  }
}

exports.imageadd= async(req,res)=>{

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
