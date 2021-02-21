/*
 * Page where use enters their login information
 * Signs in and saves the token in chrome storage
 * 
 * Written by Christopher Grabda
 */
let SIGNIN_URL = 'https://tododue.com/signin'

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

            success: function(token) {
                chrome.storage.sync.set({'token': token});
            },
            error: (e) => { // HANDLE ERRORS

            }
        });
    });
});