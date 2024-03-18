import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Non autorized access' });
    }

    (req as any).user = user;
    next();
  })(req, res, next);
};

export default verifyJwtToken;
