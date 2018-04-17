const searchButton = document.querySelector(".search");
const input = document.querySelector('#search');
const results = document.querySelector("#results");

// Expand function
const expandForm = (element) => {
  searchButton.classList.toggle("close");
  input.classList.toggle("square");
  results.classList.add("hidden");
  if (searchButton.classList.contains("close")) {
    input.focus();
  } else {
    input.blur();
  }
};
document.querySelector("button").addEventListener("click", expandForm);

// AJAX Autocomplete Search
const drawResponseList = (data) => {
  results.innerHTML = '';
  data.words.forEach((word) => {
    results.classList.remove("hidden");
    results.insertAdjacentHTML('beforeend', `<li><a href="http://www.dictionary.com/browse/${word}" target="_blank">${word}</a></li>`);
  });
};
const autocomplete = (e) => {
  fetch(`https://wagon-dictionary.herokuapp.com/autocomplete/${e.target.value}`)
    .then(response => response.json())
    .then(data => drawResponseList(data));
};
input.addEventListener('keyup', autocomplete);
