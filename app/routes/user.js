const express = require("express");
const UserController = require("../controllers/user");
const MessageController = require("../controllers/message");
const router = express.Router();

router.get("/getusers", UserController.findAll);
router.post("/signup", UserController.create);
router.post("/login", UserController.login);
router.post("/addlocation", UserController.addlocation);
router.post("/getcityusers", UserController.getlocation);
router.post("/sendmessage", MessageController.sendmessage);
router.get("/getmessage", MessageController.getmessage);
router.post("/newconversation", MessageController.newConversation);
router.get("/userconversation", MessageController.getuserConversation);
router.get("/twouserconversation", MessageController.getConversation);

module.exports = router;
