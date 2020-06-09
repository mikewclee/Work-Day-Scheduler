$(document).ready(function () {

    // Set currentDay date and time 
    setInterval(function () {
        var todayDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        // console.log(todayDate);
        $('#currentDay').html(todayDate);
    }, 1000);

    var timeBlocks = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

    //loop to setup timeblocks 9am to 5pm
    for (var i = 0; i < timeBlocks.length; i++) {
        // console.log(timeBlocks[i]);
        var newRow = $(`<div class = 'row'></div>`).attr({ id: "row" + (i) });
        $('.container').append(newRow);
        var hourly = $(`<div class = 'col-2 time-block' mx auto>`).append(timeBlocks[i]);
        var inputBox = $(`<input type='text' class='col-9' placeholder = "Add event"> </input>`).attr({ id: "inputBox" + (i)});
        var saveBtn = $(`<button class='col-1 btn btn-success saveBtn'> Save </button>`).attr({ id: "button" + (i) });
        $(newRow).append(hourly, inputBox, saveBtn);

        //compared 9am to current time.
        var currentTime = moment().hour();  //get current hour as integer
        var calendarTime = (9 + i);  //set calendar time to integer 9
        // console.log("Current Hour: " + currentTime);
        // console.log("Calendar time: " + calendarTime);
        if (currentTime < calendarTime) {
            $("#inputBox" + (i)).addClass("future");
        }
        else if (currentTime > calendarTime) {
            $("#inputBox" + (i)).addClass("past");
        }
        else {
            $("#inputBox" + (i)).addClass("present");
        }

    };

    // add event to local storage 
    $("button").click(function(){
        event.preventDefault();
        var currentID = $(this).attr('id'); //button1
        console.log(currentID);
        var toStore = $(('#inputBox')).value; //get value from inputBox
        console.log('store value =' + toStore);
        localStorage.setItem("myEvent" + currentID, toStore); //store value from inputBox

    });


    function clear() {
        $("#inputBox").empty();
      }

});