## Description

This application will allow users to track their day's events in a calendar format using moment.js for time comparisons and bootstrap for stylesheet functionality.

As the hour of day changes, the calendar will update the background for each event to be gray for in the past, red for the current hour and green for upcoming. This is accomplished by using the moment.js library [Moment.js library](https://momentjs.com/).

The user will be able to save event text via clicking on the calendar checkbox icon on the far right. This icon will grow and change colors upon hover to clearly show users where to save. When saved, the text will go into local storage along with the ID field. The data will be saved in local storage inside an object to prevent duplicate values from being entered - allowing overwriting each calendar postion.

Upon reloading the page, it will reload the event text into the appropriate hour's events.

Most of the html is being dynamically generated in the javascript. Although this wasn't a requirement from the assignment, I wanted to gain more experience with this functionality.

The application will be hosted here: [GitHub pages](https://brians-123.github.io/05-Third-Party-APIs-scheduler/)

## User Story

```
AS AN employee managing my daily schedule
I WANT to track my events by hour
SO THAT I can track my upcoming meetings and see what I've done for the day

```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Demo

```
Here is a demo of the application functionality:
```

![Demo of saving events, reloading page, seeing calendar coloring and hovers.](./Assets/Work-Day-Scheduler.gif)

## Licensing

```
This application should not be used elsewhere
```

## Credits

```
Acceptance crieria © 2020 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
```
