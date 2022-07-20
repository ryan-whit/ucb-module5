var containerEl = $(".container");

// Ensure moment formatting "hh" is used with the following times
var rowTimes = [
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
];

// Apply styling based on the current time
function applyTemporalStyling(elementToStyle, rowTime) {
    var currentTime = moment();
    var startTime = moment(rowTime, format="hh");
    var endTime = moment(rowTime, format="hh").add(1, "hour");

    if (currentTime < startTime) {
        elementToStyle.addClass("past");
    }
    else if (currentTime >= startTime && currentTime < endTime) {
        elementToStyle.addClass("present");
        console.log("Present")
    }
    else {
        elementToStyle.addClass("future");
    };
}

// Populate the DOM for the scheduler for all working hours
function initializeScheduler() {
    for (var rowTime of rowTimes) {
        
        // Make a new div for each row
        var schedularRowEl = $("<div>");
        schedularRowEl.addClass(["row"]);
        
        // Make new elements for the row contents
        
        // Element representing the calendar time
        var rowTimeEl = $("<div>");
        rowTimeEl.addClass(["hour", "col-md-1"]);
        rowTimeEl.text(rowTime);
        schedularRowEl.append(rowTimeEl);
        
        // Initialize the input component with an empty field
        var userTaskInputEl = $("<input>");
        userTaskInputEl.addClass("col-md-10");
        
        // Apply time-specific styling
        applyTemporalStyling(userTaskInputEl, rowTime)
        schedularRowEl.append(userTaskInputEl);

        // Add button column
        var saveButtonEl = $("<button>");
        saveButtonEl.addClass(["saveBtn", "col-md-1"]);
        schedularRowEl.append(saveButtonEl);

        // Add all fields for the current time to the DOM
        containerEl.append(schedularRowEl);
        
    } 

};

initializeScheduler();

// TODO: Button icon

// TODO: add local storage saving based on button button click

// TODO: ensure data persistence for local storage
