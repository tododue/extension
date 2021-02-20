let URL = $.get(url);
let PAGE = $(document.html);

let landing = false;
let loginPhrase = 'login';


if (URL.has('mycourses')) {
    loginPhrase = 'Login'
}
else if (URL.has('webwork')) {
    loginPhrase = 'Not logged in.';
}
else if (URL.has('mheducation.com')) {
    loginPhrase = 'Sign In';
}
else if (URL.has('PEARSON')) {
    loginPhrase = 'X';
}
else if (URL.has('EXPERT TA')) {
    loginPhrase = 'X';
}


if (!page.includes(loginPhrase)) {
    //do stuff
}
