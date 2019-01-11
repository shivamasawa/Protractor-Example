//Helper function to test NAWTE form in checkout process

var NawteObject = require('../objects/nawte.object');
var ConvertDateHelper = require('../util/convertDateHelper');

module.exports = {
    enterPersonalDetails: function () {
        var nawteObject = new NawteObject();
        var birthDayRaw = new Date(browser.params.userTestdata[0].birthDay);
        var birthDay = ConvertDateHelper.convertDate(birthDayRaw);

        //scroll to form
        browser.executeScript("arguments[0].scrollIntoView();", nawteObject.personalDetailsForm.getWebElement());

        //wait till first field in form is visible
        browser.wait(function() {
            return nawteObject.initials.isDisplayed();
        }, 1000);

        //enter form data
        nawteObject.initials.clear().sendKeys(browser.params.userTestdata[0].initials);
        nawteObject.salutation.click();
        nawteObject.prefix.clear().sendKeys(browser.params.userTestdata[0].prefix);
        nawteObject.lastName.clear().sendKeys(browser.params.userTestdata[0].lastName);
        nawteObject.birthDay.clear().sendKeys(birthDay);
        nawteObject.personalDataPartialSubmitButton.click();

        //wait for animation to complete
        browser.sleep(2500);
    },
    enterContactDetails : function (alreadyCustomerSelection) {
        var nawteObject = new NawteObject();

        //scroll to form
        browser.executeScript("arguments[0].scrollIntoView();", nawteObject.contactDetailsForm.getWebElement());

        //wait till first field in form is visible
        browser.wait(function() {
            return nawteObject.phone.isDisplayed();
        }, 1000);

        //enter form data
        nawteObject.phone.clear().sendKeys(browser.params.userTestdata[0].phone);
        nawteObject.email.clear().sendKeys(browser.params.userTestdata[0].email);
        nawteObject.emailRepeat.clear().sendKeys(browser.params.userTestdata[0].email);

        if (alreadyCustomerSelection == true){
            nawteObject.alreadyCustomerSelectionTrue.click();
        }
        else{
            nawteObject.alreadyCustomerSelectionFalse.click();
        }

        nawteObject.contactDataPartialSubmitButton.click();

        //wait for animation to complete
        browser.sleep(2500);
    },
    enterAddressDetails : function (oldAddress, residenceCheck) {
        var EC = protractor.ExpectedConditions;
        
        var nawteObject = new NawteObject();
        var today = new Date();
        var minDaysFromToday = 4;
        var moveDateRaw = today.setDate(today.getDate() + minDaysFromToday);
        var moveDate = ConvertDateHelper.convertDate(moveDateRaw); 

        //show radio buttons (these are displayed if user has clicked in contact details form that he is already a customer)
        browser.executeScript(function () {
            var x = document.getElementsByTagName("input");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].type == 'radio'){
                    x[i].style.overflow = "visible";
                    x[i].style.position = "relative";
                    x[i].style.left = "0";
                    x[i].style.width = "auto";
                    x[i].style.height = "auto";
                }
            }
        });

        //scroll to form
        browser.executeScript("arguments[0].scrollIntoView();", nawteObject.addressDetailsForm.getWebElement());

        //enter form data

        nawteObject.movedAddressSelection.isDisplayed().then(function(result) {
            if (result){
                if (oldAddress == true){
                    nawteObject.movedAddressSelectionTrue.click();

                    nawteObject.oldzipcode.clear().sendKeys(browser.params.userTestdata[0].oldZipCode);
                    nawteObject.oldhousenumber.clear().sendKeys(browser.params.userTestdata[0].oldHouseNumber);
                
                    browser.wait(function() {
                    return nawteObject.oldhousenumberaddition.getOptionsCount().then(function(count) {
                        return count > 1;
                    });
                    }, 5000);

                    //select option form selectbox
                    nawteObject.oldhousenumberaddition.selectByLabel(browser.params.userTestdata[0].oldHouseNumberAddition);
                }
                else{
                    nawteObject.movedAddressSelectionFalse.click();
                }
            }
        })

        nawteObject.movedate.clear().sendKeys(moveDate);

        nawteObject.zipcode.clear().sendKeys(browser.params.userTestdata[0].zipCode);

        nawteObject.housenumber.clear().sendKeys(browser.params.userTestdata[0].houseNumber);

        if (browser.params.userTestdata[0].houseNumberAddition != ''){
            nawteObject.housenumberaddition.selectByLabel(browser.params.userTestdata[0].houseNumberAddition);
        }
        
        //street and city are not automatically set in acc environment due to a bug, so they need to be set manually.
        if (browser.baseUrl == 'acc.' || browser.baseUrl == 'test.' || browser.baseUrl == 'local'){
            nawteObject.street.sendKeys(browser.params.userTestdata[0].street);
            nawteObject.city.sendKeys(browser.params.userTestdata[0].city.toUpperCase());
        }

        //in case residenceCheck is needed in nawte select it
        nawteObject.residenceCheck.isPresent().then(function(result) {
            //show radio buttons (these are displayed if user has clicked in contact details form that he is already a customer)
            browser.executeScript(function () {
                var x = document.getElementsByTagName("input");
                var i;
                for (i = 0; i < x.length; i++) {
                    if (x[i].type == 'radio'){
                        x[i].style.overflow = "visible";
                        x[i].style.position = "relative";
                        x[i].style.left = "0";
                        x[i].style.width = "auto";
                        x[i].style.height = "auto";
                    }
                }
            });
            
            if (result){
                if (residenceCheck == true){
                    nawteObject.residenceCheckTrue.click();
                    
                }
                else{
                    nawteObject.residenceCheckFalse.click();
                }
            }
        })

        nawteObject.addressDataPartialSubmitButton.click();

        //wait for animation to complete
        browser.sleep(2500);
    },
    checkAddressDetails : function () {
        var nawteObject = new NawteObject();
       
        //scroll to form
        browser.executeScript("arguments[0].scrollIntoView();", nawteObject.addressDetailsForm.getWebElement());

        expect(nawteObject.oldAddressReadOnly.getText()).toContain(browser.params.userTestdata[0].oldStreet + " " + browser.params.userTestdata[0].oldHouseNumber);
        expect(nawteObject.oldAddressReadOnly.getText()).toContain(browser.params.userTestdata[0].oldZipCode + " " + browser.params.userTestdata[0].oldCity.toUpperCase());

        expect(nawteObject.deliveryAddressReadOnly.getText()).toContain(browser.params.userTestdata[0].street + " " + browser.params.userTestdata[0].houseNumber);
        expect(nawteObject.deliveryAddressReadOnly.getText()).toContain(browser.params.userTestdata[0].zipCode + " " + browser.params.userTestdata[0].city.toUpperCase());
    },
    enterPaymentDetails : function () {
        var nawteObject = new NawteObject();

        //scroll to form
        browser.executeScript("arguments[0].scrollIntoView();", nawteObject.paymentDetailsForm.getWebElement());

        //wait till first field in form is visible
        browser.wait(function() {
            return nawteObject.accountnumber.isDisplayed();
        }, 1000);

        //enter form data
        nawteObject.accountnumber.clear().sendKeys(browser.params.userTestdata[0].accountNumber);

        //make sure to blur when last field is entered so form becomes valid and submit button becomes enabled
        browser.executeScript("!!document.activeElement ? document.activeElement.blur() : 0");

        //wait for animation to complete
        browser.sleep(2500);
    },
    submitForm : function () {
        var nawteObject = new NawteObject();

        nawteObject.submitButton.click();

        browser.sleep(2500);
    }
};