const cluster = require('cluster');
const cores = require('os').cpus().length;
if(cluster.isMaster)
{
console.log(`Cpu cores -  ${cores}`);
for(let i=0;i<cores;i++)
{
    cluster.fork()
}
cluster.on('online',worker=>{
    console.log(`cluster ${worker.id} is active`);

});
cluster.on('exit',worker=>{
    console.log(`cluster ${worker.id} is online`);
    cluster.fork();
});
}
else
{
const express = require('express');
const passport = require('passport');
const ItemRouter = require('./routes/ItemRoute');
const UserRouter = require('./routes/UserRoute');
const OAuthRouter = require('./routes/OAuthRoute');
const sequelize = require('./util/database');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const rateLimit = require('express-rate-limit');

var cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Dodatno: `http://localhost:3000`
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
const limiter = rateLimit({
    max:30,
    window:500*60*10,
    message:"Woah too much messages come back later :)"
});
app.use(limiter)
app.use(express.json());

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    
    return done(null, jwtPayload);
}));

app.use('/OAuth', OAuthRouter);
app.use('/Item', ItemRouter);
app.use('/User', UserRouter);

app.get('/', (req, res) => {
    res.send("HELLO");
});

sequelize.sync().then(() => {//{ alter: true } if we wan to add inexes and to alter table
    const port = 80;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
}
