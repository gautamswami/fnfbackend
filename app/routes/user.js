const express = require("express");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserModel = require("../model/user");
const Userpost = require("../model/userposts");
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
router.get("/userconversation", MessageController.getuserConversation);
router.get("/getmessage", MessageController.getmessage);
router.post("/sendmessage", MessageController.sendmessage);

//create anonymous room get city room send message get messagei
router.post("/createroom", MessageController.createroom);
router.get("/getcityrooms", MessageController.getcityrooms);
router.get("/getroom", MessageController.getroom);
router.post("/sendmessageroom", MessageController.sendmessgeroom);
router.get("/getmessageroom", MessageController.getmessageroom);

//add media routes
router.post("/adddp", upload.single("image"), async function (req, res, next) {
  try {
    const dp = await UserModel.findOneAndUpdate(
      {
        username: req.body.username,
      },
      { dp: req.file },
      { new: true }
    );

    res.status(200).json(dp);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post(
  "/addpost",
  uploadpost.single("image"),
  async function (req, res, next) {
    const post = new Userpost({
      username: req.body.username,
      post: req.file,
    });
    try {
      const user = await post.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post('/followuser',UserController.followuser)
router.post('/acceptfollow',UserController.acceptfollow)
router.post('/deletefollowrequest',UserController.deletefollowrequest)
router.post('/deletefollower',UserController.deletefollower)

router.post("/updateuser", UserController.updateuser);
router.get("/twouserconversation", MessageController.getConversation);
router.get("/getusers", UserController.findAll);
module.exports = router;
