/**
 URL:- https://www.#.#######################g/
 Purpose:-This script is used to navigate to the URL decided from urldecider.
 Author:- Sunil(Team Helios)
 Date:- 25-05-2017
 */


var BasePage = function () {

    this.navigationTOURL = function (url) {

        browser.get(url);
       browser.ignoreSynchronization = false;
     // browser.ignoreSynchronization = true;

    };

    this.getPageTitle = function () {

        return browser.getTitle();
    };

    this.maxmizeWindow = function () {

        browser.driver.manage().window().maximize();
    };
};

module.exports = new BasePage();