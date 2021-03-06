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


try {
    chrome.storage.sync.get('token')
} catch (error) {
    // Initializes token variable
    chrome.storage.sync.set({'token': ''})
}


/*
 * Gets assignment number from server as a json object
 * Parses object and sets assignmentCount to number retrieved from server
 */
function updateBadge() {
    $.ajax({
        url: ASSIGNMENT_NUM_LINK,
        type: 'GET',

        success: function(data) {
            assignmentCount = data.length();
        },
        error: (e) => {
            console.log(e);
        }
    });

    // If there are no assignments, removes badge
    if (assignmentCount > 0) {
        chrome.browserAction.setBadgeText({text: assignmentCount.toString()});
    } else {
        chrome.browserAction.setBadgeText({text: ''});
    }
}


function main() {

    chrome.storage.sync.get('token', function(tk) {
        if (tk.token != "") {
            // Initializes token, fetches value
            var btoken;
            btoken = tk.token.token;

            // Sets the Authorization header for ajax
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', "Bearer " + btoken);
                }
            });

            // Every minute runs the updateBadge function
            setInterval(updateBadge(), 60000);
        }
    });
    
}

setTimeout(main, 120000);