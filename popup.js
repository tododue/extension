/*
 * When popup is opened, sends a get request to server retreive array of assignments due in 24 hrs
 * Loops through assignments array to display within popup
 * 
 * Written by Christopher Grabda and Patrick Mehlbaum
 */

// Link for the api to retrieve assignments array
let ASSIGNMENTS_LINK = 'https://dev.tododue.com/api/assignmentsDueIn24h'

function sendGet() {
    // Sets the Authorization header for ajax
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + btoken);
        }
    });

    $.ajax({
        url: ASSIGNMENTS_LINK,
        type: 'GET',

        success: function(data) {
            for (let assignment of data) {
                let row = '<tr>';
                row += '<td>';
                row += assignment["class"]
                row += '</td>';
                row += '<td>';
                row += assignment["name"]
                row += '</td>';
                row += '</tr>';
                $('tbody').append(row)
            }
        },
        error: (e) => {     // HANDLE ERRORS
            console.log("ERROR")
        }
    });
}

// Initializes token, fetches value
let btoken;
chrome.storage.sync.get('token', function(data) {
    btoken = data.token.token;
    sendGet();
});