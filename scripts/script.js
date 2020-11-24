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
  // .attr("data-calendar-time", i);
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
    // .val("another calendar subject")
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

if (JSON.parse(localStorage.getItem("WorkDayScheduler")) != null) {
  thisCalendarObj = JSON.parse(localStorage.getItem("WorkDayScheduler"));

  $.each(thisCalendarObj, function (key, value) {
    if (value != null) {
      // console.log(key);
      // console.log(value);
      // console.log(`[data-calendar-text="` + key + `"]`);
      $("input")
        .find("[data-calendar-text='" + key + "']")
        .val(value);
      $("input").find(`[data-calendar-text="9"]`).val("123321123");
    }
  });
}

$(".saveBtn").on("click", function saveInLocal() {
  var thisCalendarPosition = $(this).data("calendar-time");

  var thisCalendarText = $(this).parent().children("input").val();

  thisCalendarObj[thisCalendarPosition] = thisCalendarText;

  localStorage.setItem("WorkDayScheduler", JSON.stringify(thisCalendarObj));
  //trying to add in button with possible order of execution issue
  if (JSON.parse(localStorage.getItem("WorkDayScheduler")) != null) {
    thisCalendarObj = JSON.parse(localStorage.getItem("WorkDayScheduler"));

    $.each(thisCalendarObj, function (key, value) {
      if (value != null) {
        // console.log(key);
        // console.log(value);
        // console.log("[data-calendar-text='" + key + "']");
        // console.log(`[data-calendar-text="` + key + `"]`);
        var foundDataAttributeEl = $("input").find(
          "[data-calendar-text='" + key + "']"
        );
        $("input")
          .find("[data-calendar-text='" + key + "']")
          .val("123123123");
        //works
        $("#9").val("1234asdf");

        //doesn't work
        if (i < 24) {
          $(`"#` + i + `"`).val("1231asf");
        }

        // console.log(foundDataAttributeEl);
        foundDataAttributeEl.val = "12323";
        $("input").find(`[data-calendar-text="9"]`).text("123321123");
        // $("input").val("12321");
        $("#9").val(thisCalendarObj[9]);
        $("#10").val(thisCalendarObj[10]);
        $("#11").val(thisCalendarObj[11]);
        $("#12").val(thisCalendarObj[12]);
        $("#13").val(thisCalendarObj[13]);
        $("#14").val(thisCalendarObj[14]);
        $("#15").val(thisCalendarObj[15]);
        $("#16").val(thisCalendarObj[16]);
        $("#17").val(thisCalendarObj[17]);
        $("#18").val(thisCalendarObj[18]);
        $("#19").val(thisCalendarObj[19]);
        $("#20").val(thisCalendarObj[20]);
        $("#21").val(thisCalendarObj[21]);
        $("#22").val(thisCalendarObj[22]);
        $("#23").val(thisCalendarObj[23]);
      }
    });
  }
});
