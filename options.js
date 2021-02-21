/*
 * Page where use enters their login information
 * Gets stored locally using Chrome storage
 * maybe not the most secure method but hey, it's a hackathon
 * 
 * Written by Christopher Grabda
 */

$(function(){
    $('#enterLogin').click(function(){
        let username = $('#username').val();
        let password = $('#password').val();

        chrome.storage.sync.set({'username': username});
        chrome.storage.sync.set({'password': password});

        $('#username').val('');
        $('#password').val('');
    });
});