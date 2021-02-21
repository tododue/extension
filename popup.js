/*
 * When popup is opened, sends a get request to server retreive array of assignments due in 24 hrs
 * Loops through assignments array to display within popup
 * 
 * Written by Christopher Grabda and Patrick Mehlbaum
 */

//Checks if user is logged in
chrome.storage.sync.get('token', function(tk) {
    if (tk.token != "") {
        $('#temporary').hide();
    } else {
        $('#temporary').show();
    }
});


function getFormattedDate(date, justTime = false, withTime = false) {
	if (withTime) {
		return ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + '-' + date.getFullYear() + ', ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
	}
	if (justTime) {
		return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
	} else {
		return ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + '-' + date.getFullYear();
	}
}

// Link for the api to retrieve assignments array
let ASSIGNMENTS_LINK = 'https://tododue.com/api/assignmentsDueIn24h'

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
                row += '<td>' + assignment["class"] + '</td>';
                row += '<td>' + assignment["name"] + '</td>';
                row += '<td>' + getFormattedDate(new Date(assignment["due"]), false, true) + '</td>';
				row	+= '</tr>';			
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