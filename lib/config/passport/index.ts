import * as passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { appUser } from "../../models";

const User = appUser;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use("jwt", jwtStrategy);

export default passport;
