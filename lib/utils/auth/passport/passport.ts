import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";
import { appUser } from "models";
export const ConfigurePassport = () => {
  passport.use(
    new passportLocal.Strategy((email, password, done) => {
      appUser.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    appUser.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
