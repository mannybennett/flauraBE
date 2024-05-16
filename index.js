const express = require('express');
const session = require('express-session');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const ordersRouter = require('./routers/orders');
const itemsRouter = require('./routers/items');
const plantsRouter = require('./routers/plants');

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 120 * 60 * 1000 }
}));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/plants', plantsRouter);

app.listen(port, () => console.log('Listening on:', port));