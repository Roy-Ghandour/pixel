//Variable containing the latest recorded x position of the mouse
var prev_mouse_x;
//Variable containing the latest recorded y position of the mouse
var prev_mouse_y;

//Script played when mouse movement is detected
function mouseMove(mouse_x, mouse_y) {
    //Looping through all current cubes
    for (var i = 0; i < cubes.length; i++) {
        //Calculating the distance between the x position of the center point of indexed cube
        //and the x position of the cursor
        var x_dist = cubes[i].cp_x - Math.round(mouse_x);
        //Calculating the distance between the y position of the center point of indexed cube
        //and the y position of the cursor
        var y_dist = cubes[i].cp_y - Math.round(mouse_y);

        //Note: The algorythym uses pythagorases theorem to calculate the distance between two points,
        //therefore the distances calculated above being negative will not matter after being squared
        //in the next step

        //Squaring the distance between the two x positions
        x_dist = x_dist * x_dist;
        //Squaring the distance between the two y positions
        y_dist = y_dist * y_dist;

        //Calculating the final distance (hypotenuse) of the two points
        var distance = Math.round(Math.sqrt(x_dist + y_dist));

        //Changing the colours of the cube based on the distance calculated above
        //Checking for the minimum distance of 200 pixels
        if (distance <= 200) {
            //Inverting the distance value to represent the percentage of saturation
            //Eg. 200 + (160 * -1) -> 200 - 160 -> 40% -> with the cursor 160px away the
            //cube will be at 40% saturation
            var sat = 200 + (distance * -1);
            //Both capping the stauration % at 100 and enforcing that any cube within 100px
            //of the cursor will be 100% saturated
            if (sat > 100) sat = 100;
            //Updating the colour of the div of the given cube
            $(".cube#" + i).css("background-color", "hsl(" + cubes[i].color + ", " + sat + "%, " + (cubes[i].brightness + 10) + "%)");
        } else {
            //Resetting the colour of the cube to fully desaturated, this would help prevent
            //the phenomenon of 'ghosting' where the cubes would retain some saturation due
            //to the cursor moving too fast for the saturation to be accuratley calculated
            $(".cube#" + i).css("background-color", "hsl(" + cubes[i].color + ", 0%, " + cubes[i].brightness + "%)");
        }
    }
}

//Mouse movment listener
(function() {
    "use strict";

    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

            // If pageX/Y aren't available and clientX/Y
            // are, calculate pageX/Y - logic taken from jQuery
            // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    //Script:
    //Recording the previous mouse x position
    prev_mouse_x = event.pageX;
    //Recording the previous mouse y position
    prev_mouse_y = event.pageY;
    //Running the script above with gathered x and y position
    mouseMove(event.pageX, event.pageY);
  }
})();
