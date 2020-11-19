//add date to jumbotron
var todaysDate = document.getElementById("currentDay");
todaysDate.textContent = moment().format("dddd, MMM do, YYYY");

//idea is to use military time to make comparisons easier
//each event area will have an id of the military time
var momentHour = moment().format("H");
console.log(momentHour);

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
    .attr("data-calendarTime", i)
    // .on("click", function () {

    // });
    .on("click", function () {
      // saveInLocal(i, $('input[data-calendarTime="9"]').val());
      saveInLocal(i, $('input[data-calendarTime="' + i + '"]').val());
    });

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

//save the calendar text to local storage
function saveInLocal(calendarPosition, meetingText) {
  console.log(calendarPosition, meetingText);
  localStorage.setItem(calendarPosition, meetingText);
}

//nice to have - make onclick action on button which changes the
//background color to light red when data is saved
//to local storage

//save text to local storage with the appropriate id

//when you come back to the same page, load with text
//in the appropriate text boxes from local storage
