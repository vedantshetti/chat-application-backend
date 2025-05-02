import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({ message: 'Please fill all the fields' }); 
        };
        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' });
        };  

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        });
        
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
