/*
 * When popup is opened, sends a get request to server retreive array of assignments due in 24 hrs
 * Loops through assignments array to display within popup
 * 
 * Made by Christopher Grabda and Patrick Mehlbaum
 */

// Link for the api to retrieve assignments array
let ASSIGNMENTS_LINK = 'https://tododue.com/api/assignmentsDueIn24h'

 $.ajax({
    url: ASSIGNMENTS_LINK,
    type: 'GET',

    success: function(data) {
        for (let assignment of data) {
            // Display in popup
        }
    },
    error: (e) => {     // HANDLE ERRORS

    }
});