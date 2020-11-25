//add date to jumbotron
var todaysDate = document.getElementById("currentDay");
todaysDate.textContent = moment().format("dddd, MMM do, YYYY");

//Use military time to make comparisons easier
//each event area will have an id of the military time
var momentHour = moment().format("H");

//create a variable to house the element for the calendar container
var calendarContainer = $("#calendar-container");

//Create calendar rows adding a data-attribute to each row. playing with the idea of creating most html
//dynamically for practice
for (var i = 9; i < 24; i++) {
  var newRow = $("<div>").addClass("container-fluid d-flex px-2 my-row mx-2");
  var rowTime = $("<div>").addClass(
    "text-right col-1 p-3 mr-2 text-nowrap border-top"
  );
  //add the appropriate time to the left column
  var rowtimeText = i + " AM";
  if (i == 12) {
    rowtimeText = i + " PM";
  }
  if (i > 12) {
    rowtimeText = i - 12 + " PM";
  }
  rowTime.text(rowtimeText);

  var rowSchedule = $("<input>")
    .addClass("w-100 p-3")
    .attr("data-calendar-text", i)
    .data("calendar-text", i)
    .attr("id", i);

  var rowSaveButtonContainer = $("<div>")
    .addClass("saveBtn w-auto p-4 bg-info rounded-right")
    .data("calendar-time", i);

  var saveButtonImage = $(`
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-check" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
    <path fill-rule="evenodd"
        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
    </svg>`);
  rowSaveButtonContainer.append(saveButtonImage);

  //use the moment API to see if the event is in the past, the current hour, or in the future. color accordingly.
  if (i < momentHour) {
    rowSchedule.addClass("past");
  } else if (i == momentHour) {
    rowSchedule.addClass("present");
  } else {
    rowSchedule.addClass("future");
  }
  newRow.append(rowTime, rowSchedule, rowSaveButtonContainer);
  calendarContainer.append(newRow);
}

//create an array to store data for the calendar text and positions
//so we can pull them back out later
var calendarData = [];

//create an object for the calendar times and text
var thisCalendarObj = {};

//parse the values in objects back from local storage to render to the page
if (JSON.parse(localStorage.getItem("WorkDayScheduler")) != null) {
  thisCalendarObj = JSON.parse(localStorage.getItem("WorkDayScheduler"));

  for (var j = 9; j < 24; j++) {
    $("#" + j).val(thisCalendarObj[j]);
  }
}

//the save button will save the new text for the current line into local storage
$(".saveBtn").on("click", function saveInLocal() {
  //take the 9-23 value from the data category on the element
  var thisCalendarPosition = $(this).data("calendar-time");
  //traverse the DOM to find the input box and add it's text to the variable
  var thisCalendarText = $(this).parent().children("input").val();
  //Uses the above to variables to add the new text into the thisCalendarObj object
  thisCalendarObj[thisCalendarPosition] = thisCalendarText;
  localStorage.setItem("WorkDayScheduler", JSON.stringify(thisCalendarObj));

  thisCalendarObj = JSON.parse(localStorage.getItem("WorkDayScheduler"));

  $.each(thisCalendarObj, function (key, value) {
    //loop through the key value pairs and display the appropriate value in the calendar
    if (key < 24) {
      $(`#` + key).val(thisCalendarObj[key]);
    }
  });
});
