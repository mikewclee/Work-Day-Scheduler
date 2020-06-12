$(document).ready(function () {
    // Set currentDay date and time 
    setInterval(function () {
        var todayDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        // console.log(todayDate);
        $('#currentDay').html(todayDate);
    }, 1000);

    var timeBlocks = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

    //loop to setup and add timeblocks 9am to 5pm
    for (var i = 0; i < timeBlocks.length; i++) {
        
        //new row
        var newRow = $('<div>').addClass('row').attr({id: "row" + i});
        $('.container').append(newRow);
        //new var to add hourly am 
        var hourly = $('<div>').addClass('col-2 time-block mx auto').append(timeBlocks[i]);
        //new var to Input box per hour
        var inputBox = $(`<div class='col-9 inputBoxHr'> </div>`).attr({ id: "inputBox" + i });
        //hourly text box with saved items
        var textArea = $('<textarea>').attr({class: "col-12", id: 'textInputbutton' + i}).text(localStorage.getItem('myEventbutton' + i));
        inputBox.append(textArea);
        //new var save button
        var saveBtn = $('<button>').addClass('col-1 fas fa-save btn btn-success saveBtn').attr({ id: "button" + i});
        $(newRow).append(hourly, inputBox, saveBtn);

        //compared 9am to current time.
        var currentTime = moment().hour();  //get current hour as integer
        var calendarTime = (9 + i);  //set calendar time to integer 9
        // console.log("CurrentTime: " + currentTime);
        if (currentTime < calendarTime) {
            $("#inputBox" + i).addClass("future");  //time is in future, turn green
        }
        else if (currentTime > calendarTime) {
            $("#inputBox" + i).addClass("past");   //time is in the past, turn grey
        }
        else {
            $("#inputBox" + i).addClass("present");  //time is present, turn red
        }
    };

    // add event to local storage 
    $("button").click(function () {
        event.preventDefault();
        var currentID = $(this).attr('id'); 
        // console.log(currentID);
        var toStore = $(("#textInput" + currentID)).val(); //get value from textInputButton0
        // console.log('store value =' + toStore);
        localStorage.setItem("myEvent" + currentID, toStore); //store value from inputBox
    });

    //Clear all scheduler
    var clearBtn =$('<button>ERASE ALL SCHEDULE</button>').addClass("btn btn-danger clearAll");
    $('.lead').append(clearBtn);
    $('.clearAll').click(function(){
        for (var i=0; i< timeBlocks.length; i++) {
            $('#textInputbutton'+i).text('');
            localStorage.clear();
        }
    });

});