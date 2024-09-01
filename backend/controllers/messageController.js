import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Hotmail", // Specify your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for sensitive data
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    const isOnline = receiverSocketId !== undefined; // Check if receiver is online

    if (isOnline) {
      //io.to(<socket_id>).emit() is used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      // Trigger email notification
      sendEmailNotification(receiverId, senderId, message);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to send an email notification
const sendEmailNotification = async (receiverId, senderId, messageContent) => {
  try {
    // Fetch the receiver's email address from the database
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      console.error("Receiver not found");
      return;
    }

    // Fetch the sender's full name from the database
    const sender = await User.findById(senderId);
    if (!sender) {
      console.error("Sender not found");
      return;
    }

    const emailOptions = {
      from: process.env.EMAIL_USER, // Use environment variable
      to: receiver.email,
      subject: "New Message Notification On ChatApp",
      text: `You have a new message from ${sender.fullName}: "${messageContent}"`,
    };
    // console.log(receiver.email);
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error in sendEmailNotification:", error.message);
  }
};
