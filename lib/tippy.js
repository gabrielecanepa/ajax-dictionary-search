// tippy(searchButton, {
//   arrow: true,
//   arrowType: 'round',
//   animation: 'perspective',
//   distance: 15
// })

const tooltip = document.getElementById("tippy");

searchButton.addEventListener('click', (event) => {
  tooltip.style.visibility = 'hidden';
});
