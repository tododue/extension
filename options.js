/*
 * Page where use enters their login information
 * Signs in and saves the token in chrome storage
 * 
 * Written by Christopher Grabda
 */
let SIGNIN_URL = 'https://tododue.com/login';
let SIGNOUT_URL = 'https:/tododue.com/api/logout';

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
            error: (e) => {
                console.log(e);
            }
        });
    });
});

$(function() {
    $('#logoutButton').click(function() {
        chrome.storage.sync.get('token', function(token) {
            let btoken = token.token.token;
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', "Bearer " + btoken);
                }
            });

            $.ajax({
                url: SIGNOUT_URL,
                type: 'GET',

                success: (e) => {
                    
                },
                error: (e) => {
                    console.log(e);
                }
            });
        });
        chrome.storage.sync.set({'token': ''});
    });
});