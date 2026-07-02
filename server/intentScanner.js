// intentScanner.js
// reads the user message and finds matching car keywords
// written by zainab iftikhar

const fs   = require("fs");
const path = require("path");

let carData = {};
// load Shaikh's car_data.json

try {
  const raw = fs.readFileSync(path.join(__dirname, "car_data.json"), "utf8");
  carData = JSON.parse(raw);
  console.log("[intentScanner] car_data.json loaded");
} catch (err) {
  console.log("[intentScanner] could not load car_data.json, using fallback");
  
  
  // basic fallback , just enough to keep the bot running in case any error
  carData = {
    // Brands
    "bmw":          "BMW is a German luxury brand founded in 1916, known for sporty driving and the M performance division. Popular models include the 3 Series, 5 Series, X5, M3 and M5.",
    "audi":         "Audi is a German brand famous for Quattro all-wheel drive. Models include the A4, A6, Q5, RS6 and the e-tron electric range. Audi is owned by the Volkswagen Group.",
    "mercedes":     "Mercedes-Benz is a German luxury brand known for the C-Class, E-Class, S-Class and the AMG high-performance line. The AMG GT 63 S produces 630 horsepower.",
    "toyota":       "Toyota is a Japanese brand known for exceptional reliability. The Corolla is the best-selling car in history. Other popular models are the Camry, RAV4, Supra and Land Cruiser.",
    "tesla":        "Tesla is an American electric car brand. Models include the Model 3, Model S, Model X, Model Y and Cybertruck. The Model S Plaid does 0 to 100 km/h in under 2 seconds.",
    "ford":         "Ford is an American brand famous for the Mustang and the F-150 truck, the best-selling vehicle in the USA for over 40 years. The Shelby GT500 has 760 horsepower.",
    "honda":        "Honda is a Japanese brand known for reliability. Popular models are the Civic, Accord and CR-V. The Civic Type R is a performance hatchback with over 300 horsepower.",
    "ferrari":      "Ferrari is an Italian supercar brand with the famous Prancing Horse logo. The SF90 Stradale is a hybrid with 1000 horsepower. Cars are hand-built in Maranello, Italy.",
    "lamborghini":  "Lamborghini makes extreme supercars known for bold styling. The Revuelto produces 1001 horsepower from a hybrid V12. The Urus is their popular SUV.",
    "porsche":      "Porsche is a German sports car brand. The 911 has been in production since 1963. Other models include the Cayenne SUV, Macan, Panamera and the Taycan electric car.",
    "volkswagen":   "Volkswagen or VW is a German brand meaning Peoples Car. The Golf GTI started the hot hatch segment in 1976. VW also owns Audi, Porsche, Lamborghini and Seat.",
    "hyundai":      "Hyundai is a South Korean brand known for good value and long warranties. Popular models include the Tucson, Ioniq 5 electric and the high-performance N range.",
    "kia":          "Kia is a South Korean brand and sister company to Hyundai. The EV6 GT makes 585 horsepower. Popular models include the Sportage, Sorento and the Stinger.",
    "nissan":       "Nissan is a Japanese brand famous for the GT-R sports car nicknamed Godzilla. Popular everyday models include the Qashqai and Juke. The Leaf was an early mainstream electric car.",
    "mazda":        "Mazda is a Japanese brand known for fun driving and the rotary engine. The MX-5 Miata is one of the best-selling sports cars ever. The CX-5 is their popular SUV.",
    "subaru":       "Subaru is a Japanese brand with all-wheel drive on every model. The Impreza WRX STI was legendary in rally racing. The BRZ sports car is co-developed with Toyota.",
    "chevrolet":    "Chevrolet or Chevy is an American brand. The Corvette C8 has a mid-engine layout and great value. Other models include the Camaro muscle car and Silverado truck.",
    "volvo":        "Volvo is a Swedish brand that invented the three-point seatbelt in 1959 and gave it away free to save lives. Known for safety and the XC40, XC60 and XC90 SUVs.",
    "lexus":        "Lexus is the luxury division of Toyota. Known for excellent reliability and quiet cabins. Models include the LS sedan, RX SUV and the legendary LFA supercar with a V10 engine.",
    "jeep":         "Jeep is an American brand known for off-road capability. The Wrangler is their iconic model. The seven-slot grille is one of the most recognisable designs in automotive history.",
    "land rover":   "Land Rover is a British brand known for luxury off-road SUVs. Models include the Defender, Discovery and Range Rover. Owned by Tata Motors of India alongside Jaguar.",
    "range rover":  "Range Rover combines off-road capability with extreme luxury. A fully electric Range Rover was released in 2024. Very popular with celebrities and royalty.",
    "alfa romeo":   "Alfa Romeo is an Italian brand with passionate fans. The Giulia Quadrifoglio has a Ferrari-derived V6 with 510 horsepower. Known for beautiful styling and emotional driving.",
    "bentley":      "Bentley is a British ultra-luxury brand owned by Volkswagen Group. The Continental GT is their famous grand tourer. Cars are hand-crafted in Crewe, England.",
    "rolls royce":  "Rolls-Royce makes the most prestigious cars in the world. The Phantom, Ghost and Cullinan SUV are almost entirely handmade. Owned by BMW Group.",
    "aston martin": "Aston Martin is a British sports car brand and the car of James Bond. The Valkyrie hypercar uses a Red Bull F1-derived V12 engine producing 1000 horsepower.",
    "bugatti":      "Bugatti makes some of the most powerful cars ever. The Chiron has a W16 engine with 1500 horsepower and costs around 3 million dollars. Now owned by a group including Porsche.",
    "mclaren":      "McLaren is a British supercar brand. Models include the Artura hybrid and 720S. The Speedtail reaches 403 km/h. McLaren also runs a famous Formula 1 team.",
    "koenigsegg":   "Koenigsegg is a Swedish hypercar brand. The Agera RS set world speed records. The Jesko could theoretically exceed 500 km/h. Every car is hand built in small numbers.",
    "rimac":        "Rimac is a Croatian electric hypercar company. The Nevera has 1914 horsepower making it the fastest-accelerating production car ever. Rimac also now co-owns Bugatti.",
    "peugeot":      "Peugeot is a French brand and one of the oldest car manufacturers in the world. The 208 and 308 are popular hatchbacks. Part of Stellantis which also owns Fiat and Citroen.",
    "renault":      "Renault is a French brand. The Clio and Megane are bestsellers in Europe. The Megane RS is a famous hot hatch. The Alpine A110 is their sports car with a strong F1 history.",
    "maserati":     "Maserati is an Italian luxury brand with the Trident logo. Models include the Ghibli, Quattroporte and Levante SUV. The GranTurismo is now available as electric.",

    // Car Types
    "suv":          "SUVs are the most popular car type globally with higher ground clearance and more interior space. Popular examples include the BMW X5, Audi Q7, Porsche Cayenne and Range Rover.",
    "electric":     "Electric cars run on battery power with no petrol engine. Tesla leads the market but almost every brand now has electric models. Fast chargers can add hundreds of km in 20 to 30 minutes.",
    "hybrid":       "Hybrid cars combine a petrol engine with an electric motor. Toyota pioneered this with the Prius in 1997. Plug-in hybrids can be charged at home and driven short distances on electric only.",
    "sport":        "Sports cars are built for performance with powerful engines and precise handling. Classics include the Porsche 911, Ferrari 488 and Chevrolet Corvette.",
    "convertible":  "A convertible has a roof that folds away. Popular ones include the Mazda MX-5, Porsche 911 Cabriolet and Ferrari Portofino. A great open-air driving experience.",
    "pickup":       "Pickup trucks have an open cargo bed. The Ford F-150 is the best-selling vehicle in the USA. Electric pickups like the Tesla Cybertruck and Rivian R1T are the newest entries.",
    "sedan":        "Sedans are three-box cars with a separate boot. Popular ones include the BMW 3 Series, Audi A4, Toyota Camry and Tesla Model S.",
    "hatchback":    "Hatchbacks have a rear door that includes the rear window. Hot hatches like the VW Golf GTI and Honda Civic Type R are sporty high-performance versions.",
    "coupe":        "A coupe typically has two doors and a sloping roofline. Famous coupes include the BMW 4 Series, Audi TT and Ford Mustang. They prioritise style over practicality.",
    "wagon":        "Station wagons have an extended roofline for more boot space. The Audi RS6 Avant and Mercedes E-Class Estate are popular performance wagons.",

    // Topics  (yasin's questions related)
    "engine":       "Car engines range from small 3-cylinder units in city cars to V12s in supercars. Inline 4 and V6 are most common. Turbocharged engines add power without increasing size.",
    "horsepower":   "Horsepower measures engine power. A family car has 100 to 150 hp. Sports cars have 300 to 500 hp. Supercars like the Ferrari SF90 and Lamborghini Revuelto exceed 1000 hp.",
    "speed":        "The fastest production car is the Bugatti Chiron Super Sport 300 which broke 490 km/h. The Tesla Model S Plaid does 0 to 100 km/h in under 2 seconds.",
    "price":        "Budget cars start around 20000 dollars. A BMW 3 Series costs around 45000. A Ferrari 488 starts at 250000. The Bugatti Chiron costs over 3 million dollars.",
    "reliability":  "The most reliable brands are Toyota, Lexus, Mazda and Honda. German brands like BMW and Mercedes score lower due to complex electronics and higher repair costs.",
    "fuel":         "Petrol engines are most common. Diesel offers better economy for long distances. Hybrid cars use both. Fully electric cars use no fuel at all.",
    "safety":       "Car safety is rated by Euro NCAP. Volvo invented the three-point seatbelt in 1959. Key features include ABS, airbags, lane assist and automatic emergency braking.",
    "turbo":        "A turbocharger forces more air into the engine to increase power. Twin turbo uses two turbos for even more power. BMW, Audi and Porsche all use turbocharged engines extensively.",
    "awd":          "All-wheel drive sends power to all four wheels for better grip. Audi Quattro is the most famous AWD system. Subaru uses AWD on every single model they make.",
    "self driving": "Self-driving uses cameras and AI to drive without human input. Tesla Autopilot is the most well-known system. Waymo operates fully driverless taxis in some US cities.",
    "manual":       "Manual or stick shift cars require the driver to change gears using a clutch. Many driving enthusiasts prefer manual for more control and feel. The Porsche 911 GT3 still offers manual.",
    "automatic":    "Automatic gearboxes change gears without driver input. Modern dual-clutch automatics shift faster than any human. Most new cars are automatic. Many sports cars use paddle shifters.",
    "drift":        "Drifting is a motorsport where drivers oversteer to make the rear slide. Popular drift cars include the Nissan 350Z, BMW M3 and Toyota GR86. Japan has a very strong drift culture.",
    "rally":        "Rally racing takes place on public roads and special stages. The WRC features cars from Toyota, Hyundai and Ford. Subaru and Mitsubishi were famous rally brands in the 1990s and 2000s.",
    "f1":           "Formula 1 is the highest class of motorsport. Top teams include Red Bull, Mercedes, Ferrari and McLaren. Max Verstappen won three consecutive world championships from 2021 to 2023.",
    "used":         "Used cars offer much better value. A new car loses around 20 percent of its value immediately. Toyota Corollas and Honda Civics are popular used choices for reliability.",
    "test drive":   "A test drive lets you experience the car before buying. Test motorway and city driving. Check visibility, seat comfort and how intuitive the controls feel.",
    "color":        "The most popular car colours are white, black, grey and silver as they hold value better. Red is traditional for sports cars. Matte finishes are trendy but harder to repair.",
    "road trip":    "Long road trips need a comfortable car with good range. The BMW 5 Series, Mercedes E-Class and Volvo S90 are among the best for long distance comfort.",

    //Specific Models 
    "model 3":      "The Tesla Model 3 is the best-selling electric car in the world. It has a minimalist interior with one large touchscreen. Long range versions exceed 550 km on one charge.",
    "model y":      "The Tesla Model Y is a compact SUV and one of the best-selling cars globally. It shares a platform with the Model 3. The Performance version has over 450 horsepower.",
    "cybertruck":   "The Tesla Cybertruck has a futuristic stainless steel body that cannot be painted. The top Cyberbeast version has three motors and over 800 horsepower.",
    "911":          "The Porsche 911 has had a rear engine since 1963. The GT3 RS produces 525 hp. The Turbo S does 0 to 100 km/h in 2.7 seconds. It is considered the benchmark sports car.",
    "m3":           "The BMW M3 produces 503 horsepower from a twin-turbo inline-6. Available with rear-wheel drive or M xDrive all-wheel drive. One of the most popular performance sedans in the world.",
    "mustang":      "The Ford Mustang has been in production since 1964. The standard V8 produces 450 hp. The Shelby GT500 has a supercharged 5.2 litre V8 making 760 horsepower.",
    "civic":        "The Honda Civic Type R has over 300 horsepower and held the front-wheel drive lap record at the Nurburgring. The standard Civic is one of the best-selling cars of all time.",
    "corolla":      "The Toyota Corolla is the best-selling car in history with over 50 million sold. Known for extreme reliability. The GR Corolla is a hot performance version with a turbocharged engine.",
    "golf":         "The VW Golf GTI started the hot hatch segment in 1976. The Golf R all-wheel drive version has over 300 horsepower. The Golf has been in continuous production for over 45 years.",
    "gtr":          "The Nissan GT-R nicknamed Godzilla uses a twin-turbo V6 and all-wheel drive to compete with cars costing twice as much. The Nismo version produces 600 horsepower.",
    "urus":         "The Lamborghini Urus is a super SUV with a twin-turbo V8 producing 650 horsepower. It became Lamborghini's best-selling model soon after its 2018 launch.",
    "taycan":       "The Porsche Taycan is an all-electric sports car. The Turbo S makes 761 horsepower and does 0 to 100 km/h in 2.8 seconds. It has a two-speed rear gearbox unusual for an EV.",
    "mx5":          "The Mazda MX-5 Miata is the world's best-selling two-seat sports car with over a million sold. Loved for being lightweight, balanced and affordable. Pure driving joy.",
    "sf90":         "The Ferrari SF90 Stradale is a plug-in hybrid with 1000 horsepower from a twin-turbo V8 and three electric motors. SF90 stands for Scuderia Ferrari 90th anniversary.",
    "chiron":       "The Bugatti Chiron has a W16 engine with 1500 horsepower. It costs around 3 million dollars and only 500 were ever made. The Super Sport 300 version broke 490 km/h."

  };
}
// main function called by Yasin's engine.js
// checks if the user message contains any keyword from the data
function getBotResponse(userText) {
  const lower = userText.toLowerCase();
  const matched = [];

  // tried .find() first but a plain for in loop is easier to read here
  // also changed to collect ALL matches not just the first one
  for (let keyword in carData) {
    if (lower.includes(keyword)) {
      matched.push(carData[keyword]);
    }
  }

  // if multiple keywords matched join them together
  // so "compare bmw and tesla" gets both answers
  if (matched.length > 0) {
    return matched.join(" Also, ");
  }

  // nothing matched so return null so Yasin's fallback system kicks in
  return null;
}
// returns just the keyword names that matched, useful for debugging
// not exported but kept here for testing during development
function getMatchedKeywords(userText) {
  const lower = userText.toLowerCase();
  const keys  = [];

  for (let keyword in carData) {
    if (lower.includes(keyword)) {
      keys.push(keyword);
    }
  }

  // console.log("[intentScanner] matched:", keys);
  return keys;
}
module.exports = { getBotResponse };
