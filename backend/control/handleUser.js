import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const SecretKey= process.env.SECRET_KEY;


export const handleSignup=async(req,res)=>{
const {username,email,password,contact}= req.body;
const salt = await bcrypt.genSalt(10);
const hashedPass= await bcrypt.hash(password,salt)
const result= await User.create({username,email,password:hashedPass,contact})
if (!result) {
return res.status(404).send("No User") 
}
console.log(result)
return res.status(201).send('User Created')
}

export const handleLogin=async(req,res)=>{
const {email,password}= req.body;

const result= await User.findOne({email})
if (!result) {
    return res.status(404).send("No User") 
}
const Match=await bcrypt.compare(password,result.password)
if (!Match) {
    return res.status(401).send('Invalid Credentials')
}
const token = jwt.sign(
    {id:result._id},
     SecretKey,
    {expiresIn:'24h'}
)
return res.status(201).json({msg:'Login',token:token,user:result})

}

export const handleEdit = async (req, res) => {
    try {
        // userId must be sent from the frontend
        const { userId, ...updateData } = req.body; 

        // findByIdAndUpdate only changes the fields provided in updateData
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $set: updateData }, // $set ensures only provided fields are touched
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Updated", 
            user: updatedUser 
        });
    } catch (error) {
        // If the error is 'Duplicate Key', it means the new email/phone is already taken
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email or Phone already exists" });
        }
        return res.status(500).json({ message: error.message });
    }
}