import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/converstionModel.js";

// Backend - messageController.js
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const { message } = req.body;
        const receiverId = req.params.id;
        
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (conversation.messages) {
            conversation.messages.push(newMessage._id);
        } else {
            conversation.messages = [newMessage._id];
        }
        
        await conversation.save();

        // Fix: Match the response structure your frontend expects
        return res.status(200).json({
            message: "Message sent successfully",
            success: true,
            data: newMessage // Use 'data' instead of 'newMessage'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}



// Backend - messageController.js
export const getMessages = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        // Return empty array instead of 404 if no conversation exists
        if (!conversation) {
            return res.status(200).json({
                message: "No conversation found",
                success: true,
                data: []
            });
        }

        return res.status(200).json({
            message: "Messages retrieved successfully",
            success: true,
            data: conversation.messages || []
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
