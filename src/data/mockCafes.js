const BASE_CAFES = [
    // --- BANJARA HILLS (Premium Hub) ---
    { id: 'bh1', name: "Roast 24 Seven", rating: 4.8, reviewsCount: 1500, coordinates: { lat: 17.4150, lng: 78.4300 }, address: "Banjara Hills Rd 12" },
    { id: 'bh2', name: "The Roastery Coffee House", rating: 4.9, reviewsCount: 3000, coordinates: { lat: 17.4200, lng: 78.4350 }, address: "Banjara Hills" },
    { id: 'bh3', name: "Feranoz", rating: 4.7, reviewsCount: 900, coordinates: { lat: 17.4180, lng: 78.4320 }, address: "Banjara Hills" },
    { id: 'bh4', name: "Bikanervala Cafe", rating: 4.2, reviewsCount: 2000, coordinates: { lat: 17.4120, lng: 78.4280 }, address: "Banjara Hills" },
    { id: 'bh5', name: "Fue's Churros & Coffee", rating: 4.5, reviewsCount: 300, coordinates: { lat: 17.4160, lng: 78.4310 }, address: "Banjara Hills" },
    { id: 'bh6', name: "Park Hill Cafe", rating: 4.4, reviewsCount: 400, coordinates: { lat: 17.4140, lng: 78.4330 }, address: "Banjara Hills" },
    { id: 'bh7', name: "Concu Rd 10", rating: 4.6, reviewsCount: 1200, coordinates: { lat: 17.4100, lng: 78.4380 }, address: "Banjara Hills Rd 10" },
    { id: 'bh8', name: "Guilt Trip", rating: 4.3, reviewsCount: 800, coordinates: { lat: 17.4190, lng: 78.4250 }, address: "Banjara Hills" },

    // --- JUBILEE HILLS (The Vibe) ---
    { id: 'jh1', name: "Araku Coffee", rating: 4.7, reviewsCount: 800, coordinates: { lat: 17.4250, lng: 78.4100 }, address: "Jubilee Hills" },
    { id: 'jh2', name: "Conçu Jubilee", rating: 4.6, reviewsCount: 1200, coordinates: { lat: 17.4280, lng: 78.4120 }, address: "Jubilee Hills" },
    { id: 'jh3', name: "Third Wave Coffee Jubilee", rating: 4.5, reviewsCount: 500, coordinates: { lat: 17.4300, lng: 78.4050 }, address: "Jubilee Hills" },
    { id: 'jh4', name: "Ironhill Cafe", rating: 4.4, reviewsCount: 1100, coordinates: { lat: 17.4350, lng: 78.3980 }, address: "Jubilee Hills" },
    { id: 'jh5', name: "Autumn Leaf Cafe", rating: 4.6, reviewsCount: 1300, coordinates: { lat: 17.4330, lng: 78.4020 }, address: "Jubilee Hills" },
    { id: 'jh6', name: "Hole in the Wall", rating: 4.2, reviewsCount: 2500, coordinates: { lat: 17.4260, lng: 78.4080 }, address: "Jubilee Hills" },
    { id: 'jh7', name: "Zozoz Pizzeria & Cafe", rating: 4.5, reviewsCount: 600, coordinates: { lat: 17.4290, lng: 78.4040 }, address: "Jubilee Hills" },
    { id: 'jh8', name: "Farzi Cafe", rating: 4.1, reviewsCount: 3000, coordinates: { lat: 17.4310, lng: 78.4060 }, address: "Jubilee Hills" },
    { id: 'jh9', name: "Vibrant Cafe", rating: 4.3, reviewsCount: 400, coordinates: { lat: 17.4340, lng: 78.4100 }, address: "Jubilee Hills" },

    // --- MADHAPUR & HITECH CITY (Tech Hub) ---
    { id: 'mh1', name: "Ikea Cafe", rating: 4.3, reviewsCount: 5000, coordinates: { lat: 17.4380, lng: 78.3750 }, address: "Hitech City" },
    { id: 'mh2', name: "Starbucks Hitech", rating: 4.4, reviewsCount: 900, coordinates: { lat: 17.4450, lng: 78.3800 }, address: "Hitech City" },
    { id: 'mh3', name: "Karachi Bakery Facade", rating: 4.2, reviewsCount: 2000, coordinates: { lat: 17.4500, lng: 78.3900 }, address: "Madhapur" },
    { id: 'mh4', name: "Heart Cup Coffee", rating: 4.5, reviewsCount: 1100, coordinates: { lat: 17.4520, lng: 78.3850 }, address: "Madhapur" },
    { id: 'mh5', name: "The Hole in the Wall Hitech", rating: 4.3, reviewsCount: 700, coordinates: { lat: 17.4480, lng: 78.3920 }, address: "Madhapur" },
    { id: 'mh6', name: "Drug Store Cafe", rating: 4.0, reviewsCount: 500, coordinates: { lat: 17.4460, lng: 78.3880 }, address: "Madhapur" },
    { id: 'mh7', name: "Globe Trotter", rating: 4.6, reviewsCount: 800, coordinates: { lat: 17.4440, lng: 78.3820 }, address: "Hitech City" },
    { id: 'mh8', name: "Social Mindspace", rating: 4.4, reviewsCount: 2200, coordinates: { lat: 17.4420, lng: 78.3840 }, address: "Mindspace" },

    // --- KONDAPUR (Residential) ---
    { id: 'kd1', name: "Coffee Day Kondapur", rating: 4.1, reviewsCount: 600, coordinates: { lat: 17.4600, lng: 78.3650 }, address: "Kondapur" },
    { id: 'kd2', name: "84 Anjuna Shack", rating: 4.3, reviewsCount: 400, coordinates: { lat: 17.4650, lng: 78.3700 }, address: "Kondapur" },
    { id: 'kd3', name: "Sirocco", rating: 4.2, reviewsCount: 300, coordinates: { lat: 17.4580, lng: 78.3600 }, address: "Kondapur" },
    { id: 'kd4', name: "Highland Coffee", rating: 4.5, reviewsCount: 200, coordinates: { lat: 17.4620, lng: 78.3680 }, address: "Kondapur" },

    // --- KOKAPET & GACHIBOWLI EXT (Upcoming Premium) ---
    { id: 'kk1', name: "The Foodsmith", rating: 4.6, reviewsCount: 200, coordinates: { lat: 17.3950, lng: 78.3300 }, address: "Kokapet" },
    { id: 'kk2', name: "Comic Social", rating: 4.4, reviewsCount: 300, coordinates: { lat: 17.3980, lng: 78.3250 }, address: "Kokapet" },
    { id: 'kk3', name: "Sofrehh", rating: 4.7, reviewsCount: 150, coordinates: { lat: 17.3920, lng: 78.3350 }, address: "Kokapet" },

    // --- GACHIBOWLI & FINANCIAL DISTRICT ---
    { id: 'gf1', name: "Theory Cafe", rating: 4.6, reviewsCount: 400, coordinates: { lat: 17.4150, lng: 78.3400 }, address: "Gachibowli" },
    { id: 'gf2', name: "Driven Cafe", rating: 4.4, reviewsCount: 1500, coordinates: { lat: 17.4200, lng: 78.3350 }, address: "Gachibowli" },
    { id: 'gf3', name: "The Fisherman's Wharf", rating: 4.3, reviewsCount: 1200, coordinates: { lat: 17.4100, lng: 78.3300 }, address: "Gachibowli" },
    { id: 'gf4', name: "Roast CCX", rating: 4.7, reviewsCount: 600, coordinates: { lat: 17.4250, lng: 78.3450 }, address: "Financial District" },
    { id: 'gf5', name: "Starbucks FD", rating: 4.5, reviewsCount: 800, coordinates: { lat: 17.4230, lng: 78.3480 }, address: "Financial District" },
    { id: 'gf6', name: "Cafe De Flora", rating: 4.2, reviewsCount: 300, coordinates: { lat: 17.4180, lng: 78.3380 }, address: "Gachibowli" },
    { id: 'gf7', name: "Beyond Coffee", rating: 4.4, reviewsCount: 900, coordinates: { lat: 17.4350, lng: 78.3480 }, address: "Gachibowli" },

    // --- KUKATPALLY & KPHB (Dense Residential) ---
    { id: 'kp1', name: "Chai Kahani", rating: 4.3, reviewsCount: 300, coordinates: { lat: 17.4900, lng: 78.4000 }, address: "Kukatpally" },
    { id: 'kp2', name: "Drunken Monkey", rating: 4.4, reviewsCount: 400, coordinates: { lat: 17.4950, lng: 78.4050 }, address: "Kukatpally" },
    { id: 'kp3', name: "Cream Stone KPHB", rating: 4.6, reviewsCount: 1500, coordinates: { lat: 17.4850, lng: 78.3900 }, address: "KPHB" },
    { id: 'kp4', name: "Coffee Day KPHB", rating: 4.0, reviewsCount: 800, coordinates: { lat: 17.4880, lng: 78.3950 }, address: "KPHB" },
    { id: 'kp5', name: "Makers of Milkshake", rating: 4.2, reviewsCount: 500, coordinates: { lat: 17.4920, lng: 78.4020 }, address: "Kukatpally" },

    // --- SECUNDERABAD & SAINIKPURI (Classic Vibes) ---
    { id: 'sc1', name: "Alpha Hotel", rating: 4.2, reviewsCount: 6000, coordinates: { lat: 17.4350, lng: 78.5000 }, address: "Secunderabad" },
    { id: 'sc2', name: "Coffee Cup", rating: 4.6, reviewsCount: 900, coordinates: { lat: 17.4850, lng: 78.5350 }, address: "Sainikpuri" },
    { id: 'sc3', name: "F3 Cafe & Bistro", rating: 4.4, reviewsCount: 500, coordinates: { lat: 17.4900, lng: 78.5400 }, address: "Sainikpuri" },
    { id: 'sc4', name: "The Big Cup Theory", rating: 4.5, reviewsCount: 450, coordinates: { lat: 17.4800, lng: 78.5300 }, address: "Sainikpuri" },
    { id: 'sc5', name: "Eclaire", rating: 4.3, reviewsCount: 300, coordinates: { lat: 17.4820, lng: 78.5280 }, address: "Sainikpuri" },
    { id: 'sc6', name: "Groove 9", rating: 4.4, reviewsCount: 600, coordinates: { lat: 17.4880, lng: 78.5320 }, address: "Sainikpuri" },
    { id: 'sc7', name: "Conçu Secunderabad", rating: 4.7, reviewsCount: 400, coordinates: { lat: 17.4400, lng: 78.5100 }, address: "Secunderabad" },

    // --- MANIKONDA & NARSINGI (Upcoming) ---
    { id: 'mk1', name: "Cafe Eclat", rating: 4.6, reviewsCount: 800, coordinates: { lat: 17.4000, lng: 78.3800 }, address: "Manikonda" },
    { id: 'mk2', name: "Labonel Teahouse", rating: 4.7, reviewsCount: 600, coordinates: { lat: 17.4050, lng: 78.3850 }, address: "Manikonda" },
    { id: 'mk3', name: "Ironhill Manikonda", rating: 4.3, reviewsCount: 400, coordinates: { lat: 17.3980, lng: 78.3820 }, address: "Manikonda" },
    { id: 'mk4', name: "Brews & Blends", rating: 4.4, reviewsCount: 200, coordinates: { lat: 17.3900, lng: 78.3750 }, address: "Narsingi" },

    // --- CENTRAL HYDERABAD (Himayatnagar/Abids) ---
    { id: 'ch1', name: "Minerva Coffee Shop", rating: 4.5, reviewsCount: 3000, coordinates: { lat: 17.4000, lng: 78.4800 }, address: "Himayatnagar" },
    { id: 'ch2', name: "Karachi Bakery Main", rating: 4.5, reviewsCount: 10000, coordinates: { lat: 17.3880, lng: 78.4700 }, address: "Mozamjahi Market" },
    { id: 'ch3', name: "Nilofer Cafe", rating: 4.8, reviewsCount: 5000, coordinates: { lat: 17.3950, lng: 78.4650 }, address: "Lakdikapul" },
    { id: 'ch4', name: "Cafe Bahar", rating: 4.3, reviewsCount: 15000, coordinates: { lat: 17.3980, lng: 78.4850 }, address: "Basheerbagh" },
    { id: 'ch5', name: "Grand Hotel", rating: 4.1, reviewsCount: 8000, coordinates: { lat: 17.3890, lng: 78.4780 }, address: "Abids" },

    // --- OLD CITY ---
    { id: 'oc1', name: "Nimrah Cafe", rating: 4.9, reviewsCount: 8000, coordinates: { lat: 17.3616, lng: 78.4747 }, address: "Charminar" },
    { id: 'oc2', name: "Pista House", rating: 4.5, reviewsCount: 4000, coordinates: { lat: 17.3600, lng: 78.4800 }, address: "Shalibanda" },
    { id: 'oc3', name: "Shah Ghouse", rating: 4.4, reviewsCount: 6000, coordinates: { lat: 17.3580, lng: 78.4720 }, address: "Shah Ali Banda" },

    // --- BEGUMPET & SOMAJIGUDA ---
    { id: 'bs1', name: "Olive Bistro", rating: 4.6, reviewsCount: 2000, coordinates: { lat: 17.4260, lng: 78.3980 }, address: "Durgam Cheruvu" }, // Actually Jubilee but visually between
    { id: 'bs2', name: "10 Downing Street", rating: 4.4, reviewsCount: 5000, coordinates: { lat: 17.4350, lng: 78.4600 }, address: "Begumpet" },
    { id: 'bs3', name: "The Park", rating: 4.3, reviewsCount: 3000, coordinates: { lat: 17.4250, lng: 78.4620 }, address: "Somajiguda" },
];

// Procedurally generate 600 more cafes bounding Hyderabad for the clustering demo
const generatedCafes = [];
const vibes = ['Social', 'Work', 'Quiet', 'Date', 'Pet-Friendly', 'Arttsy'];

for (let i = 0; i < 600; i++) {
    // Generate bounds around Hyderabad (Lat: 17.35 to 17.50, Lng: 78.30 to 78.55)
    const lat = 17.35 + Math.random() * 0.15;
    const lng = 78.30 + Math.random() * 0.25;

    generatedCafes.push({
        id: `mock-gen-${i}`,
        name: `Local Roasters ${i + 1}`,
        rating: (3.2 + Math.random() * 1.8).toFixed(1), // Random rating between 3.2 and 5.0
        reviewsCount: Math.floor(Math.random() * 3000),
        coordinates: { lat, lng },
        address: "Hyderabad Neighborhood",
        type: vibes[Math.floor(Math.random() * vibes.length)],
        visitors: Math.floor(Math.random() * 5000),
        images: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24", "https://images.unsplash.com/photo-1497935586351-b67a49e012bf"]
    });
}

export const HYDERABAD_CAFES = [...BASE_CAFES, ...generatedCafes];
