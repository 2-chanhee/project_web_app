const mongoose = require('mongoose');

// 2. testDB 세팅
mongoose.connect(process.env.MongoDB_URI, { useNewUrlParser: true });
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Error in DB connection: ', + JSON.stringify(err, undefined, 2));
});
// 5. 연결 성공
db.once('open', function() {
    console.log('MongoDB Connected!');
});

require('./user.model')
