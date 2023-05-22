const UserModel = require("../model/user");
const UserLocation = require("../model/userlocation");
const Userpost = require("../model/userposts");
const cloudinary = require("../routes/cloudinary");

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
    } else {
      res.status(200).json({ message: { success: false } });
    }
  } catch (error) {
    res.json({ message: { error: error, sucess: false } });
  }
};
exports.updateuser = async (req, res) => {
  try {
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
    // const location = await UserLocation.find({ usercity: req.body.usercity });

    const { usercity } = req.body;

    // Find all user locations in the specified city
    const userLocations = await UserLocation.find({ usercity: usercity });

    if (userLocations.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the specified city" });
    }

    // Get the usernames from the user locations
    const usernames = userLocations.map(
      (userLocation) => userLocation.username
    );

    // Find the users based on the usernames
    const users = await UserModel.find({ username: { $in: usernames } }).select(
      "username dp "
    );

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.followuser = async (req, res) => {
  try {
    const following = await UserModel.findOneAndUpdate(
      { username: req.body.username },
      { $push: { followbyyourequest: req.body.tofollowname } },
      { new: true }
    );
    const follower = await UserModel.findOneAndUpdate(
      {
        username: req.body.tofollowname,
      },
      { $push: { tofollowyourequest: req.body.username } },
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
        $pull: {
          tofollowyourequest: req.body.followername,
        },
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
          followbyyourequest: req.body.username,
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
          tofollowyourequest: req.body.followername,
        },
      },
      { new: true }
    );

    res.status(200).json(del);
    await UserModel.updateOne(
      { username: req.body.followername },
      {
        $pull: {
          followbyyourequest: req.body.username,
        },
      },
      { new: true }
    );
  } catch (er) {
    res.status(500).json(er);
    console.log(er, "error");
  }
};
exports.deletefollower = async (req, res) => {
  try {
    const del = await UserModel.updateOne(
      { username: req.body.username },
      {
        $pull: {
          followers: req.body.followername,
        },
      },
      { new: true }
    );
    res.status(200).json(del);
    await UserModel.updateOne(
      { username: req.body.followername },
      {
        $pull: {
          following: req.body.username,
        },
      },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "err");
  }
};
exports.deletefollowing = async (req, res) => {
  try {
    const del = await UserModel.updateOne(
      { username: req.body.username },
      {
        $pull: {
          following: req.body.followername,
        },
      },
      { new: true }
    );
    res.status(200).json(del);
    await UserModel.updateOne(
      { username: req.body.followername },
      {
        $pull: {
          followers: req.body.username,
        },
      },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "err");
  }
};
exports.imageadd = async (req, res) => {
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

exports.friendsposts = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user based on the username
    const user = await UserModel.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all posts of the user's friends
    const friendsPosts = await Userpost.find({
      username: { $in: user.following },
    });
    console.log(friendsPosts);

    res.json(friendsPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.newpost = async (req, res) => {
  try {
    const base64Image = req.body.image; // Assuming the image is sent in the request body as 'image' parameter

    let uploaded = await cloudinary.uploader.upload(
      base64Image,
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Failed to upload image" });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );
    console.log(uploaded);

    let userpost = new Userpost({
      username: req.body.username,
      post: uploaded.secure_url,
    });
    await userpost.save();
  } catch (e) {
    res.status(500).json({ ERROR: e });
  }
};
exports.adddp = async (req, res) => {
  try {
    const base64Image = req.body.image; // Assuming the image is sent in the request body as 'image' parameter

    let uploaded = await cloudinary.uploader.upload(
      base64Image,
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Failed to upload image" });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );
    await UserModel.findOneAndUpdate(
      {
        username: req.body.username,
      },
      { dp: uploaded.secure_url },
      { new: true }
    );
  } catch (e) {
    res.status(500).json({ ERROR: e });
  }
};
