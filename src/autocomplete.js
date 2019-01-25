const content = document.getElementById('content');
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
      <span>
        ${word}<img src="img/wheels.svg" class="wheels hidden">
      </span>
    </li>
    `
  ));
};

const drawWordDefinitions = (word) => {
  definitionsList.innerHTML = '';
  definitionsList.classList.remove('hidden');

  fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word.innerText}&lang=en`)
    .then(response => response.json())
    .then((definitions) => {
    definitionsList.innerHTML = '';
    if (word.hasAttribute('active')) {
      definitions.forEach((definition) => {
        definitionsList.insertAdjacentHTML('beforeend', `
        <li id="${definition.word}">
          <span style="font-size: 1.2em">${definition.word}</span> <small style="opacity: 0.9">${definition.phonetic ? definition.phonetic : ''}</small>
        </li>
        `);
        Object.keys(definition.meaning).forEach((meaning) => {
          const wordDefinition = definition.meaning[meaning][0].definition;

          document.getElementById(definition.word).insertAdjacentHTML('beforeend', `
          <p>
            <span style="font-size: 0.8em; opacity: 0.9">${meaning}</span>
            ${wordDefinition ? wordDefinition : ''}
          </p>
          `);
        });
      });
      word.querySelector('.wheels').classList.add('hidden');
    }
  })
  .catch(() => {
    if (word.hasAttribute('active')) {
      definitionsList.innerHTML = `
      <p>
        Can't find any definition of <span style="font-size: 1.15em">${word.innerText}</span> <span style="font-size: 1.8em">🤷🏼‍♂️</span>
      </p>
      `;
      word.querySelector('.wheels').classList.add('hidden');
    }
  })
}

const autocomplete = (event) => {
  fetch(`https://wagon-dictionary.herokuapp.com/autocomplete/${event.target.value}`)
    .then(response => response.json())
    .then((data) => {
      const words = data.words || [];
      if (words.length > 0) {
        drawWordsList(words);
        document.querySelectorAll('#results li span').forEach((word) => {
          const wheels = word.querySelector('.wheels');

          word.addEventListener('mouseover', () => {
            word.setAttribute('active', '');
            wheels.classList.remove('hidden');
            drawWordDefinitions(word);
          });
          word.addEventListener('mouseout', () => {
            word.removeAttribute('active');
            wheels.classList.add('hidden');
            definitionsList.innerHTML = '';
          });
        });
      } else if (words !== '') {
        resultsList.innerHTML = `
        <p>
          No results found for <span style="font-size: 1.15em">${event.target.value}</span> <span style="font-size: 1.8em">🤷🏼‍♂️</span>
        </p>
        `;
        definitionsList.innerHTML = '';
      } else {
        resultsList.innerHTML = '';
        definitionsList.innerHTML = '';
      }
    })
};

// Allow :active styles
document.addEventListener('touchstart', () => {}, true);

content.addEventListener('submit', event => event.preventDefault());
searchButton.addEventListener('click', expandForm);
searchInput.addEventListener('keyup', autocomplete);
