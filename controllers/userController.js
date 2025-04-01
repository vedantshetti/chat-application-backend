export const register = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}