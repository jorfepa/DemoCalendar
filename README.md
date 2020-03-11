  

# Demo Calendar

This is a coding challenge for [*Jobsity*](https://www.jobsity.com)

  

**Technologies in the Frontend**

The Frontend was developed in the Javascript framework Angular 8, some tools are needed for a better User Experience:

-  **Moment.js**.- It is a library that removes the need to use the native JavaScript Date object directly and allow us a whole lot easier to work with dates.

-  **SweetAlert2**.- It help us to show alerts, confirmations and errors messages to the user.

-  **Bootstrap**.- It allow us to build very nice and intuitive interfaces with some components like Buttons, Menus, Colors, etc.
 

**Objectives completed**


- Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

- Display reminders on the calendar view in the correct time order.

- Allow the user to select color when creating a reminder and display it appropriately.

- Ability to edit reminders – including changing text, city, day, time and color.

- Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
- Unit test the functionality: Ability to add a new "reminder".

**Optional objectives completed**

 - Expand the calendar to support more than the current month.

- Properly handle overflow when multiple reminders appear on the same date.

- Functionality to delete one or ALL the reminders for a specific day.

  

**Instructions**

  

- After clone or download the source code, you must run "npm install" command to download all modules that are necessaries for Frontend run.

- You need to run "ng serve" command to run the application in dev mode.

- There are 3 hardcoded reminder for inid some test, feel free to comment o delete this code lines on reminder.service.ts file.

- For add a reminder just click on any date and a popup will ask you to create a new reminder or delete all reminder of the chosen date.

- For edit a reminder just click on a reminder.

- The weather of each reminder will appear on the view with the other data.

- For edit a reminder, in the data reminder view you have to choose the edit button.
- For runing the test, you have to run "ng test" command.