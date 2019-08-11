//The array that holds all of the cubes
var cubes = null;

//The script to generate the cubes
function generate() {
    //Randomising the hue of each colour set
    cube_color1 = random(360);
    cube_color2 = random(360);

    //Flushes out all previous generated div's for preformance
    //Checking if this is the first instance of the generate() function being called
    if (cubes != null) {
        //Looping through all cubes
        for (var i = 0; i < cubes.length; i++) {
            //Removing the div of the indexed cube from the DOM
            cubes[i].div.remove();
        }
    }

    //Wiping the current array of cubes and recreating a fresh blank slate
    cubes = new Array(num_of_cubes);

    //Assigning the background element to the var name of plane to be used later on
    var plane = document.getElementById('background');
    //Looping through all the slots for the new cubes and generating new ones
    for (var i = 0; i < cubes.length; i++) {
        //Initialising cube object
        var cube = new Object();
        //Setting the cubes width
        cube.width = min_width + random(max_width - min_width);
        //Setting the cubes height
        cube.height = min_height + random(max_height - min_height);
        //Setting the cubes x position
        cube.x = random(max_x - cube.width) + 30;
        //Setting the cubes y position
        cube.y = random((max_y - cube.height)) + Math.floor(document.documentElement.clientHeight * 0.14) + 15;

        //Calculating the x value of the center point of the cube (will be used for mouse tracking)
        cube.cp_x = cube.x + Math.round(cube.width / 2);
        //Calculating the y value of the center point of the cube (will be used for mouse tracking)
        cube.cp_y = cube.y + Math.round(cube.height / 2);

        //Creating the div to represent the values of the cube
        cube.div = document.createElement("DIV");
        //Setting the class of the DIV to .cube in order to inherit the styling from the css
        cube.div.className = "cube";
        //Creating the unique id of the cube to that the special styling may be applied
        cube.div.id = i;
        //Adding the div to the #background element
        plane.appendChild(cube.div);

        //Assigning the variable div to the current cube element with JQuery formatting for ease
        var div = $('.cube#' + i);

        //Setting the calculated width to the div
        div.css("width", cube.width + "px");
        //Setting the calculated height to the div
        div.css("height", cube.height + "px");
        //Setting the calculated x position to the div
        div.css("left", cube.x + "px");
        //Setting the calculated y position to the div
        div.css("top", cube.y + "px");

        //If clause detecting the quartile of the current cube within the set of cubes
        //in order to apply the apropriate colour set
        if (i < num_of_cubes / 4) {
            //0 <= x < 25%
            cube.color = cube_color1;
        } else if (i < num_of_cubes / 2) {
            //25% <= x < 50%
            cube.color = cube_color2;
        } else if (i < num_of_cubes - (num_of_cubes / 4)) {
            //50% <= x < 75%
            cube.color = cube_color1;
        } else {
            //75% <= x <= 100%
            cube.color = cube_color2;
        }

        //Generating the unique brightness of the current cube
        cube.brightness = 50 + random(25);
        //Setting the default background colour of the cube (when not hovered near aka. fully desaturated)
        div.css("background-color", "hsl(" + cube.color + ", 0%, " + cube.brightness + "%)");

        //Adds the completed cube to the array for later reference
        cubes[i] = cube;
    }

    //Runs the script ran when a mouse movement is detected in order to make the transition more fluid
    mouseMove(prev_mouse_x, prev_mouse_y);

    //Changing the background colour of the colour trackers in the header
    //Colour 1 (left)
    $('#color1').css("background-color", "hsl(" + cube_color2 + ", 100%, 60%)");
    //Colour 2 (right)
    $('#color2').css("background-color", "hsl(" + cube_color1 + ", 100%, 60%)");

    //Changing the text representing the hexidecimal of the average colour of the given colourset
    //Colour 1 (left)
    document.getElementById('color1_text').value = hslToHex(cube_color2, 100, 60);
    //Colour 2 (right)
    document.getElementById('color2_text').value = hslToHex(cube_color1, 100, 60);
}

//Variable tracking the state of the page
var night = false;
//Function toggling the state of the page
function toggle_night() {
    //Detecting the current state of the page
    if (!night) {
        //Toggling the icon displayed on the header
        $('#sun').css("display", "none");
        $('#moon').css("display", "block");
        //Toggle colours on user prompt
        $('#overlay div').css("color", "#2d3436");
        $('#overlay div').css("background", "#FBFAF8");
        //Setting the background colour of the site
        $('body').css("background-color", "#2d3436");
        //Setting the state of the site
        night = true;
    } else {
        //Toggling the icon displayed on the header
        $('#moon').css("display", "none");
        $('#sun').css("display", "block");
        //Toggle colours on user prompt
        $('#overlay div').css("color", "#FBFAF8");
        $('#overlay div').css("background", "#2d3436");
        //Setting the background colour of the site
        $('body').css("background-color", "#FBFAF8");
        //Setting the state of the site
        night = false;
    }
}

/*
//Brief on a possible future automatic version of nightmode
//Has promise but the average is not acurate with vastly different colors
//also the average is far more likely to be within the middle of the spectrum and thus dark mode is more common
var night;
var avg_color = (cube_color1 + cube_color2) / 2;
if (avg_color <= 90 || avg_color > 270) {
    night = true; //inverse
} else {night = false}

//requires: toggle_night(); at the end of the script
*/
