/*
 * Page where use enters their login information
 * Signs in and saves the token in chrome storage
 * 
 * Written by Christopher Grabda
 */
let SIGNIN_URL = 'https://tododue.com/login'

$(function(){
    $('#enterLogin').click(function(){
        let uname = $('#username').val();
        let pword = $('#password').val();

        $.ajax({
            url: SIGNIN_URL,
            type: 'POST',
            data: {
                username: uname,
                password: pword
            },

            success: function(btoken) {
                chrome.storage.sync.set({'token': btoken});
                $('#username').val('');
                $('#password').val('');

                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id, function() { });
                });
            },
            error: (e) => { // HANDLE ERRORS

            }
        });
    });
});