/*
 Purpose:-This helps in deciding on the URL based on the "baseUrl: ###" parameters of config file.
 Author:- Sunil(Team Helios)
 Date:- 25-05-2017
 */

var OR = require('./../Json/PartnerPortalOR.json');
var urldecide = function () {

//Based on the URL Navigation will be happening.

    this.getURL = function () {

        var URL;

        if (browser.baseUrl.match("acc") || browser.baseUrl.match(".acc")) {
            URL = OR.testsiteurl;
        }
        else if (browser.baseUrl.match("staging") || browser.baseUrl.match(".staging") || browser.baseUrl.match("staging.")) {
            URL = OR.testsiteurl.replace('acc', 'staging');
        } else if (browser.baseUrl.match("test") || browser.baseUrl.match(".test") || browser.baseUrl.match("test.")) {

            URL = OR.testsiteurl.replace('acc', 'test');
        }
        else {
            URL = OR.testsiteurl.replace('.acc', '');
        }

        return URL;
    };

};

module.exports = new urldecide();