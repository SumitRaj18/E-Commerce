import jwt from 'jsonwebtoken'
import 'dotenv/config'
const SecretKey= process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token,SecretKey);
    
    // Check if your payload used _id or id
    // req.user = verified; 
    
    // Force set the id so your route finds it at req.user.id
    req.user = { id: verified.id || verified._id }; 
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
