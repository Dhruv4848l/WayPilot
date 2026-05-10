const { User, Trip, sequelize } = require('./models');

async function updateImages() {
  try {
    await sequelize.sync();
    
    const users = await User.findAll();
    for (const user of users) {
      if (!user.photo) {
        user.photo = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`;
        await user.save();
      }
    }

    const trips = await Trip.findAll();
    for (const trip of trips) {
      if (!trip.coverPhoto) {
        const destination = trip.name.replace('Amazing Trip to ', '');
        trip.coverPhoto = `https://picsum.photos/seed/${destination.replace(/ /g, '')}/800/400`;
        await trip.save();
      }
    }
    
    console.log('Images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
}

updateImages();
