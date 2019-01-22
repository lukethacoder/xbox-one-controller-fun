
var wallys = [
  {
    'name': 'The Unfriendly Giants',
    'source': 'the-unfriendly-giants.jpg'
  },
  {
    'name': 'Smmm! This is a Silent Movie',
    'source': 'smmm-this-is-a-silent-movie.jpg'
  },
  {
    'name': 'Robin Hoods Merry Mess Up',
    'source': 'robin-hoods-merry-mess-up.jpg'
  },
  {
    'name': 'The Knights of the Magic Flag',
    'source': 'the-knights-of-the-magic-flag.jpg'
  },
  {
    'name': 'Zalando Festival',
    'source': 'zalando-festival-map.jpg'
  }
];

// wallys.forEach(element => {
//   console.log('element', element);
//   var thumbnail_display = document.getElementById('thumbnail_display');

//   var item_div = document.createElement("div");
  
//   var item_name = document.createElement("h3");
//   item_name.appendChild(document.createTextNode("name: " + element.name));
//   item_div.appendChild(item_name);

//   thumbnail_display.appendChild(item_div);
// });


var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var bg_index = 0;
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;


var btn_14_timestamp = new Date();
var btn_15_timestamp = new Date();

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  var bg = document.getElementById("background_image_container")
  bg.setAttribute("valueY", 12);
  bg.setAttribute("valueX", 12);
  bg.setAttribute("valueS", 1);
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (i=0; i<gamepad.axes.length; i++) {
    e = document.createElement("meter");
    e.className = "axis";
    //e.id = "a" + i;
    // var rightMargin = document.createElement("select");
    e.setAttribute("min", "-1");
    e.setAttribute("max", "1");
    e.setAttribute("value", "0");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();

  // get current dataAttr val
  // convert to number
  // check if same as last time (break?)
  // append to css style

  // console.log('controllers', controllers[0].axes)
  
  

  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);

    var bg = document.getElementById("background_image_container")
    var buttons = d.getElementsByClassName("button");
    var currentX = Number(bg.getAttribute('valuex'));
    // console.log(currentX)
    var currentY = Number(bg.getAttribute('valuey'));
    if (currentX === 0) {
      currentX = 0.1;
      // console.log(currentX)
    }
    if (currentY === 0) {
      currentY = 0.1;
    }
    var controllerAxixX = Math.round(controller.axes[0] * 8) * 2;
    // console.log('controllerAxixX', controllerAxixX)
    var controllerAxixY = Math.round(controller.axes[1] * 8) * 2;

    var elementAxisX = Math.round( Number(bg.style.right.slice(0, -2)));
    // console.log('elementAxisX', elementAxisX)
    var elementAxisY = Math.round( Number(bg.style.bottom.slice(0, -2)));

    if (elementAxisX === 0) {
      elementAxisX = 10
    }
    if (elementAxisY === 0) {
      elementAxisY = 10
    }

    var elementScale = bg.getAttribute('valueS');

    // CHANGE BG IMAGE 

    // console.log('Math.round(btn_14_timestamp * 10)', Math.round(btn_14_timestamp.getSeconds() * 100) / 10);
    // console.log('Math.round(new Date().getSeconds * 10)', Math.round(new Date().getSeconds() * 100) / 10);

    if ( (Math.round(btn_14_timestamp.getSeconds()) / 10) !== (Math.round(new Date().getSeconds()) / 10)) {
      console.log('btn_14_timestamp', btn_14_timestamp.getSeconds() * 10)
      btn_14_timestamp = new Date();

      // if (controller.buttons[14].pressed) {
      //   console.log('btn 4 - bg_index', bg_index)
        

      //   if (bg_index !== 0) {
      //     bg_index = bg_index - 1;
      //     var img = document.getElementById("background_image")
      //     img.src = './wallys/' + wallys[bg_index].source;
      //     console.log('./wallys/' + wallys[bg_index].source)
      //     btn_14_timestamp = new Date().getSeconds;
      //   }
      // }
    } else {
      if (controller.buttons[14].pressed) {
        console.log('btn 4 - bg_index', bg_index)
        

        if (bg_index !== 0) {
          bg_index = bg_index - 1;
          var img = document.getElementById("background_image")
          img.src = './wallys/' + wallys[bg_index].source;
          console.log('./wallys/' + wallys[bg_index].source)
          btn_14_timestamp = new Date().getSeconds;
        }
      }
    }
    if (Math.round(btn_15_timestamp * 100) === Math.round(new Date().getSeconds * 100)) {
      console.log('btn_15_timestamp', btn_15_timestamp)
      if (controller.buttons[15].pressed) {
        console.log('btn 5 - bg_index', bg_index)
        if (bg_index !== (wallys.length - 1)) {
          bg_index = bg_index + 1;
          var img = document.getElementById("background_image")
          img.src = './wallys/' + wallys[bg_index].source;
          console.log('./wallys/' + wallys[bg_index].source)
          btn_15_timestamp = new Date().getSeconds;
        }
      }
    }

    // SCALE
    if (controller.buttons[6].pressed) {
      console.log('btn pressed 6', controller.buttons)
      var currentScale = Number(bg.style.transform.slice(6, -1));
      console.log('currentScale', currentScale)
      if (currentScale === 1) {
        currentScale = 0.95;
      }
      if (currentScale === 0) {
        currentScale = 0.05;
      }

      var newScale = Number(elementScale) - 0.01;
      
      console.log('currentScale', currentScale);
      console.log('newScale', newScale);
      bg.style.transform = "scale(" + newScale + ')';
      bg.setAttribute("valueS", newScale);
    }
    if (controller.buttons[7].pressed) {

      console.log('btn pressed 7', controller.buttons)
      var currentScale = Number(bg.style.transform.slice(6, -1));
      console.log('currentScale', currentScale)
      if (currentScale === 1) {
        currentScale = 0.95;
      }
      if (currentScale === 0) {
        currentScale = 0.05;
      }

      var newScale = Number(elementScale) + 0.01;
      
      console.log('currentScale', currentScale);
      console.log('newScale', newScale);
      bg.style.transform = "scale(" + newScale + ')';
      bg.setAttribute("valueS", newScale);


      // OLD //
      // console.log('btn pressed 7', controller.buttons)
      // var currentScale = Number(bg.style.transform.slice(6, -1));
      // if (currentScale === 0) {
      //   currentScale = 0.01;
      // }
      // // console.log('Number(bg.style.transform.slice(6, -1))', currentScale);
      // bg.style.transform = "scale(" + (currentScale + 0.01) + ')';
      // bg.setAttribute("valueS", currentScale);
    }

    // checks if current element position and new value from controller match and the apply new style according
    if (elementAxisX !== controllerAxixX) {
      var newXVal = 0;

      newXVal = elementAxisX + controllerAxixX;
      bg.setAttribute("valueX", newXVal + 'px');

      // get new value and updates element style
      bg.style.right = bg.getAttribute("valueX");
      
    } else {
      console.warn('DOES NOT EQUAL')
    }

    // checks if current element position and new value from controller match and the apply new style according
    if (elementAxisY !== controllerAxixY) {
      var newYVal = 0;
      
      newYVal = elementAxisY + controllerAxixY;
      bg.setAttribute("valueY", newYVal + 'px');

      // get new value and updates element style
      bg.style.bottom = bg.getAttribute("valueY");
      
    } else {
      console.warn('DOES NOT EQUAL')
    }
    
    // if (bg.getAttribute("valueY") !== controllerAxixY) {

    // } else {
    //   console.warn('DOES NOT EQUAL')
    // }
    


    // bg.style.backgroundPositionX = ( (controller.axes[0] * 10000000000000000000000000000000000) / currentX ) + "px";
    // bg.style.backgroundPositionY = ( (controller.axes[1] * 10000000000000000000000000000000000) / currentY ) + "px";
    // console.log(controller.axes[1])
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (var i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i]);
    }
  }
  rAF(updateStatus);
}

function scangamepads() {
  // console.warn('scan game pad')
  
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addgamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthandler);
  window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 500000000000000000000000000000000);
}
