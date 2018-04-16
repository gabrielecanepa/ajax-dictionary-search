// tippy(searchButton, {
//   arrow: true,
//   arrowType: 'round',
//   animation: 'perspective',
//   distance: 15
// })

const tooltip = document.getElementById("tippy");
searchButton.addEventListener('click', function(){
  tooltip.classList.add("hide");
  tooltip.querySelector('#tippy .tippy-tooltip.dark-theme').style.transform = "translateX(100px) translateY(-10px)";
  tooltip.querySelector('#tippy .tippy-roundarrow').style.left = "10px";
  tooltip.querySelector('.tippy-content').textContent = 'Enjoy! 🔎';
});

const infoButton = document.getElementById("info");
tippy(infoButton, {
  arrow: true,
  distance: 15,
  html: '#infoTooltip',
  theme: 'info',
  trigger: 'click',
  interactive: true,
  animation: 'perspective'
});
