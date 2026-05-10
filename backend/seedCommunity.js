const { User, Trip, Post, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

const realNames = [
  { first: 'Alex', last: 'Johnson' },
  { first: 'Sarah', last: 'Miller' },
  { first: 'David', last: 'Chen' },
  { first: 'Elena', last: 'Rodriguez' },
  { first: 'Michael', last: 'Smith' },
  { first: 'Yuki', last: 'Tanaka' },
  { first: 'Chloe', last: 'Dubois' },
  { first: 'Marcus', last: 'Thorne' },
  { first: 'Isabella', last: 'Rossi' },
  { first: 'Liam', last: 'Wilson' }
];

const destinations = [
  { name: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
  { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
  { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
  { name: 'Barcelona', image: 'https://images.unsplash.com/photo-1583997051654-8f44c2035301?auto=format&fit=crop&w=800&q=80' },
  { name: 'Berlin', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cairo', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80' }
];
const themes = ['the temples', 'the museums', 'the skyscrapers', 'the history', 'the streets', 'the culture', 'the beaches', 'the nightlife', 'the architecture', 'the pyramids'];

async function seed() {
  try {
    await sequelize.sync();
    console.log('Database synced for seeding.');

    // Optional: Clear existing seeded users/trips/posts if needed
    // For simplicity, we'll just add new ones or you can manually clear your DB.
    // Let's at least try to delete the old user1@example.com etc.
    for (let i = 1; i <= 10; i++) {
        await User.destroy({ where: { email: `user${i}@example.com` } });
    }

    for (let i = 0; i < 10; i++) {
      const name = realNames[i];
      const destination = destinations[i];
      
      // 1. Create User
      const user = await User.create({
        firstName: name.first,
        lastName: name.last,
        email: `${name.first.toLowerCase()}.${name.last.toLowerCase()}@example.com`,
        password: 'password123',
        city: 'Travel City',
        country: 'Travel Country'
      });

      // 2. Create Trip
      const trip = await Trip.create({
        name: `Amazing Trip to ${destination.name}`,
        description: `This was an incredible experience exploring ${themes[i]}. Highly recommended!`,
        coverPhoto: destination.image,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isPublic: true,
        userId: user.id
      });

      // 3. Create Post
      await Post.create({
        title: trip.name,
        content: trip.description,
        userId: user.id,
        tripId: trip.id
      });

      console.log(`Created User: ${name.first} ${name.last}`);
    }

    console.log('Seeding completed successfully with real names.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
