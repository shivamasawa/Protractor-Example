//Helper function to test several parts of the accordion

var AccordionObject = require('../objects/accordion.object');

module.exports = {
    scrollTo: function () {
        var accordionObject = new AccordionObject();

        //scroll to accordion
        browser.executeScript("arguments[0].scrollIntoView();", accordionObject.container.getWebElement());

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //wait till animation is completed
        browser.sleep(1000);
    },
    openItem: function () {
        var accordionObject = new AccordionObject();

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //click on second button in accordion
        accordionObject.itemLink.click();

        //check if second item in accordion is opened
        expect(accordionObject.item.getAttribute('class')).toContain(accordionObject.openItemClass);
    },
    closeItem: function () {
        var accordionObject = new AccordionObject();

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //click on second button in accordion
        accordionObject.itemLink.click();

        //check if second item in accordion is closed
        expect(accordionObject.openItem.isPresent()).toBe(false);
    }
};