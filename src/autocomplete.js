const searchButton = document.querySelector('button.search');
const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');
const definitionsList = document.getElementById('definitions');

const expandForm = () => {
  resultsList.classList.add('hidden');
  definitionsList.classList.add('hidden');

  searchButton.classList.toggle('close');
  searchInput.classList.toggle('square');
  if (searchButton.classList.contains('close')) {
    searchInput.focus();
  } else {
    searchInput.blur();
  }
};

const drawWordsList = (words) => {
  resultsList.innerHTML = '';
  resultsList.classList.remove('hidden');

  words.forEach(word => resultsList.insertAdjacentHTML('beforeend', `
    <li>
      <span>${word}</span>
      <img src="img/wheels.svg" class="wheels hidden">
    </li>
    `
  ));
};

const drawWordDefinitions = (wordList) => {
  const word = wordList.querySelector('span').innerText;
  definitionsList.innerHTML = '';
  definitionsList.classList.remove('hidden');

  fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`)
    .then(response => response.json())
    .then((definitions) => {
      definitionsList.innerHTML = '';
      definitions.forEach((definition) => {
        definitionsList.insertAdjacentHTML('beforeend', `
          <li id="${definition.word}">
            <span style="font-size: 1.2em">${definition.word}</span> <small>${definition.phonetic ? definition.phonetic : ''}</small>
          </li>
        `);
        Object.keys(definition.meaning).forEach((meaning) => {
          const wordDefinition = definition.meaning[meaning][0].definition;

          document.getElementById(definition.word).insertAdjacentHTML('beforeend', `
            <p>
              <span style="font-size: 0.8em">${meaning}</span>
              ${wordDefinition ? wordDefinition : ''}
            </p>
          `);
        });
      });
      wordList.querySelector('.wheels').classList.add('hidden');
    })
    .catch(() => {
      definitionsList.innerHTML = `
        <p>
          Can't find any definition of <em>${word}</em> <span style="font-size: 1.8em">🤷🏼‍♂️</span>
        </p>
      `;
      wordList.querySelector('.wheels').classList.add('hidden');
    })
}

const autocomplete = (event) => {
  fetch(`https://wagon-dictionary.herokuapp.com/autocomplete/${event.target.value}`)
    .then(response => response.json())
    .then((data) => {
      const words = data.words || '';
      if (words.length > 0) {
        drawWordsList(words);
        document.querySelectorAll('#results li').forEach((wordList) => {
          const wheels = wordList.querySelector('.wheels');

          wordList.addEventListener('mouseenter', () => {
            definitionsList.innerHTML = '';
            wheels.classList.remove('hidden');
            drawWordDefinitions(wordList);
          });
          wordList.addEventListener('mouseout', () => {
            wheels.classList.add('hidden');
            definitionsList.innerHTML = '';
          });
        });
      } else if (words !== '') {
        resultsList.innerHTML = `
        <p>
          No results found for <em>${event.target.value}</em> <span style="font-size: 1.8em">🤷🏼‍♂️</span>
        </p>
        `;
        definitionsList.innerHTML = '';
      } else {
        resultsList.innerHTML = '';
        definitionsList.innerHTML = '';
      }
    })
};

searchButton.addEventListener('click', expandForm);
searchInput.addEventListener('keyup', autocomplete);
