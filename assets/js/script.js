const containerEl = $(".container");

// Needed for later manipulation
const saveButton = $('.saveBtn');

// Ensure moment formatting "hh" is used with the following times
const rowTimes = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

// Apply styling based on the current time
function applyTemporalStyling(elementToStyle, rowTime) {
  const currentTime = moment();
  const startTime = moment(rowTime, (format = "hh"));
  const endTime = moment(rowTime, (format = "hh")).add(1, "hour");

  if (currentTime < startTime) {
    elementToStyle.addClass("past");
  } else if (currentTime >= startTime && currentTime < endTime) {
    elementToStyle.addClass("present");
    console.log("Present");
  } else {
    elementToStyle.addClass("future");
  }
}

// Populate the DOM for the scheduler for all working hours
function initializeScheduler() {
  for (const rowTime of rowTimes) {
    // Make a new div for each row
    const schedularRowEl = $("<div>");
    schedularRowEl.addClass(["row"]);

    // Make new elements for the row contents

    // Element representing the calendar time
    const rowTimeEl = $("<div>");
    rowTimeEl.addClass(["hour", "col-md-1"]);
    rowTimeEl.text(rowTime);
    schedularRowEl.append(rowTimeEl);

    // Initialize the input component with an empty field
    const userTaskInputEl = $("<input>");
    userTaskInputEl.addClass("col-md-10");

    // Apply time-specific styling
    applyTemporalStyling(userTaskInputEl, rowTime);
    schedularRowEl.append(userTaskInputEl);

    // Add button column
    const saveButtonEl = $("<button>");
    saveButtonEl.addClass(["saveBtn", "col-md-1", "fas fa-save"]);
		saveButtonEl.on("click", function () {
			console.log("Input: ", userTaskInputEl.val());
			localStorage.setItem(rowTime, userTaskInputEl.val());
		});
    schedularRowEl.append(saveButtonEl);

    // Add all fields for the current time to the DOM
    containerEl.append(schedularRowEl);
  }
}

initializeScheduler();

// TODO: ensure data persistence for local storage
