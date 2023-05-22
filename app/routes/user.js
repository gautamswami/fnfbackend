const express = require("express");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const router = express.Router();
const uploader = require("./multer");

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
router.post("/adddp", uploader.single("image"), UserController.adddp);

router.post("/newpost", UserController.newpost);
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
