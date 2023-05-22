const express = require("express");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserModel = require("../model/user");
const Userpost = require("../model/userposts");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");

const storage = multer.diskStorage({
  destination: "./uploads/dp",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const poststorage = multer.diskStorage({
  destination: "./uploads/post",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
const uploadpost = multer({ storage: poststorage });
// login addloc and get city users after that get other user deatils in city and that user detail from that user deails get friends posts

router.post("/signup", UserController.create);
router.post("/login", UserController.login);
router.post("/addlocation", UserController.addlocation);
router.post("/getcityusers", UserController.getlocation);
router.post("/getuser", UserController.getuser);
router.post("/getpost", UserController.getpost);

// add followers and get follwers and following

//create convo get user convo get user details of that convo and get message on open

router.post("/newconversation", MessageController.newConversation);
router.post("/userconversation", MessageController.getuserConversation);
router.post("/getmessage", MessageController.getmessage);
router.post("/sendmessage", MessageController.sendmessage);

//create anonymous room get city room send message get messagei
router.post("/createroom", MessageController.createroom);
router.get("/getcityrooms", MessageController.getcityrooms);
router.get("/getroom", MessageController.getroom);
router.post("/sendmessageroom", MessageController.sendmessgeroom);
router.get("/getmessageroom", MessageController.getmessageroom);

//add media routes
router.post("/image", UserController.imageadd);
router.post("/adddp", uploader.single("image"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  res.json({
    success: true,
    file: upload.secure_url,
  });
  await UserModel.findOneAndUpdate(
    {
      username: req.body.username,
    },
    { dp: upload.secure_url },
    { new: true }
  );
});

router.post("/addpost", uploader.single("image"), async (req, res) => {
  try {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({
      success: true,
      file: upload.secure_url,
    });
    let userpost = new Userpost({
      username: req.body.username,
      post: upload.secure_url,
    });
    await userpost.save();
  } catch (e) {
    res.status(500).json("ERROR");
  }
});
router.post('/newpost',UserController.newpost);
router.post("/friendsposts", UserController.friendsposts);
router.post("/followuser", UserController.followuser);
router.post("/acceptfollow", UserController.acceptfollow);
router.post("/deletefollowrequest", UserController.deletefollowrequest);
router.post("/deletefollower", UserController.deletefollower);
router.post("/deletefollowing", UserController.deletefollowing);
router.post("/updateuser", UserController.updateuser);
router.post("/twouserconversation", MessageController.getConversation);
router.get("/getusers", UserController.findAll);
module.exports = router;
