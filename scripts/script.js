//add date to jumbotron
var todaysDate = document.getElementById("currentDay");
todaysDate.textContent = moment().format("dddd, MMM do, YYYY");

//idea is to use military time to make comparisons easier
//each event area will have an id of the military time
var momentHour = moment().format("H");
// console.log(momentHour);

var calendarContainer = $("#calendar-container");

//Create calendar rows adding a data-attribute to each row
for (var i = 9; i < 24; i++) {
  var newRow = $("<div>").addClass("container-fluid d-flex px-2 my-row mx-2");
  var rowTime = $("<div>").addClass(
    "text-right col-1 p-3 mr-2 text-nowrap border-top"
  );
  // .attr("data-calendarTime", i);
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
    .val("another calendar subject")
    .attr("data-calendarTime", i);

  var rowSaveButtonContainer = $("<div>")
    .addClass("saveBtn w-auto p-4 bg-info rounded-right")
    .attr("data-calendarTime", i);

  // .click(saveInLocal(i, $('input[data-calendarTime=" + i + "]').val()));
  // console.log(i, $('input[data-calendarTime="' + i + '"]').val());

  // $('"data-calendarTime="9"', "");

  var saveButtonImage = $(`
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-check" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
    <path fill-rule="evenodd"
        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
    </svg>`);
  rowSaveButtonContainer.append(saveButtonImage);

  if (i < momentHour) {
    rowSchedule.addClass("past");
  } else if (i == momentHour) {
    rowSchedule.addClass("present");
  } else {
    rowSchedule.addClass("future");
  }
  newRow.append(rowTime, rowSchedule, rowSaveButtonContainer);
  calendarContainer.append(newRow);
  console.log(i, $('input[data-calendarTime="9"]').val());
}

//when the loop finishes executing, it adds 1 to i, making it 24
//this isn't what I want.
//I'm going to move it outside the loop to add via event delegation

// $(".saveBtn").on("click", function () {
// saveInLocal(i, $('input[data-calendarTime="9"]').val());
// saveInLocal("asdf", "123");
//

// saveInLocal(i, $('input[data-calendarTime="' + i + '"]').val());
// console.log(i);
// });

// $("#saveBtn").on("click",function(){
//   saveInLocal(i, $('input[data-calendarTime="' + i + '"]').val());
// })

//save the calendar text to local storage
//commenting this out to try to use event delegation instead
// function saveInLocal(calendarPosition, meetingText) {
//   console.log(calendarPosition, meetingText);
//   localStorage.setItem(calendarPosition, meetingText);
// }

//create an array to store data for the calendar text and positions
//so we can pull them back out later
var calendarData = [];

//pull the data back out of localStorage and replace the existing placeholders
console.log(JSON.parse(localStorage.getItem("WorkDayScheduler")));

//get data out of local storage and push back to each element
//later, this should go into the loop where I'm building each element
// var calendarObj = JSON.parse(localStorage.getItem("WorkDayScheduler"));

//use event delegation to grab the proper data element's value
function saveInLocal(calendarPosition, meetingText) {
  console.log($(this).data("calendartime"));
  console.log($(this).parent().children("input").val());

  //save the data element for the button's time into local storage
  //along with the text of the input box next to it
  // console.log($(this).parent().text());

  var thisCalendarPosition = console.log($(this).data("calendartime"));
  var thisCalendarText = $(this).parent().children("input").val();
  var thisCalendarObj = { thisCalendarPosition: thisCalendarText };

  //need to push into the object first to prevent duplicates

  calendarData.push(thisCalendarObj);
  console.log(calendarData);

  localStorage.setItem("WorkDayScheduler", JSON.stringify(calendarData));
}

$(function () {
  $(".saveBtn").on("click", saveInLocal);
});

//all of these buttons have a data element
//find the data element on the page and add a button click event to them

//with the button click, execute the function outside of the loop where we're building the element

//nice to have - make onclick action on button which changes the
//background color to light red when data is saved
//to local storage

//save text to local storage with the appropriate id

//when you come back to the same page, load with text
//in the appropriate text boxes from local storage
