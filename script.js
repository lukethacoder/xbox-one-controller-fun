
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

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
    // var leftMargin = document.createElement("select");
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
    console.log('controllerAxixX', controllerAxixX)
    var controllerAxixY = Math.round(controller.axes[1] * 8) * 2;

    var elementAxisX = Math.round( Number(bg.style.left.slice(0, -2)));
    console.log('elementAxisX', elementAxisX)
    var elementAxisY = Math.round( Number(bg.style.top.slice(0, -2)));

    if (elementAxisX === 0) {
      elementAxisX = 10
    }
    if (elementAxisY === 0) {
      elementAxisY = 10
    }

    var elementScale = bg.getAttribute('valueS');

    // SCALE
    if (controller.buttons[6].pressed) {
      console.log('btn pressed 6', controller.buttons)
      var currentScale = Number(bg.style.transform.slice(6, -1));
      if (currentScale === 0) {
        currentScale = 0.01;
      }
      console.log('Number(bg.style.transform.slice(6, -1))', currentScale);
      bg.style.transform = "scale(" + (currentScale - 0.01) + ')';
      bg.setAttribute("valueS", currentScale);
    }
    if (controller.buttons[7].pressed) {
      // console.log('btn pressed 7', controller.buttons)
      var currentScale = Number(bg.style.transform.slice(6, -1));
      if (currentScale === 0) {
        currentScale = 0.01;
      }
      console.log('Number(bg.style.transform.slice(6, -1))', currentScale);
      bg.style.transform = "scale(" + (currentScale + 0.01) + ')';
      bg.setAttribute("valueS", currentScale);
    }

    // checks if current element position and new value from controller match and the apply new style according
    if (elementAxisX !== controllerAxixX) {
      var newXVal = 0;

      newXVal = elementAxisX + controllerAxixX;
      bg.setAttribute("valueX", newXVal + 'px');

      // get new value and updates element style
      bg.style.left = bg.getAttribute("valueX");
      
    } else {
      console.warn('DOES NOT EQUAL')
    }

    // checks if current element position and new value from controller match and the apply new style according
    if (elementAxisY !== controllerAxixY) {
      var newYVal = 0;
      
      newYVal = elementAxisY + controllerAxixY;
      bg.setAttribute("valueY", newYVal + 'px');

      // get new value and updates element style
      bg.style.top = bg.getAttribute("valueY");
      
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
