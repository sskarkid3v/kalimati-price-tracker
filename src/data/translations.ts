// Static mapping of Nepali vegetable/fruit names to English
// This is used for bilingual display and search on the frontend

const translations: Record<string, string> = {
  "अदुवा": "Ginger",
  "अनार": "Pomegranate",
  "आँप(दसहरी)": "Mango (Dasheri)",
  "आँप(मालदह)": "Mango (Maldah)",
  "आलु रातो(भारतीय)": "Red Potato (Indian)",
  "आलु रातो(मुडे)": "Red Potato (Round)",
  "आलु रातो(लाम्चो)": "Red Potato (Long)",
  "आलु सेतो": "White Potato",
  "इमली": "Tamarind",
  "काउली स्थानिय": "Cauliflower (Local)",
  "काक्रो(लोकल)": "Cucumber (Local)",
  "काक्रो(लोकलक्रस)": "Cucumber (Local Cross)",
  "काक्रो(हाइब्रीड)": "Cucumber (Hybrid)",
  "कागती": "Lemon",
  "कुरीलो": "Asparagus",
  "केरा(नेपाली)": "Banana (Nepali)",
  "केरा(मालभोग)": "Banana (Malbhog)",
  "खुर्सानी हरियो(अकबरे)": "Green Chilli (Akbare)",
  "खुर्सानी हरियो(बुलेट)": "Green Chilli (Bullet)",
  "खुर्सानी हरियो(माछे)": "Green Chilli (Machhe)",
  "खुर्सानी हरियो(लाम्चो)": "Green Chilli (Long)",
  "खु्र्सानी सुकेको": "Dried Chilli",
  "गाजर(लोकल)": "Carrot (Local)",
  "गान्टे मूला": "Turnip Radish",
  "गुन्दुक": "Gundruk (Fermented Greens)",
  "गोलभेडा ठूलो(नेपाली)": "Tomato Large (Nepali)",
  "गोलभेडा सानो(टनेल)": "Tomato Small (Tunnel)",
  "गोलभेडा सानो(लोकल)": "Tomato Small (Local)",
  "घिउ सिमी(राजमा)": "Kidney Beans (Rajma)",
  "घिउ सिमी(लोकल)": "Flat Beans (Local)",
  "घिउ सिमी(हाइब्रीड)": "Flat Beans (Hybrid)",
  "घिरौला": "Sponge Gourd",
  "चमसूरको साग": "Cress Leaves",
  "चिचिण्डो": "Snake Gourd",
  "चुकुन्दर": "Beetroot",
  "च्याउ(कन्य)": "Mushroom (Oyster)",
  "च्याउ(डल्ले)": "Mushroom (Button)",
  "जिरीको साग": "Fenugreek Leaves",
  "जुनार": "Sweet Orange",
  "झिगूनी": "Ridge Gourd",
  "टाटे सिमी": "Broad Beans",
  "तरबुजा(हरियो)": "Watermelon (Green)",
  "ताजा माछा(छडी)": "Fresh Fish (Chhadi)",
  "ताजा माछा(बचुवा)": "Fresh Fish (Bachuwa)",
  "ताजा माछा(रहु)": "Fresh Fish (Rohu)",
  "तामा": "Bamboo Shoot",
  "तितो करेला": "Bitter Gourd",
  "तोफु": "Tofu",
  "तोरीको साग": "Mustard Greens",
  "नरिवल(काँचो)": "Coconut (Raw)",
  "नरिवल(हरियो)": "Coconut (Green)",
  "नासपाती(चाइनिज)": "Pear (Chinese)",
  "न्यूरो": "Fiddlehead Fern",
  "परवर(तराई)": "Pointed Gourd (Terai)",
  "परवर(लोकल)": "Pointed Gourd (Local)",
  "पार्सले": "Parsley",
  "पालूगो साग": "Spinach",
  "पिंडालू": "Taro Root",
  "पुदीना": "Mint",
  "प्याज सुकेको (भारतीय)": "Dried Onion (Indian)",
  "प्याज हरियो": "Green Onion",
  "फर्सी पाकेको": "Pumpkin (Ripe)",
  "फर्सी हरियो(लाम्चो)": "Green Pumpkin (Long)",
  "बन्दा(लोकल)": "Cabbage (Local)",
  "बोडी(तने)": "Cowpea (Yard Long Bean)",
  "ब्रोकाउली": "Broccoli",
  "भटमासकोशा": "Soybean Pods",
  "भन्टा डल्लो": "Eggplant (Round)",
  "भन्टा लाम्चो": "Eggplant (Long)",
  "भिण्डी": "Okra (Lady Finger)",
  "भुई कटहर": "Pineapple",
  "भेडे खु्र्सानी": "Capsicum (Bell Pepper)",
  "मकै बोडी": "Corn Beans",
  "मटरकोशा": "Green Peas",
  "माछा सुकेको": "Dried Fish",
  "मूला रातो": "Red Radish",
  "मेवा(नेपाली)": "Papaya (Nepali)",
  "मेवा(भारतीय)": "Papaya (Indian)",
  "राजा च्याउ": "King Mushroom",
  "रातो आलु(गोलो)": "Red Potato (Round)",
  "रातो बन्दा": "Red Cabbage",
  "रायो साग": "Mustard Leaves (Rayo)",
  "रुख कटहर": "Jackfruit",
  "लसुन सुकेको चाइनिज": "Garlic Dried (Chinese)",
  "लसुन सुकेको नेपाली": "Garlic Dried (Nepali)",
  "लसुन हरियो": "Green Garlic",
  "लीच्ची(भारतीय)": "Lychee (Indian)",
  "लीच्ची(लोकल)": "Lychee (Local)",
  "लौका": "Bottle Gourd",
  "सखरखण्ड": "Sweet Potato",
  "सजिवन": "Drumstick (Moringa)",
  "सिताके च्याउ": "Shiitake Mushroom",
  "सेतो मूला(हाइब्रीड)": "White Radish (Hybrid)",
  "सेलरी": "Celery",
  "सौफको साग": "Dill Leaves",
  "स्कूस": "Chayote (Squash)",
  "स्याउ(फूजी)": "Apple (Fuji)",
  "हरियो धनिया": "Coriander (Cilantro)",
  "हरियो फर्सी(डल्लो)": "Green Pumpkin (Round)",
};

// Build multiple lookup maps at module load time
// This handles Unicode normalization (NFC/NFD) differences and whitespace variations
const normalizedMapNFC: Map<string, string> = new Map();
const normalizedMapNFD: Map<string, string> = new Map();

for (const [key, value] of Object.entries(translations)) {
  const keyNFC = key.normalize("NFC").trim();
  const keyNFD = key.normalize("NFD").trim();
  normalizedMapNFC.set(keyNFC, value);
  normalizedMapNFD.set(keyNFD, value);
}

// Global logging for debugging
if (typeof window !== 'undefined') {
  (window as any).DEBUG_TRANSLATIONS = {
    total: Object.keys(translations).length,
    keys: Object.keys(translations).slice(0, 10),
    test: (name: string) => getEnglishName(name)
  };
  console.error('🔍 DEBUG_TRANSLATIONS loaded. Test with: DEBUG_TRANSLATIONS.test("अदुवा")');
}

export function getEnglishName(nepaliName: string): string {
  if (!nepaliName) return "";
  
  // Direct lookup first
  if (translations[nepaliName]) {
    return translations[nepaliName];
  }
  
  // Normalized lookups
  const trimmed = nepaliName.trim();
  const nfc = trimmed.normalize("NFC");
  const nfd = trimmed.normalize("NFD");
  
  // Try NFC map
  if (normalizedMapNFC.has(nfc)) {
    return normalizedMapNFC.get(nfc) || "";
  }
  
  // Try NFD map
  if (normalizedMapNFD.has(nfd)) {
    return normalizedMapNFD.get(nfd) || "";
  }
  
  // Last resort: try case-insensitive fuzzy matching
  for (const [key, value] of Object.entries(translations)) {
    if (key.trim().toLowerCase() === trimmed.toLowerCase()) {
      return value;
    }
  }
  
  return "";
}

export function searchMatches(nepaliName: string, searchTerm: string): boolean {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return true;
  
  // Normalize Nepali name for comparison
  const nepaliNormalized = nepaliName.trim().toLowerCase();
  const nepaliNFC = nepaliName.normalize("NFC").trim().toLowerCase();
  const nepaliNFD = nepaliName.normalize("NFD").trim().toLowerCase();
  const termNFC = searchTerm.normalize("NFC").toLowerCase().trim();
  const termNFD = searchTerm.normalize("NFD").toLowerCase().trim();
  
  // Match against Nepali name (with normalization)
  if (nepaliNormalized.includes(term)) return true;
  if (nepaliNFC.includes(termNFC)) return true;
  if (nepaliNFD.includes(termNFD)) return true;
  
  // Match against English translation
  const english = getEnglishName(nepaliName);
  if (english) {
    const englishLower = english.toLowerCase();
    if (englishLower.includes(term)) return true;
  }
  
  return false;
}

export default translations;
