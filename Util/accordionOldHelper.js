//Helper function to test several parts of the accordion

var AccordionOldObject = require('../objects/accordionOld.object');

module.exports = {
    scrollTo: function () {
        var accordionOldObject = new AccordionOldObject();

        //scroll to accordion
        browser.executeScript("arguments[0].scrollIntoView();", accordionOldObject.container.getWebElement());

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //wait till animation is completed
        browser.sleep(1000);
    },
    openItem: function () {
        var accordionOldObject = new AccordionOldObject();

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //click on second button in accordion
        accordionOldObject.itemLink.click();

        //check if second item in accordion is opened
        expect(accordionOldObject.item.getAttribute('class')).toContain(accordionOldObject.openItemClass);
    },
    closeItem: function () {
        var accordionOldObject = new AccordionOldObject();

        //make stickynav not stick to top of page so complete accordion becomes visible on the page.
        browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");

        //click on second button in accordion
        accordionOldObject.itemLink.click();

        //check if second item in accordion is closed
        expect(accordionOldObject.openItem.isPresent()).toBe(false);
    }
};