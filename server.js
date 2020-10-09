const { animals } = require('./data/animals');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
     // Save personalityTraits as a dedicated array.
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
     
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    } if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    } if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    } 
    return filteredResults;
  };

app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});