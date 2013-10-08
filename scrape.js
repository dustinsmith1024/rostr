console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://stats.nba.com/players.html';
page.open(url, function (status) {
    //Page is loaded!
    console.log(status);
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        window.setTimeout(function () {
            page.render(output);
            phantom.exit();
        }, 1000); // Change timeout as required to allow sufficient time 
    }
    
    
    //phantom.exit();
});