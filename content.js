/*
 * Content script when specified URLS are visited
 * Gets the names of the site and determines the login phrase that site uses
 * If the site is not on the login page then it sends the HTML of the page to the server to parse
 * 
 * Written by Christopher Grabda
 */


// URL of the page
let URL = window.location.href;

// Stores full HTML data of the page
let PAGE = $("html").html();

// Link to send HTML data of page to
let SERVERLINK = 'https://dev.tododue.com/api/upload';

// Stores name of the site in the format the server uses
let platform = '';

// Determines which site to use and what keywords to look for
if (URL.includes('mycourses')) {
    platform = 'RIT_MYCOURSES';
}
else if (URL.includes('webwork')) {
    platform = 'RIT_WEBWORK';
}
else if (URL.includes('mheducation.com')) {
    platform = 'MCGRAW_HILL';
}
else if (URL.includes('theexpertta.com')) {
    platform = 'EXPERT_TA';
}

// Function to send the page information to the website to parse
function sendPage() {
    // Sets the Authorization header for ajax
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + btoken);
        }
    });

    $.ajax({
        url: SERVERLINK,
        type: 'POST',
        data: {
            page: PAGE,
            platform: platform
        },
        success: (e) => {

        },
        error: (e) => {     // HANDLE ERRORS

        }
    });
}

// Initializes token, fetches value
var btoken;
chrome.storage.sync.get('token', function(data) {
    btoken = data.token.token;
    console.log(btoken);
    sendPage();
});