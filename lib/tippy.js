// tippy(searchButton, {
//   arrow: true,
//   arrowType: 'round',
//   animation: 'perspective',
//   distance: 15
// })

const tooltip = document.getElementById("tippy");
searchButton.addEventListener('click', function(){
  tooltip.classList.add("hide");
});

const infoButton = document.getElementById("info");
tippy(infoButton, {
  arrow: true,
  distance: 15,
  html: '#infoTooltip',
  theme: 'info',
  trigger: 'click',
  interactive: true
})
