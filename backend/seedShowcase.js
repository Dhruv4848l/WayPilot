const { User, Trip, Note, Checklist, ChecklistCategory, ChecklistItem, Expense, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function seedShowcase() {
  try {
    await sequelize.sync();
    console.log('Database connected.');

    // 1. Create Dummy User
    const email = 'mentor_showcase@traveloop.com';
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Deleting existing showcase user to reset data...');
      await existingUser.destroy();
    }

    const dummyUser = await User.create({
      firstName: 'Showcase',
      lastName: 'Account',
      email: email,
      password: 'Showcase123!', // Will be hashed by hook
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      city: 'Delhi',
      country: 'India',
      role: 'USER',
      additionalInfo: 'Dummy account for mentor presentation.'
    });

    console.log('User created:', email);

    const today = new Date();
    
    const formatDate = (daysOffset) => {
      const d = new Date(today);
      d.setDate(d.getDate() + daysOffset);
      return d.toISOString().split('T')[0];
    };

    // 2. Define 7 Trips
    const tripsData = [
      // 1 ONGOING
      {
        name: 'The Golden City Adventure',
        description: 'Exploring the forts and deserts of Jaisalmer.',
        startDate: formatDate(-2), // Ongoing
        endDate: formatDate(3),
        coverPhoto: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc99f2?q=80&w=1200&auto=format&fit=crop',
        category: 'ONGOING'
      },
      // 2 COMPLETED (OVER)
      {
        name: 'Pink City Cultural Trail',
        description: 'Jaipur exploration - Hawa Mahal, Amer Fort and street food.',
        startDate: formatDate(-40),
        endDate: formatDate(-35),
        coverPhoto: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
        category: 'COMPLETED'
      },
      {
        name: 'Goa Coastal Bliss',
        description: 'Sun, sand and seafood in South Goa.',
        startDate: formatDate(-60),
        endDate: formatDate(-55),
        coverPhoto: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
        category: 'COMPLETED'
      },
      // 4 UPCOMING
      {
        name: 'Manali Mountain Retreat',
        description: 'Summer escape to the Himalayas.',
        startDate: formatDate(20),
        endDate: formatDate(27),
        coverPhoto: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
        category: 'UPCOMING'
      },
      {
        name: 'Varanasi Spiritual Journey',
        description: 'Evening Ganga Aarti and ancient temple visits.',
        startDate: formatDate(45),
        endDate: formatDate(48),
        coverPhoto: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1200&auto=format&fit=crop',
        category: 'UPCOMING'
      },
      {
        name: 'Kerala Backwater Serenity',
        description: 'Houseboat stay in Alleppey and spice gardens of Munnar.',
        startDate: formatDate(70),
        endDate: formatDate(80),
        coverPhoto: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
        category: 'UPCOMING'
      },
      {
        name: 'Udaipur Lakes & Palaces',
        description: 'Royal experience in the City of Lakes.',
        startDate: formatDate(100),
        endDate: formatDate(105),
        coverPhoto: 'https://images.unsplash.com/photo-1622319409029-45d275727931?q=80&w=1200&auto=format&fit=crop',
        category: 'UPCOMING'
      }
    ];

    for (const data of tripsData) {
      const trip = await Trip.create({
        userId: dummyUser.id,
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        coverPhoto: data.coverPhoto,
        isPublic: true
      });

      console.log(`Created trip: ${trip.name} (${data.category})`);

      // Add Notes for COMPLETED trips
      if (data.category === 'COMPLETED') {
        await Note.create({
          tripId: trip.id,
          userId: dummyUser.id,
          title: '[💡 Tip] Try the Lassi near Hawa Mahal',
          content: 'The Lassiwala at MI Road is the original one. Totally worth the wait!',
          day: 1
        });
        await Note.create({
          tripId: trip.id,
          userId: dummyUser.id,
          title: '[⚠️ Warning] Monkeys at Amer Fort',
          content: 'Keep your glasses and food inside the bag. They are very aggressive near the parking.',
          day: 2
        });
      }

      // Add Checklist for ALL trips
      const checklist = await Checklist.create({ tripId: trip.id, userId: dummyUser.id });
      const essentials = await ChecklistCategory.create({ checklistId: checklist.id, title: 'Essentials' });
      const clothing = await ChecklistCategory.create({ checklistId: checklist.id, title: 'Clothing' });
      
      await ChecklistItem.create({ categoryId: essentials.id, name: 'Passport & Visa', checked: true });
      await ChecklistItem.create({ categoryId: essentials.id, name: 'Travel Insurance', checked: data.category !== 'UPCOMING' });
      await ChecklistItem.create({ categoryId: clothing.id, name: 'Comfortable Shoes', checked: data.category === 'COMPLETED' });

      // Add some Itinerary/Expenses for ONGOING and COMPLETED
      if (data.category !== 'UPCOMING') {
        await Expense.create({
          tripId: trip.id,
          day: 1,
          category: 'FOOD',
          amount: 1200.00,
          description: 'Welcome Dinner',
          label: 'Grand Restaurant'
        });
        await Expense.create({
          tripId: trip.id,
          day: 1,
          category: 'ACTIVITY',
          amount: 500.00,
          description: 'City Palace Tour',
          label: 'Entry Fee'
        });
      }
    }

    console.log('Showcase seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedShowcase();
