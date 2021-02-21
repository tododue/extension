/*
 * Updates number of assignments, number shown on icon as a badge
 * Fetches the number of assignments from the database every minute
 * 
 * Written by Christopher Grabda
 */

// Link to get assignment number data from
let ASSIGNMENT_NUM_LINK = 'https://tododue.com/api/assignmentsDueIn24h';

// Stores number of assignments to do for the day
let assignmentCount = 0;

// Sets background color of badge
chrome.browserAction.setBadgeBackgroundColor({ color: [62, 62, 128, 255] });

/*
 * Gets assignment number from server as a json object
 * Parses object and sets assignmentCount to number retrieved from server
 */
function updateBadge() {
    $.ajax({
        url: ASSIGNMENT_NUM_LINK,
        type: 'GET',
        dataType: JSON,

        success: function(data) {
            assignmentCount = JSON.parse(data);
        },
        error: (e) => {     // HANDLE ERRORS

        }
    });

    // If there are no assignments, removes badge
    if (assignmentCount > 0) {
        chrome.browserAction.setBadgeText({text: assignmentCount.toString()});
    } else {
        chrome.browserAction.setBadgeText({text: ''});
    }
}

// Every minute runs the updateBadge function
setInterval(updateBadge, 60000);