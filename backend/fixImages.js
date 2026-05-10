const dotenv = require('dotenv');
dotenv.config();

const { sequelize, City, Activity } = require('./models');
const cloudinary = require('./config/cloudinary');

const fixes = [
  { model: 'City', name: 'Rishikesh', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { model: 'City', name: 'Leh-Ladakh', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { model: 'Activity', name: 'Lake Pichola Boat Ride', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800' },
  { model: 'Activity', name: 'Bungee Jumping (83m)', url: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800' },
  { model: 'Activity', name: 'Pangong Lake Day Trip', url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800' },
];

async function fixImages() {
  console.log('🔧 Fixing remaining broken images...\n');
  await sequelize.sync();

  for (const fix of fixes) {
    try {
      const Model = fix.model === 'City' ? City : Activity;
      const record = await Model.findOne({ where: { name: fix.name } });
      if (!record) { console.log(`  ⚠ ${fix.name} not found`); continue; }
      if (record.imageUrl && record.imageUrl.includes('cloudinary')) { console.log(`  ✓ ${fix.name} OK`); continue; }

      console.log(`  Uploading ${fix.name}...`);
      const result = await cloudinary.uploader.upload(fix.url, {
        folder: `traveloop/${fix.model === 'City' ? 'cities' : 'activities'}`,
        public_id: fix.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-v2',
        overwrite: true,
        transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
      });
      await record.update({ imageUrl: result.secure_url });
      console.log(`  ✓ Fixed: ${fix.name}`);
    } catch (err) {
      console.error(`  ✗ Failed ${fix.name}:`, err.message);
    }
  }
  console.log('\n✅ Done!');
  process.exit(0);
}
fixImages();
