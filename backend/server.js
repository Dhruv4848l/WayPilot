const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health check
app.get('/', (req, res) => {
  res.send('Traveloop API is running (MySQL / Sequelize)');
});

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('MySQL Database synced successfully');

    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/trips', require('./routes/trips'));
    app.use('/api/cities', require('./routes/cities'));
    app.use('/api/budget', require('./routes/budget'));
    app.use('/api/community', require('./routes/community'));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Error syncing database: ${err.message}`);
    process.exit(1);
  }
};

startServer();
