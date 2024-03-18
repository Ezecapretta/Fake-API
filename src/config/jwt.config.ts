import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) throw new Error('Not found JWT secret key');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const strategyValidation = new JwtStrategy(jwtOptions, (_jwt_payload, done) => {
  done(null, true);
});

export { jwtOptions, strategyValidation };
