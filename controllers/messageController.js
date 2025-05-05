import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/converstionModel.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const { message } = req.body; // Get message content from request body
        const receiverId = req.params.id;
        
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find existing conversation or create a new one
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize with empty messages array
            });
        }

        // Create the new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message // This matches your schema field name
        });

        // Add message to conversation
        if (conversation.messages) {
            conversation.messages.push(newMessage._id);
        } else {
            conversation.messages = [newMessage._id];
        }
        
        await conversation.save();

        return res.status(200).json({
            message: "Message sent successfully",
            success: true,
            data: newMessage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const getMessages = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        if  (!senderId || !receiverId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find the conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        return res.status(200).json({
            message: "Messages retrieved successfully",
            success: true,
            data: conversation.messages
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}