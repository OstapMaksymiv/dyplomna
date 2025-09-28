import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body; // ✅ зміни тут
    const user = await registerUser(email, password);
    res.json(user);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body; // ✅ зміни тут
    const { userInfo } = await loginUser(email, password);
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({
        id:userInfo.id
    }, process.env.JWT_SECRET!,{expiresIn:age}) 
    
    res
    .cookie("token", token, {
      httpOnly: true,
      maxAge:age,
      // secure: false,
      // sameSite: 'None' 
    })
    .status(200)
    .json({ user: userInfo, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;