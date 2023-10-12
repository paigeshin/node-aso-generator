function extractKeywords(titlesArray, exstingKeywordsArray, keywordsArray) {
  let existingKeywords = [...exstingKeywordsArray];
  let trackedKeywords = [];
  let resultKeywords = [];

  // extract all words from titles and subtitles
  titlesArray.forEach((item) => {
    existingKeywords = existingKeywords.concat(
      ...item.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" "),
      ...item.subtitle
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" ")
    );
  });

  let keywords = shuffled(keywordsArray);
  keywords = redundantPluralsRemoved(keywords);

  keywords.forEach((keyword) => {
    const currentKeywords = keyword
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ");

    const totalKeywordsCount = resultKeywords.join(",").length;
    const totalCurrentKeywordsCount = currentKeywords.join(",").length;

    // Check if any word in currentKeywords is in extractedTitles or resultKeywords
    const anyWordExists = currentKeywords.some(
      (word) => existingKeywords.includes(word) || resultKeywords.includes(word)
    );

    if (anyWordExists) {
      return;
    }

    // If totalWordCount + charCount exceeds 100 or any word exists, skip the currentKeywords
    if (totalKeywordsCount + totalCurrentKeywordsCount > 100) {
      return;
    }

    let tempArrays = [
      ...resultKeywords,
      ...currentKeywords,
      ...existingKeywords,
    ];
    if (hasRedundantPlurals(tempArrays)) {
      return;
    }

    resultKeywords.push(...currentKeywords);
    trackedKeywords.push(keyword);
  });

  return {
    result: resultKeywords,
    trackedKeywords: trackedKeywords,
    wordCount: resultKeywords.reduce((acc, word) => acc + word.length, 0),
  };
}

function shuffled(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function redundantPluralsRemoved(arr) {
  const result = [];
  const seenWords = new Set();

  // Sort so singular comes before plural
  arr.sort();

  for (const word of arr) {
    if (seenWords.has(word)) continue; // If this word was processed, skip

    if (arr.includes(word + "s")) {
      result.push(word);
      seenWords.add(word);
      seenWords.add(word + "s"); // Mark both singular and plural as seen
    } else {
      result.push(word);
      seenWords.add(word);
    }
  }

  return result;
}

function hasRedundantPlurals(arr) {
  for (const word of arr) {
    if (arr.includes(word) && arr.includes(word + "s")) {
      return true;
    }
  }
  return false;
}

function duplicatesRemoved(arr) {
  return [...new Set(arr)];
}

const inputTitles = [
  {
    title: "Spiritual Awakening - Grow",
    subtitle: "Wish list,Self-esteem,Inner Me",
  },
  {
    title: "SpiritualAwakening",
    subtitle: "Self-love,Talking App,Breezer",
  },
];

const inputKeywords = [
  "mindshift",
  "manifestation",
  "affirmation",
  "self love",
  "affirmations for women",
  "daily affirmation motivation free",
  "positive affirmations daily free",
  "ptsd",
  "mindbloom",
  "panic attack",
  "tapping",
  "procrastination",
  "nerva",
  "hypnosis for losing weight",
  "positive focus",
  "ptsd coach",
  "curable",
  "breathing",
  "oak",
  "christian meditation",
  "mesmerize",
  "calming",
  "affirmation reminder",
  "positive affirmtions",
  "inspiration",
  "manifestation journal",
  "thinkup",
  "subliminal",
  "manifestie",
  "loving kindness",
  "free daily affirmation",
  "manifest affirmations",
  "law of attraction",
  "daily motivation",
  "free affirmations",
  "affirmations for women",
  "think up",
  "the secret",
  "quotes widget",
  "love quotes",
  "healing",
  "daily om",
  "affirmation",
  "self improvement",
  "quote",
  "manifestation",
  "innertune",
  "therapy notes",
  "self help",
  "better me now",
  "affirmation widget",
  "motivational quotes",
  "daily quotes",
  "positive daily affirmations",
  "quotex",
  "sensa",
  "help",
  "depression",
  "affirmations for women free",
  "motivational quotes",
  "mantra",
  "girlhood",
  "manifest app",
  "manifestie",
  "positive affirmations",
  "affirmations",
  "mobile manifest",
];

const existingKeywords = [
  "affirmation",
  "breathing",
  "calming",
  "christian",
  "meditation",
  "curable",
  "daily",
  "motivation",
  "depression",
  "girlhood",
  "help",
  "healing",
  "hypnosis",
  "for",
  "losing",
  "weight",
  "innertune",
  "inspiration",
  "law",
  "of",
  "attraction",
  "love",
  "quotes",
  "manifest",
  "app",
];

const result = extractKeywords(
  inputTitles,
  existingKeywords,
  shuffled(inputKeywords)
);
console.log(`Result: ${result.result}`);
console.log(`Tracked Keywords: ${result.trackedKeywords}`);
console.log(`World Count: ${result.wordCount}`);
