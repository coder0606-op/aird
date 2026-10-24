require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./models/Tour');
const Visa = require('./models/Visa');
const Activity = require('./models/Activity');
const Testimonial = require('./models/Testimonial');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Tour.deleteMany();
    await Visa.deleteMany();
    await Activity.deleteMany();
    await Testimonial.deleteMany();
    await Admin.deleteMany();

    // Seed Admin
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@airdream.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin User',
    });
    console.log('✅ Admin user created');

    // Seed Tours
    const tours = [
      {
        title: "Dubai Desert Safari with BBQ Dinner",
        description: "Experience the thrill of a lifetime with our premium Desert Safari. Enjoy dune bashing in a 4x4 Land Cruiser, camel riding, sandboarding, and a delicious BBQ dinner under the stars with live entertainment including belly dance and tanoura shows.",
        price: 150, originalPrice: 200,
        category: "Adventure", rating: 5,
        duration: { days: 1, nights: 0 },
        images: ["/images/desert-safari.jpg"],
        highlights: ["Dune Bashing", "Camel Riding", "Sandboarding", "BBQ Dinner", "Belly Dance Show", "Henna Painting"],
        included: [{ name: "Hotel Pick-up/Drop-off", icon: "transport" }, { name: "English Speaking Guide", icon: "guide" }, { name: "Soft Drinks & Water", icon: "food" }, { name: "BBQ Dinner Buffet", icon: "food" }],
        activities: ["Dune Bashing", "Camel Riding", "Sandboarding", "BBQ Dinner"],
        isActive: true
      },
      {
        title: "Burj Khalifa At The Top - Floor 124 & 125",
        description: "Visit the tallest building in the world and enjoy breathtaking 360-degree views of Dubai from the 124th and 125th floors. The iconic observation deck offers stunning panoramic views of the city, the desert, and the ocean.",
        price: 180, originalPrice: 220,
        category: "Sightseeing", rating: 4.8,
        duration: { days: 1, nights: 0 },
        images: ["/images/burj-khalifa.jpg"],
        highlights: ["360° Views", "Interactive Displays", "Observation Deck", "Photo Opportunities"],
        included: [{ name: "Skip-the-line Entry", icon: "ticket" }, { name: "Audio Guide", icon: "guide" }],
        activities: ["Observation Deck Visit", "Photography"],
        isActive: true
      },
      {
        title: "Dhow Cruise Dinner Marina",
        description: "Enjoy a romantic evening cruise on a traditional wooden dhow along Dubai Marina. Feast on a sumptuous international buffet while taking in stunning views of the illuminated Marina skyline.",
        price: 120, originalPrice: 160,
        category: "Cruise", rating: 4.7,
        duration: { days: 1, nights: 0 },
        images: ["/images/dhow-cruise.jpg"],
        highlights: ["2-hour Marina Cruise", "International Buffet", "Live Entertainment", "Stunning Night Views"],
        included: [{ name: "Welcome Drinks", icon: "food" }, { name: "Buffet Dinner", icon: "food" }, { name: "Live Music", icon: "activity" }],
        activities: ["Marina Cruise", "Buffet Dinner", "Entertainment"],
        isActive: true
      },
      {
        title: "Georgia 4 Days Holiday Package",
        description: "Discover the beauty of Georgia with our curated 4-day package. Explore Tbilisi's charming old town, visit the stunning Jvari Monastery, and enjoy the breathtaking landscapes of the Caucasus mountains.",
        price: 1200, originalPrice: 1500,
        category: "Holiday", rating: 5,
        duration: { days: 4, nights: 3 },
        images: [],
        highlights: ["Tbilisi City Tour", "Jvari Monastery", "Mtskheta Visit", "Georgian Wine Tasting", "Cable Car Ride"],
        included: [{ name: "Return Flights", icon: "transport" }, { name: "3-Star Hotel", icon: "hotel" }, { name: "Daily Breakfast", icon: "food" }, { name: "Airport Transfers", icon: "transport" }, { name: "City Tours", icon: "activity" }],
        activities: ["City Tour", "Monastery Visit", "Wine Tasting"],
        isActive: true
      },
      {
        title: "Quad Biking in Desert",
        description: "Ride through the sand dunes on a powerful quad bike. An adrenaline-pumping adventure perfect for thrill seekers looking for an unforgettable desert experience.",
        price: 250, originalPrice: 300,
        category: "Adventure", rating: 4.9,
        duration: { days: 1, nights: 0 },
        images: ["/images/quad-biking.jpg"],
        highlights: ["30-min Quad Ride", "Safety Gear Provided", "Professional Instructor", "Desert Photography"],
        included: [{ name: "Hotel Pickup", icon: "transport" }, { name: "Safety Equipment", icon: "safety" }, { name: "Water & Refreshments", icon: "food" }],
        activities: ["Quad Biking", "Desert Photography"],
        isActive: true
      },
      {
        title: "Global Village Dubai",
        description: "Explore cultures from around the world at this vibrant multicultural festival park featuring shopping, dining, rides, and live entertainment from over 90 countries.",
        price: 50,
        category: "Entertainment", rating: 4.5,
        duration: { days: 1, nights: 0 },
        images: ["/images/global-village.jpg"],
        highlights: ["90+ Countries Pavilions", "Live Shows", "Street Food", "Shopping", "Rides & Attractions"],
        included: [{ name: "Entry Ticket", icon: "ticket" }],
        activities: ["Cultural Exploration", "Shopping", "Food Tasting"],
        isActive: true
      }
    ];
    await Tour.insertMany(tours);
    console.log('✅ Tours seeded');

    // Seed Activities
    const activities = [
      {
        title: "VR Park Dubai",
        description: "Explore the virtual world at Dubai's premier VR entertainment center.",
        price: 100, originalPrice: 130,
        category: "Entertainment", rating: 4.3,
        duration: { days: 1, nights: 0 },
        images: ["/images/vr-park.jpg"],
        activities: ["VR Experiences", "Gaming"],
        isActive: true
      },
      {
        title: "Dubai Frame Visit",
        description: "Visit the iconic Dubai Frame and enjoy panoramic views of old and new Dubai.",
        price: 80,
        category: "Sightseeing", rating: 4.6,
        duration: { days: 1, nights: 0 },
        images: [],
        activities: ["Observation Deck", "Museum"],
        isActive: true
      }
    ];
    await Activity.insertMany(activities);
    console.log('✅ Activities seeded');

    // Seed Visas
   const visas = [
  {
    country: "UAE",
    type: "Tourist",
    price: 350,
    originalPrice: 400,
    processingTime: "2-3 Days",
    isFastTrack: true,
    getOnDate: "2 Days"
  },
  {
    country: "Canada",
    type: "Tourist",
    price: 1500,
    processingTime: "30-45 Days",
    isFastTrack: false
  },
  {
    country: "Malta",
    type: "Tourist",
    price: 800,
    processingTime: "15-20 Days",
    isFastTrack: true,
    getOnDate: "15 Days"
  },
  {
    country: "Thailand",
    type: "Tourist",
    price: 300,
    processingTime: "5-7 Days",
    isFastTrack: true,
    getOnDate: "5 Days"
  },
  {
    country: "Singapore",
    type: "Tourist",
    price: 400,
    processingTime: "3-5 Days",
    isFastTrack: true,
    getOnDate: "3 Days"
  },
  {
    country: "Saudi Arabia",
    type: "Tourist",
    price: 600,
    processingTime: "3-5 Days",
    isFastTrack: true,
    getOnDate: "3 Days"
  },
  {
    country: "USA",
    type: "Business",
    price: 2000,
    processingTime: "45-60 Days",
    isFastTrack: false
  },
  {
    country: "UK",
    type: "Tourist",
    price: 750,
    originalPrice: 850,
    processingTime: "3 Weeks",
    isFastTrack: true,
    getOnDate: "3 Weeks"
  },
  {
    country: "Schengen",
    type: "Tourist",
    price: 800,
    processingTime: "14 Days",
    isFastTrack: false
  }
];
    await Visa.insertMany(visas);
    console.log('✅ Visas seeded');

    // Seed Testimonials
    const testimonials = [
      { name: "Deepa Devadas", date: "Oct 12, 2023", title: "Excellent Service", review: "Highly recommend Air Dream Travel. They organized our entire Dubai trip perfectly. From the desert safari to the Burj Khalifa visit, everything was seamless.", rating: 5, avatarColor: "#0891b2" },
      { name: "Deepak Devadas", date: "Nov 05, 2023", title: "Great Experience", review: "Very professional and helpful team. Got our Schengen visa processed quickly and the holiday package was fantastic value for money.", rating: 5, avatarColor: "#7c3aed" },
      { name: "Lakshmanan S.", date: "Sep 18, 2023", title: "Smooth Visa Process", review: "Got my UAE tourist visa within 48 hours as promised. The team was very responsive on WhatsApp and kept me updated throughout.", rating: 4, avatarColor: "#f43f5e" },
      { name: "Sivagami A.", date: "Dec 20, 2023", title: "Amazing Desert Safari", review: "The desert safari was unforgettable! The BBQ dinner under the stars with live entertainment was the highlight of our trip. Thank you Air Dream!", rating: 5, avatarColor: "#00b67a" },
      { name: "Raghu Nath", date: "Jan 10, 2024", title: "Responsive Support", review: "Customer support was very responsive. They helped us change our flight dates last minute and even got us a better deal on our hotel.", rating: 4, avatarColor: "#f59e0b" },
      { name: "Sarah Mitchell", date: "Feb 14, 2024", title: "Perfect Honeymoon", review: "Booked our Bali honeymoon package with Air Dream. Everything from flights to hotels to activities was arranged perfectly. Couldn't have asked for more!", rating: 5, avatarColor: "#6366f1" }
    ];
    await Testimonial.insertMany(testimonials);
    console.log('✅ Testimonials seeded');

    console.log('\n🎉 All data seeded successfully!');
    console.log('📧 Admin Login: admin@airdream.com / admin123');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
