// Store weights for each letter across function calls
const letterWeights = new Map();

function randomizeLetterWeights() {
  // Get all h1 elements with class "title"
  const titles = document.querySelectorAll('h1.title');
  
  // Process each title sequentially
  titles.forEach((title, titleIndex) => {
    const text = title.textContent;
    const letters = text.split('');
    
    // Create a unique key for this title
    const titleKey = `title_${titleIndex}`;
    
    // Initialize weights for this title if not exists
    if (!letterWeights.has(titleKey)) {
      letterWeights.set(titleKey, new Array(letters.length).fill(200));
    }
    
    // Clear the title
    title.innerHTML = '';
    
    // Create spans for each letter
    const letterSpans = letters.map((letter, index) => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      title.appendChild(letterSpan);
      return letterSpan;
    });
    
    // Apply weights sequentially with sweep effect
    letters.forEach((letter, index) => {
      setTimeout(() => {
        // Generate new random weight (200-700)
        const weight = Math.floor(Math.random() * 501) + 200;
        
        // Store the weight for this letter
        const titleWeights = letterWeights.get(titleKey);
        titleWeights[index] = weight;
        letterWeights.set(titleKey, titleWeights);
        
        // Apply the weight
        letterSpans[index].style.fontWeight = weight;
      }, index * 100); // 100ms delay between each letter
    });
  });
}

// Run immediately with sweep effect
randomizeLetterWeights();

// Update every 5 seconds with sweep effect
setInterval(randomizeLetterWeights, 5000);
