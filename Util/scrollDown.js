/*
 Purpose:-This is a Scroll down utility script which helps in scrolling down to a particular element by calling this function and passing the
 required parameters.
 Author:- Sunil(Team Helios)
 Date:- 25-05-2017
 */


var scrollDown = function () {
//Checking for the default product selection in the home page.

    this.scrollToElement = function (Locator, Element) {

        var loc = Locator.toString().toLowerCase();

        switch (loc) {
            case "css":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "xpath":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "id":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "name":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "model":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "linktext":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
            case "partiallinktext":
                browser.executeScript("arguments[0].scrollIntoView();", Element);
                break;
        }
    };
};

module.exports = new scrollDown();