const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/budget', require('./routes/budget'));
app.use('/api/community', require('./routes/community'));

// Health check
app.get('/', (req, res) => {
  res.send('Traveloop API is running (MySQL / Sequelize)');
});

const PORT = process.env.PORT || 5000;

// Sync database tables and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('MySQL Database synced successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(`Error syncing database: ${err.message}`);
    process.exit(1);
  });
