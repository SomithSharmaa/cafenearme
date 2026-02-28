import fs from 'fs';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchFromOverpass() {
    const query = `
        [out:json][timeout:25];
        (
          node["amenity"="cafe"](17.2,78.2,17.6,78.6);
          node["amenity"="restaurant"](17.2,78.2,17.6,78.6);
          node["amenity"="fast_food"](17.2,78.2,17.6,78.6);
        );
        out body;
    `;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
    });
    const data = await response.json();
    const cafes = data.elements
        .filter(el => {
            if (!el.tags || !el.tags.name) return false;
            const name = el.tags.name.toLowerCase();
            // If it's tagged as a restaurant/fast_food on OSM instead of cafe, 
            // REQUIRE the name to explicitly say 'cafe', 'coffee', or 'roaster'
            if (el.tags.amenity !== 'cafe' && !/cafe|coffee|roaster/i.test(name)) {
                return false;
            }

            // Standard blacklist rejecting obvious non-cafes
            if (/hotel|restaurant|dhaba|mess|biryani|fast food|resort|lodge|inn|bakers|bakery|sweets|tiffin|chai|tea|stall/i.test(name) && !name.includes('cafe') && !name.includes('coffee')) {
                return false;
            }
            return true;
        })
        .map(el => ({
            id: el.id.toString(),
            name: el.tags.name,
            coordinates: { lat: el.lat, lng: el.lon },
            rating: (Math.random() * 1 + 4).toFixed(1),
            reviewsCount: Math.floor(Math.random() * 500) + 10,
            address: [el.tags['addr:street'], el.tags['addr:city']].filter(Boolean).join(', ') || 'Hyderabad, Telangana',
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
        }));

    // Deduplicate names
    const seen = new Set();
    const uniqueCafes = cafes.filter(c => {
        if (seen.has(c.name)) return false;
        seen.add(c.name);
        return true;
    });

    fs.writeFileSync('src/data/realCafes.js', 'export const REAL_CAFES = ' + JSON.stringify(uniqueCafes, null, 2) + ';');
    console.log('Saved ' + uniqueCafes.length + ' real cafes.');
}
fetchFromOverpass();
