const dotenv = require('dotenv');
dotenv.config();

const { sequelize, City, Activity } = require('./models');
const cloudinary = require('./config/cloudinary');

// Upload an image URL to Cloudinary and return the secure_url
async function uploadToCloudinary(imageUrl, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: `traveloop/${folder}`,
      public_id: publicId,
      overwrite: true,
      transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
    });
    console.log(`  ✓ Uploaded: ${publicId}`);
    return result.secure_url;
  } catch (err) {
    console.error(`  ✗ Failed to upload ${publicId}:`, err.message);
    return imageUrl; // fallback to original URL
  }
}

// Real Indian cities with coordinates
const citiesData = [
  { name: 'Jaipur', country: 'India', region: 'Rajasthan', costIndex: 0.8, popularity: 95, lat: 26.9124, lng: 75.7873, description: 'The Pink City - known for its stunning palaces, forts, and vibrant culture.' },
  { name: 'Goa', country: 'India', region: 'Goa', costIndex: 1.0, popularity: 98, lat: 15.2993, lng: 74.1240, description: 'India\'s beach paradise with Portuguese heritage and vibrant nightlife.' },
  { name: 'Manali', country: 'India', region: 'Himachal Pradesh', costIndex: 0.9, popularity: 92, lat: 32.2396, lng: 77.1887, description: 'A hill station nestled in the mountains, perfect for adventure seekers.' },
  { name: 'Varanasi', country: 'India', region: 'Uttar Pradesh', costIndex: 0.6, popularity: 90, lat: 25.3176, lng: 83.0064, description: 'One of the oldest cities in the world, spiritual capital of India.' },
  { name: 'Kerala', country: 'India', region: 'Kerala', costIndex: 0.85, popularity: 94, lat: 10.8505, lng: 76.2711, description: 'God\'s Own Country - backwaters, tea plantations, and Ayurveda.' },
  { name: 'Udaipur', country: 'India', region: 'Rajasthan', costIndex: 0.85, popularity: 88, lat: 24.5854, lng: 73.7125, description: 'City of Lakes - romantic palaces reflecting on serene waters.' },
  { name: 'Rishikesh', country: 'India', region: 'Uttarakhand', costIndex: 0.7, popularity: 86, lat: 30.0869, lng: 78.2676, description: 'Yoga capital of the world, nestled along the holy Ganges.' },
  { name: 'Leh-Ladakh', country: 'India', region: 'Ladakh', costIndex: 1.2, popularity: 91, lat: 34.1526, lng: 77.5771, description: 'Land of high passes - dramatic landscapes and Buddhist monasteries.' },
];

// City images from Unsplash (direct links for specific Indian cities)
const cityImages = {
  'Jaipur': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  'Goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
  'Manali': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  'Varanasi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
  'Kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  'Udaipur': 'https://images.unsplash.com/photo-1602508991386-8c660dc9e4df?w=800',
  'Rishikesh': 'https://images.unsplash.com/photo-1583396618422-f7de224921af?w=800',
  'Leh-Ladakh': 'https://images.unsplash.com/photo-1626015365107-4c5fe4e3fe58?w=800',
};

// Activities per city with realistic INR prices and Unsplash images
const activitiesData = {
  'Jaipur': [
    { name: 'Amber Fort Tour', type: 'SIGHTSEEING', cost: 500, duration: 180, description: 'Explore the majestic Amber Fort with its intricate mirror work and stunning views.', imageUrl: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=800' },
    { name: 'Rajasthani Thali Experience', type: 'FOOD', cost: 800, duration: 90, description: 'Authentic Dal Baati Churma and royal Rajasthani cuisine at a heritage restaurant.', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
    { name: 'Hawa Mahal Visit', type: 'CULTURE', cost: 200, duration: 60, description: 'Visit the iconic Palace of Winds with its 953 small windows.', imageUrl: 'https://images.unsplash.com/photo-1590766940554-634bcd2ee040?w=800' },
  ],
  'Goa': [
    { name: 'Scuba Diving at Grande Island', type: 'ADVENTURE', cost: 3500, duration: 240, description: 'Discover underwater coral reefs and marine life at Grande Island.', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800' },
    { name: 'Beach Shack Seafood Dinner', type: 'FOOD', cost: 1200, duration: 120, description: 'Fresh Goan fish curry and prawn balchão at a beachside shack.', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800' },
    { name: 'Old Goa Churches Walk', type: 'CULTURE', cost: 0, duration: 120, description: 'Visit UNESCO World Heritage Portuguese churches including Basilica of Bom Jesus.', imageUrl: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=800' },
  ],
  'Manali': [
    { name: 'Solang Valley Paragliding', type: 'ADVENTURE', cost: 2500, duration: 60, description: 'Soar over the snow-capped Himalayas with tandem paragliding.', imageUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800' },
    { name: 'Rohtang Pass Excursion', type: 'SIGHTSEEING', cost: 1500, duration: 480, description: 'Day trip to the legendary Rohtang Pass at 13,050 ft altitude.', imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800' },
    { name: 'Hadimba Temple Visit', type: 'CULTURE', cost: 0, duration: 60, description: 'Ancient wooden temple set amidst tall deodar trees.', imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800' },
  ],
  'Varanasi': [
    { name: 'Ganga Aarti Ceremony', type: 'CULTURE', cost: 0, duration: 90, description: 'Witness the mesmerizing evening fire ceremony on the ghats of Varanasi.', imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800' },
    { name: 'Sunrise Boat Ride on Ganges', type: 'SIGHTSEEING', cost: 300, duration: 90, description: 'Glide along the sacred Ganges as the sun rises over ancient ghats.', imageUrl: 'https://images.unsplash.com/photo-1570804485046-1d6b6daca5d5?w=800' },
    { name: 'Banarasi Silk Shopping', type: 'SHOPPING', cost: 5000, duration: 120, description: 'Shop for world-famous Banarasi silk sarees from local weavers.', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
  ],
  'Kerala': [
    { name: 'Alleppey Houseboat Cruise', type: 'SIGHTSEEING', cost: 6000, duration: 720, description: 'Overnight stay on a traditional kettuvallam through backwater canals.', imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800' },
    { name: 'Ayurvedic Spa Treatment', type: 'OTHER', cost: 3000, duration: 120, description: 'Traditional Kerala Ayurvedic massage and wellness treatment.', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800' },
    { name: 'Munnar Tea Plantation Tour', type: 'SIGHTSEEING', cost: 800, duration: 180, description: 'Walk through lush green tea gardens and learn about tea processing.', imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800' },
  ],
  'Udaipur': [
    { name: 'Lake Pichola Boat Ride', type: 'SIGHTSEEING', cost: 400, duration: 60, description: 'Romantic boat ride with views of City Palace and Jag Mandir.', imageUrl: 'https://images.unsplash.com/photo-1602508991386-8c660dc9e4df?w=800' },
    { name: 'City Palace Museum', type: 'CULTURE', cost: 300, duration: 120, description: 'Explore the largest palace complex in Rajasthan with panoramic lake views.', imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800' },
    { name: 'Rooftop Dining at Ambrai', type: 'FOOD', cost: 1500, duration: 120, description: 'Fine dining with a stunning view of Lake Pichola and palaces.', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' },
  ],
  'Rishikesh': [
    { name: 'White Water Rafting', type: 'ADVENTURE', cost: 1800, duration: 180, description: '16 km river rafting through Grade III-IV rapids on the Ganges.', imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c83f3bcc0?w=800' },
    { name: 'Yoga Session at Parmarth', type: 'OTHER', cost: 500, duration: 90, description: 'Morning yoga and meditation session at a renowned ashram.', imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800' },
    { name: 'Bungee Jumping (83m)', type: 'ADVENTURE', cost: 3500, duration: 30, description: 'India\'s highest bungee jump at Mohan Chatti over a rocky riverbed.', imageUrl: 'https://images.unsplash.com/photo-1586795505490-65b1c8f27f70?w=800' },
  ],
  'Leh-Ladakh': [
    { name: 'Pangong Lake Day Trip', type: 'SIGHTSEEING', cost: 2500, duration: 600, description: 'Visit the stunning blue Pangong Tso lake at 14,270 ft altitude.', imageUrl: 'https://images.unsplash.com/photo-1626015365107-4c5fe4e3fe58?w=800' },
    { name: 'Nubra Valley Camel Safari', type: 'ADVENTURE', cost: 1000, duration: 60, description: 'Ride double-humped Bactrian camels on the Hunder sand dunes.', imageUrl: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800' },
    { name: 'Hemis Monastery Visit', type: 'CULTURE', cost: 100, duration: 120, description: 'Explore one of the largest and wealthiest Buddhist monasteries in Ladakh.', imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800' },
  ],
};

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('✓ Database synced\n');

    // Check if data already exists
    const existingCities = await City.count();
    if (existingCities > 0) {
      console.log(`ℹ  Found ${existingCities} existing cities. Clearing old data...`);
      await Activity.destroy({ where: {} });
      await City.destroy({ where: {} });
      console.log('✓ Old data cleared\n');
    }

    // Seed cities
    console.log('📍 Seeding cities with Cloudinary images...');
    const cityMap = {};

    for (const cityData of citiesData) {
      const imageUrl = cityImages[cityData.name];
      console.log(`\n  Uploading image for ${cityData.name}...`);
      const cloudinaryUrl = await uploadToCloudinary(
        imageUrl,
        'cities',
        cityData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
      );

      const city = await City.create({
        ...cityData,
        imageUrl: cloudinaryUrl,
      });
      cityMap[cityData.name] = city.id;
      console.log(`  ✓ Created city: ${cityData.name} (ID: ${city.id})`);
    }

    // Seed activities
    console.log('\n🎯 Seeding activities with Cloudinary images...');
    let activityCount = 0;

    for (const [cityName, activities] of Object.entries(activitiesData)) {
      const cityId = cityMap[cityName];
      console.log(`\n  ${cityName}:`);

      for (const actData of activities) {
        console.log(`    Uploading image for ${actData.name}...`);
        const cloudinaryUrl = await uploadToCloudinary(
          actData.imageUrl,
          'activities',
          actData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        );

        await Activity.create({
          ...actData,
          cityId,
          imageUrl: cloudinaryUrl,
        });
        activityCount++;
        console.log(`    ✓ Created: ${actData.name} (₹${actData.cost})`);
      }
    }

    console.log(`\n✅ Seed complete! Created ${Object.keys(cityMap).length} cities and ${activityCount} activities.\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
