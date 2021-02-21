let URL = $.get(url);
let PAGE = $(document.html);
let SERVERLINK = 'https://tododue.com/api/upload';

let landing = false;
let loginPhrase = 'login';
let platform = '';

/**
 * Determines which site to use and what keywords to look for
 */
if (URL.has('mycourses')) {
    loginPhrase = 'Login';
    platform = 'RIT_MYCOURSES';
}
else if (URL.has('webwork')) {
    loginPhrase = 'Not logged in.';
    platform = 'RIT_WEBWORK';
}
else if (URL.has('mheducation.com')) {
    loginPhrase = 'Sign In';
    platform = 'MCGRAW_HILL';
}
else if (URL.has('theexpertta.com')) {
    loginPhrase = 'Log In';
    platform = 'EXPERT_TA';
}

/**
 * Sends the page information to the website to parse
 */
function sendPage() {
    $.ajax({
        url: SERVERLINK,
        type: 'POST',
        data: {
            page: PAGE,
            platform: platform
        },
        success: (e) => {

        },
        error: (e) => {

        }
    });
}



if (!page.includes(loginPhrase)) {
    sendPage();
}
