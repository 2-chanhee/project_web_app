const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose      = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username},
                (err, user) => {
                    if(err)
                        return done(err);
                    //unknown user
                    else if(!user)
                        return done (null, false, { message: '아이디를 찾을 수 없습니다.'});
                    // wrong password
                    else if(!user.verifyPassword(password))
                        return done(null, false, { message: '비밀번호가 틀렸습니다.'});
                    // autnentication succeeded
                    else 
                        return done(null, user);
                });
        })
);