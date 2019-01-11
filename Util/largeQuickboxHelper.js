//Helper function to test several parts of the large quickbox

var LargeQuickboxObject = require('../objects/largequickbox.object');
var StickyNavObject = require('../objects/stickyNav.object');

module.exports = {
    scrollTo: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();
        //scroll to quickbox
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.container.getWebElement());

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //wait till animation is completed
        browser.sleep(1000);
    },
    enterDetails: function () {
        var largeQuickboxObject = new LargeQuickboxObject();

        //check if details are already entered in previous step
        largeQuickboxObject.addressContainer.getText().then(function(result) {
            if ( result == browser.params.userTestdata[0].zipCode) {
                //do nothing, address is already entered
            } else {
                //enter address in quickbox
                largeQuickboxObject.zipCode.clear().sendKeys(browser.params.userTestdata[0].zipCode);
                largeQuickboxObject.houseNumber.clear().sendKeys(browser.params.userTestdata[0].houseNumber); 

                if (browser.params.userTestdata[0].houseNumberAddition != ""){
                    largeQuickboxObject.houseNumberAddition.selectByLabel(browser.params.userTestdata[0].houseNumberAddition);
                }
                else{
                    largeQuickboxObject.houseNumberAddition.selectByLabel("Geen");
                }
            }
        });
    },
    selectKnownUsageFalse: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();

        //Scroll to lower part of quickbox
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.decision.getWebElement());

        //wait till animation is completed
        browser.sleep(1000);

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //Select known usage false button
        largeQuickboxObject.knownUsageFalse.isPresent().then(function(result) {
            if (result){
                largeQuickboxObject.knownUsageFalse.click();
            }
        });
    },
    selectKnownUsageTrue: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();

        //Scroll to lower part of quickbox
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.decision.getWebElement());

        //wait till animation is completed
        browser.sleep(1000);

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //Select known usage false button
        largeQuickboxObject.knownUsageTrue.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.knownUsageTrue.click();
            }
        });
    },
    enterAndSelectElectricityDoubleMeterAndGas: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();

        //Scroll to part where user can enter usage
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.knownUsageContainer.getWebElement());

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //enable electricity input if it is not already enabled
        largeQuickboxObject.enableElectricityLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.enableElectricityLink.click();
            }
        });

        //enable electricity double rate 
        largeQuickboxObject.doubleElectricityMeterLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.doubleElectricityMeterLink.click();
            }
        });

        largeQuickboxObject.electricityUsageHighRate.clear().sendKeys(browser.params.userTestdata[0].electricityUsageHighRate);
        largeQuickboxObject.electricityUsageLowRate.clear().sendKeys(browser.params.userTestdata[0].electricityUsageLowRate);
        
        //enable gas input if it is not already enabled
        largeQuickboxObject.enableGasLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.enableGasLink.click();
            }
        });
        
        largeQuickboxObject.gasUsageRate.clear().sendKeys(browser.params.userTestdata[0].gasUsageRate);
    },
    enterAndSelectElectricitySingleMeterOnly: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();

        //Scroll to part where user can enter usage
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.knownUsageContainer.getWebElement());

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //enable electricity single rate 
        largeQuickboxObject.singleElectricityMeterLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.singleElectricityMeterLink.click();
            }
        });

        //enter data in usage field
        largeQuickboxObject.electricityUsageSingleRate.clear().sendKeys(browser.params.userTestdata[0].electricityUsageSingleRate);

        //disable gas input if it is not already enabled
        largeQuickboxObject.disableGasLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.disableGasLink.click();
            }
        });
    },
    enterAndSelectGasOnly: function () {
        var largeQuickboxObject = new LargeQuickboxObject();
        var stickyNavObject = new StickyNavObject();

        //Scroll to part where user can enter usage
        browser.executeScript("arguments[0].scrollIntoView();", largeQuickboxObject.knownUsageContainer.getWebElement());

        stickyNavObject.container.isPresent().then(function(result) {
            if (result){
                //make stickynav not stick to top of page so quickbox button becomes visible on the page.
                browser.executeScript("document.querySelector('.stickynav').style.position = 'relative'");
            }
        });

        //disable Electricity input if it is not already disabled
        largeQuickboxObject.disableElectricityLink.isDisplayed().then(function(result) {
            if (result){
                largeQuickboxObject.disableElectricityLink.click();
            }
        });

        //enter data in usage field
        largeQuickboxObject.gasUsageRate.clear().sendKeys(browser.params.userTestdata[0].gasUsageRate);
    },
    enableSunPanels: function () {
        var largeQuickboxObject = new LargeQuickboxObject();

        //wait till quickbox is updated
        browser.sleep(1000);

        browser.executeScript(function () {
            var x = document.getElementsByTagName("input");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].type == 'checkbox'){
                    x[i].style.overflow = "visible";
                    x[i].style.position = "relative";
                    x[i].style.left = "0";
                    x[i].style.width = "auto";
                    x[i].style.height = "auto";
                }
            }
        });

        //Select button that user has sunpanel(s)
        largeQuickboxObject.sunPanelcheckbox.click();

        //wait will KwH is present
        browser.wait(function() {
            return largeQuickboxObject.teruglevering.isDisplayed();
        }, 1000);

        //enter teruglevering value into input field
        largeQuickboxObject.teruglevering.sendKeys(browser.params.userTestdata[0].teruglevering);
    },
    calculate: function () {
        var largeQuickboxObject = new LargeQuickboxObject();

        //Click calculate price button
        largeQuickboxObject.calculatePrice.click();

        browser.sleep(5000);
    }
};