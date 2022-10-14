require('dotenv').config();
require('express-async-errors');

// Express
const express = require('express')

const app = express()

// Rest Packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))

//  Access Json data from req.body
app.use(express.json())

// Cookie Parser
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(cors())

app.get('/', (req,res) => {
  console.log(req.signedCookies)
  res.send('Research API')
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();