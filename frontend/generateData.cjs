const fs = require('fs');

const indianCities = [
  { name: "Mumbai", famousFor: "Beaches, Bollywood, Gateway of India", category: "beach" },
  { name: "Delhi", famousFor: "Monuments, Food, India Gate", category: "monument" },
  { name: "Bengaluru", famousFor: "IT Hub, Parks, Nightlife", category: "city" },
  { name: "Hyderabad", famousFor: "Charminar, Biryani, IT", category: "monument" },
  { name: "Ahmedabad", famousFor: "Sabarmati Ashram, Textile, Food", category: "temple" },
  { name: "Chennai", famousFor: "Marina Beach, Temples, Filter Coffee", category: "beach" },
  { name: "Kolkata", famousFor: "Howrah Bridge, Durga Puja, Sweets", category: "monument" },
  { name: "Surat", famousFor: "Diamonds, Textiles", category: "city" },
  { name: "Pune", famousFor: "Education, Osho Ashram, IT", category: "city" },
  { name: "Jaipur", famousFor: "Hawa Mahal, Forts, Palaces", category: "monument" },
  { name: "Lucknow", famousFor: "Nawabi Culture, Kebabs, Bara Imambara", category: "monument" },
  { name: "Kanpur", famousFor: "Leather Goods, Textile", category: "city" },
  { name: "Nagpur", famousFor: "Oranges, Deekshabhoomi", category: "temple" },
  { name: "Indore", famousFor: "Street Food, Cleanliness", category: "city" },
  { name: "Thane", famousFor: "Lakes, Nature", category: "lake" },
  { name: "Bhopal", famousFor: "City of Lakes, Mosques", category: "lake" },
  { name: "Visakhapatnam", famousFor: "Beaches, Submarine Museum, Hills", category: "beach" },
  { name: "Pimpri-Chinchwad", famousFor: "Automobile Industry", category: "city" },
  { name: "Patna", famousFor: "Golghar, History, Ganges", category: "temple" },
  { name: "Vadodara", famousFor: "Laxmi Vilas Palace, Navratri", category: "monument" },
  { name: "Ghaziabad", famousFor: "Industry, Proximity to Delhi", category: "city" },
  { name: "Ludhiana", famousFor: "Hosiery, Manufacturing", category: "city" },
  { name: "Agra", famousFor: "Taj Mahal, Agra Fort, Petha", category: "monument" },
  { name: "Nashik", famousFor: "Vineyards, Kumbh Mela, Temples", category: "temple" },
  { name: "Faridabad", famousFor: "Industry, Surajkund", category: "lake" },
  { name: "Meerut", famousFor: "Sports Goods, History", category: "city" },
  { name: "Rajkot", famousFor: "Jewelry, Handicrafts", category: "city" },
  { name: "Kalyan-Dombivli", famousFor: "Historical Forts", category: "monument" },
  { name: "Vasai-Virar", famousFor: "Beaches, Forts", category: "beach" },
  { name: "Varanasi", famousFor: "Ghats, Kashi Vishwanath, Spirituality", category: "temple" },
  { name: "Srinagar", famousFor: "Dal Lake, Houseboats, Mountains", category: "lake" },
  { name: "Aurangabad", famousFor: "Ajanta & Ellora Caves", category: "monument" },
  { name: "Dhanbad", famousFor: "Coal Capital", category: "city" },
  { name: "Amritsar", famousFor: "Golden Temple, Wagah Border", category: "temple" },
  { name: "Navi Mumbai", famousFor: "Planned City, Parsik Hill", category: "city" },
  { name: "Allahabad", famousFor: "Triveni Sangam, Kumbh Mela", category: "temple" },
  { name: "Howrah", famousFor: "Howrah Bridge, Belur Math", category: "monument" },
  { name: "Ranchi", famousFor: "Waterfalls, MS Dhoni", category: "lake" },
  { name: "Gwalior", famousFor: "Gwalior Fort, Music", category: "monument" },
  { name: "Jabalpur", famousFor: "Dhuandhar Falls, Marble Rocks", category: "lake" },
  { name: "Coimbatore", famousFor: "Textiles, Adiyogi Shiva", category: "temple" },
  { name: "Vijayawada", famousFor: "Kanaka Durga Temple, Prakasam Barrage", category: "temple" },
  { name: "Jodhpur", famousFor: "Blue City, Mehrangarh Fort", category: "monument" },
  { name: "Madurai", famousFor: "Meenakshi Temple", category: "temple" },
  { name: "Raipur", famousFor: "Steel Plants, Lakes", category: "lake" },
  { name: "Kota", famousFor: "Coaching Institutes, Chambal River", category: "lake" },
  { name: "Guwahati", famousFor: "Kamakhya Temple, Brahmaputra River", category: "temple" },
  { name: "Chandigarh", famousFor: "Rock Garden, Sukhna Lake, Planned City", category: "lake" },
  { name: "Solapur", famousFor: "Textiles, Bed Sheets", category: "city" },
  { name: "Hubli-Dharwad", famousFor: "Pedha, Education", category: "city" },
  { name: "Mysore", famousFor: "Mysore Palace, Silk, Dasara", category: "monument" },
  { name: "Tiruchirappalli", famousFor: "Rockfort Temple, Srirangam", category: "temple" },
  { name: "Bareilly", famousFor: "Zari Zardosi, Jhumka", category: "city" },
  { name: "Aligarh", famousFor: "Locks, AMU", category: "city" },
  { name: "Tiruppur", famousFor: "Knitwear Capital", category: "city" },
  { name: "Gurgaon", famousFor: "Cyber Hub, MNCs", category: "city" },
  { name: "Moradabad", famousFor: "Brass Handicrafts", category: "city" },
  { name: "Jalandhar", famousFor: "Sports Goods", category: "city" },
  { name: "Bhubaneswar", famousFor: "Temple City of India", category: "temple" },
  { name: "Salem", famousFor: "Steel, Mangoes", category: "city" },
  { name: "Warangal", famousFor: "Thousand Pillar Temple, Fort", category: "temple" },
  { name: "Mira-Bhayandar", famousFor: "Salt Pans, Amusement Parks", category: "city" },
  { name: "Jalgaon", famousFor: "Banana City, Gold", category: "city" },
  { name: "Guntur", famousFor: "Chilies, Cotton", category: "city" },
  { name: "Thiruvananthapuram", famousFor: "Padmanabhaswamy Temple, Beaches", category: "temple" },
  { name: "Bhiwandi", famousFor: "Power Looms", category: "city" },
  { name: "Saharanpur", famousFor: "Wood Carving", category: "city" },
  { name: "Gorakhpur", famousFor: "Gorakhnath Temple, Gita Press", category: "temple" },
  { name: "Bikaner", famousFor: "Bhujia, Camels, Junagarh Fort", category: "monument" },
  { name: "Amravati", famousFor: "Ambadevi Temple", category: "temple" },
  { name: "Noida", famousFor: "IT Park, Film City", category: "city" },
  { name: "Jamshedpur", famousFor: "Tata Steel, Clean City", category: "city" },
  { name: "Bhilai", famousFor: "Steel Plant", category: "city" },
  { name: "Cuttack", famousFor: "Silver Filigree", category: "city" },
  { name: "Firozabad", famousFor: "Glass City, Bangles", category: "city" },
  { name: "Kochi", famousFor: "Backwaters, Chinese Fishing Nets", category: "lake" },
  { name: "Nellore", famousFor: "Aquaculture", category: "city" },
  { name: "Bhavnagar", famousFor: "Shipbreaking Yard, Snacks", category: "city" },
  { name: "Dehradun", famousFor: "Mountains, Doon School, Robber's Cave", category: "mountain" },
  { name: "Durgapur", famousFor: "Steel, Engineering", category: "city" },
  { name: "Asansol", famousFor: "Coal, Railways", category: "city" },
  { name: "Rourkela", famousFor: "Steel Plant", category: "city" },
  { name: "Nanded", famousFor: "Hazur Sahib Gurudwara", category: "temple" },
  { name: "Kolhapur", famousFor: "Mahalakshmi Temple, Chappals", category: "temple" },
  { name: "Ajmer", famousFor: "Dargah Sharif, Pushkar", category: "temple" },
  { name: "Akola", famousFor: "Cotton", category: "city" },
  { name: "Gulbarga", famousFor: "Forts, Tombs", category: "monument" },
  { name: "Jamnagar", famousFor: "Oil Refineries, Bandhani", category: "city" },
  { name: "Ujjain", famousFor: "Mahakaleshwar, Kumbh Mela", category: "temple" },
  { name: "Loni", famousFor: "Rural setup", category: "city" },
  { name: "Siliguri", famousFor: "Tea, Timber, Tourism", category: "mountain" },
  { name: "Jhansi", famousFor: "Jhansi Fort, Rani Lakshmibai", category: "monument" },
  { name: "Ulhasnagar", famousFor: "Textiles, Furniture", category: "city" },
  { name: "Jammu", famousFor: "City of Temples", category: "temple" },
  { name: "Sangli-Miraj & Kupwad", famousFor: "Turmeric", category: "city" },
  { name: "Mangalore", famousFor: "Beaches, Seafood, Temples", category: "beach" },
  { name: "Erode", famousFor: "Turmeric, Textiles", category: "city" },
  { name: "Belgaum", famousFor: "Kunda, Forts", category: "monument" },
  { name: "Kurnool", famousFor: "Konda Reddy Fort", category: "monument" },
  { name: "Ambattur", famousFor: "Industrial Estate", category: "city" },
  { name: "Rajahmundry", famousFor: "Godavari River, Culture", category: "lake" },
  { name: "Tirunelveli", famousFor: "Halwa, Nellaiappar Temple", category: "temple" },
  { name: "Malegaon", famousFor: "Power Looms", category: "city" },
  { name: "Gaya", famousFor: "Bodh Gaya, Mahabodhi Temple", category: "temple" },
  { name: "Udaipur", famousFor: "City of Lakes, Palaces", category: "lake" },
  { name: "Manali", famousFor: "Snow, Mountains, Solang Valley", category: "mountain" },
  { name: "Shimla", famousFor: "Mall Road, Mountains", category: "mountain" },
  { name: "Darjeeling", famousFor: "Tea Gardens, Toy Train", category: "mountain" },
  { name: "Munnar", famousFor: "Tea Plantations, Greenery", category: "mountain" },
  { name: "Ooty", famousFor: "Nilgiri Hills, Botanical Garden", category: "mountain" },
  { name: "Goa", famousFor: "Beaches, Nightlife, Churches", category: "beach" },
  { name: "Pondicherry", famousFor: "French Colony, Aurobindo Ashram", category: "beach" },
  { name: "Andaman", famousFor: "Pristine Beaches, Scuba Diving", category: "beach" },
  { name: "Leh", famousFor: "High Altitudes, Monasteries", category: "mountain" },
  { name: "Rishikesh", famousFor: "Yoga Capital, River Rafting", category: "mountain" },
  { name: "Haridwar", famousFor: "Ganga Aarti, Kumbh Mela", category: "temple" },
  { name: "Jaisalmer", famousFor: "Golden Fort, Desert Safari", category: "monument" },
  { name: "Hampi", famousFor: "Ancient Ruins, Architecture", category: "monument" }
];

const images = {
  temple: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  lake: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  monument: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
};

// Expand to exactly 250 cities by appending numbers
const cities = Array.from({ length: 250 }, (_, i) => {
  const baseCity = indianCities[i % indianCities.length];
  const suffix = i >= indianCities.length ? ` (Dist ${Math.floor(i / indianCities.length) + 1})` : '';
  return {
    id: `city_${i + 1}`,
    name: `${baseCity.name}${suffix}`,
    country: "India",
    famousFor: baseCity.famousFor,
    image: images[baseCity.category] || images.city,
    cost: `₹${Math.floor(Math.random() * 5000) + 1000}/day`,
    duration: `${Math.floor(Math.random() * 5) + 2} days`
  };
});

const activityCategories = [
  { name: "Paragliding", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=400&q=80" },
  { name: "Scuba Diving", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80" },
  { name: "Hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" },
  { name: "Skiing", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&q=80" },
  { name: "Surfing", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80" },
  { name: "Bungee Jumping", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80" },
  { name: "Rock Climbing", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=400&q=80" },
  { name: "Kayaking", image: "https://images.unsplash.com/photo-1544253303-3ea7ef10bfbe?auto=format&fit=crop&w=400&q=80" },
  { name: "Skydiving", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80" },
  { name: "Mountain Biking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" },
  { name: "Trekking", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
  { name: "River Rafting", image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80" },
  { name: "Camping", image: "https://images.unsplash.com/photo-1504280390267-3141f238210d?auto=format&fit=crop&w=400&q=80" },
  { name: "Desert Safari", image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=400&q=80" },
  { name: "Wildlife Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80" },
  { name: "Yoga Retreat", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80" },
  { name: "Temple Tour", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=400&q=80" }
];

const activities = Array.from({ length: 300 }, (_, i) => {
  const category = activityCategories[i % activityCategories.length];
  const suffix = i >= activityCategories.length ? ` ${Math.floor(i / activityCategories.length) + 1}` : '';
  
  const numCities = Math.floor(Math.random() * 8) + 3;
  const places = [];
  for (let j = 0; j < numCities; j++) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    if (!places.find(p => p.id === randomCity.id)) {
      places.push(randomCity);
    }
  }

  return {
    id: `act_${i + 1}`,
    name: `${category.name}${suffix}`,
    image: category.image,
    description: `Experience the thrill of ${category.name.toLowerCase()}.`,
    places: places
  };
});

// Ensure exact "Paragliding"
activities[0].name = "Paragliding";
activities[0].places = cities.filter(c => c.famousFor.toLowerCase().includes('mountain') || c.name === 'Manali');
if(activities[0].places.length === 0) activities[0].places = cities.slice(0, 5);

fs.writeFileSync('src/data/mockData.js', `export const mockCities = ${JSON.stringify(cities, null, 2)};\nexport const mockActivities = ${JSON.stringify(activities, null, 2)};`);
console.log('Data generated successfully!');
