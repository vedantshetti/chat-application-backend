const User = require('../models/User');
const bcrypt = require('bcrypt');


export const register = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({ message: 'Please fill all the fields' }); 
        };
        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' });
        };  

        const user = await UserActivation.findOne({ where: { username } });
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
            profilePhoto:gender === male? maleProfilePhoto : femaleProfilePhoto,
        });
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}