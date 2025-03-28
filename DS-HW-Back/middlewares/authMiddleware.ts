import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@models';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'default_secret';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, ACCESS_TOKEN);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'Usuario no encontrado' });

    (req as any).user = user; // fuerza el tipado

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ msg: 'Token inválido' });
  }
};
