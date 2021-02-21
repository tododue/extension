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
let PAGE = $(document).html());

// Link to send HTML data of page to
let SERVERLINK = 'https://tododue.com/api/upload';


// Stores login phrase of the page
let loginPhrase = '';

// Stores name of the site in the format the server uses
let platform = '';

// Initializes token, fetches value
let token;
chrome.storage.sync.get('token', function(data) {
    token = data;
});

// Determines which site to use and what keywords to look for
if (URL.includes('mycourses')) {
    loginPhrase = 'Login';
    platform = 'RIT_MYCOURSES';
}
else if (URL.includes('webwork')) {
    loginPhrase = 'Not logged in.';
    platform = 'RIT_WEBWORK';
}
else if (URL.includes('mheducation.com')) {
    loginPhrase = 'Sign In';
    platform = 'MCGRAW_HILL';
}
else if (URL.includes('theexpertta.com')) {
    loginPhrase = 'Log In';
    platform = 'EXPERT_TA';
}

// Function to send the page information to the website to parse
function sendPage() {
    $.ajax({
        url: SERVERLINK,
        type: 'POST',
        headers: {'Authorization': 'bearer ' + token},
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



// If the page is not the login page, sends the HTML data to the server
if (!PAGE.includes(loginPhrase)) {
    sendPage();
}
