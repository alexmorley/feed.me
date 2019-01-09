"use strict"

function Tabs() {
  let active = {
    favourites: true,
    filter: false,
    search: false
  }
  let switches = {
  }
  function activateFavourites() {
    active.favourites = true;
    active.filter = false;
    active.search = false;
    updateDisplay();
  }
  function activateFilter() {
    active.favourites = false;
    active.filter = true;
    active.search = false;
    updateDisplay();
  }
  function activateSearch() {
    active.favourites = false;
    active.filter = false;
    active.search = true;
    updateDisplay();
  }
  function updateDisplay() {
    Object.keys(active).forEach((key,i,arr) => {
      var el = document.getElementById("page-"+key);
      if(active[key]) {
        el.style.display = "block";
        try {switches[key].turnOn();} catch {}
      } else {
        el.style.display = "none";
        try {switches[key].turnOff();} catch {}
      }
    });
  };
  updateDisplay();
  return {
    active,
    activateFavourites,
    activateFilter,
    activateSearch,
    switches,
    updateDisplay
  }
}

function Switch(inner,outer) {
  let x = 0
  inner.style["transition-duration"] = "0.1s";
  inner.style.fill = "darkred";
  function flip() {
    if (!(x)) {
      x = 1 
      inner.style.transform = "translateX(-165px)";
      inner.style.fill = "green";
    } else {
      x = 0
      inner.style.transform = "translateX(0px)";
      inner.style.fill = "darkred";
    }
  }
  return {
    flip
  }
}

function AbstractSwitch(element,color,x) {
  x = x + 0
  element.style["transition-duration"] = "0.1s";
  if (x) {
    turnOn();
  } else {
    turnOff();
  }
  function turnOn() {
    x = 1
    element.style.fill = color;
  }
  function turnOff () {
    x = 0
    element.style.fill = "white";
  }
  return {
    turnOn,
    turnOff
  }
}

/* Main */
window.addEventListener("load", function() {
  // On off switch
  var svgObject = document.getElementById("switch").children[0].contentDocument;
  var inner = svgObject.getElementById('inner');
  var outer = svgObject.getElementById('outer');
  var switch_icon = Switch(inner,outer);
  inner.onclick = switch_icon.flip;
  outer.onclick = switch_icon.flip;

  // tab switching
  var tabs = Tabs();
  var svgObject = document.getElementById("favourites").children[0].contentDocument;
  var path = svgObject.getElementById('star');
  tabs.switches.favourites = AbstractSwitch(path, "gold", tabs.active.favourites);
  path.onclick = tabs.activateFavourites;

  var svgObject = document.getElementById("filter").children[0].contentDocument;
  var path = svgObject.getElementById('funnel');
  tabs.switches.filter = AbstractSwitch(path, "grey", tabs.active.filter);
  path.onclick = tabs.activateFilter;

  var svgObject = document.getElementById("search").children[0].contentDocument;
  var path = svgObject.getElementById('search');
  tabs.switches.search = AbstractSwitch(path, "grey", tabs.active.search);
  path.onclick = tabs.activateSearch;
});
