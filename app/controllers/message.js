const Message = require("../model/message");
const Conversation = require("../model/conversation");
const Room = require("../model/rooms")
exports.sendmessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getmessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.body.conversationId,
    });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
};
exports.newConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getuserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.body.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.body.firstUserId, req.body.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createroom = async (req,res) =>{
  try{
    const rooms = new Room(req.body)
    const roomcreate =await rooms.save()
    res.status(200).json(roomcreate)
  }
  catch(err){
    res.status(500).json(err)
  }
}

exports.getcityrooms = async (req,res) =>{
  try{
    const rooms = await Room.find({roomlocation :req.body.roomlocation},{text : 0});
    res.status(200).json(rooms)
  }
  catch(err){
    res.status(500).json(err)
  }
}

exports.getroom = async (req,res) => {
  try{
     const room = await Room.findOne({roomname : req.body.roomname});
     res.status(200).json(room)
  }
  catch(err){
    res.status(500).json(err)

  }
}
exports.sendmessgeroom = async (req,res) =>{
  try{
    const message = await Room.findOneAndUpdate({roomname : req.body.roomname}, 
      { $push: { text: req.body.text } },{new:true}
    )
    res.status(200).json(message)
  }
  catch(err){
    res.status(500).json(err)
  }
}
exports.getmessageroom = async (req,res) =>{
  try{
    const message = await Room.findOne({roomname : req.body.roomname})
    res.status(200).json(message)
  }
  catch(err){
    res.status(500).json(err)
  }
}