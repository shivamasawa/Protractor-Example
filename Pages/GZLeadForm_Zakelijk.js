/**
 URL:- https://www.#####################/#/extraFieldsHeading
 Purpose:-Filling the Lead form of Groot zakelijk
 Author:- Sunil Sharanappa
 PH: +91 9731034714
 Date:- 20-09-2017
 */

var SelectWrapper = require('../util/dropdownSelectHelper.js');
var OR = require('./../Json/PartnerPortalOR.json');
var Ikhebeen = new SelectWrapper(by.id(OR.locators.Contactaanvraag_Zakelijk.Ikhebeen_ID));
var locator = require("../util/customlocators.js");
var scroll = require("../util/scrollDown.js");


var GZLeadForm_Zakelijk = function () {

    this.fillandSubmitLeadForm = function (Gewenste, Bedrijfsnaam, KVKnummer, Aanhef, Voornaam, Achternaam, Telefoonnummer, Emailid, Postcode, Huisnummerentoevoeging) {

        console.log('Company Name ==>' + Bedrijfsnaam);
//       expect('Bedankt').toMatch('Bedankt voor uw aanvraag');


        if (Gewenste.toString().toLowerCase() == 'stroom en gas') {
            var Gewensteproduct = element(by.xpath(OR.locators.GZLeadForm_Zakelijk.Gewensteproduct_XPATH));
            browser.executeScript("arguments[0].click();", Gewensteproduct.getWebElement());
        }

        element(by.xpath(OR.locators.GZLeadForm_Zakelijk.Bedrijfsnaam_XPATH)).sendKeys(Bedrijfsnaam);
        element(by.xpath(OR.locators.GZLeadForm_Zakelijk.KVKnummer_XPATH)).sendKeys(KVKnummer);

        if (Aanhef.toString().toLowerCase() == 'dhr') {
            var Aanhef_Dhr = element(by.xpath(OR.locators.GZLeadForm_Zakelijk.DhrRadiobutton_XPATH));
            browser.executeScript("arguments[0].click();", Aanhef_Dhr.getWebElement());
        } else {
            var Aanhef_Mevr = element(by.xpath(OR.locators.GZLeadForm_Zakelijk.MevrRadiobutton_XPATH));
            browser.executeScript("arguments[0].click();", Aanhef_Mevr.getWebElement());
        }


                var EC = protractor.ExpectedConditions;
                browser.wait(EC.visibilityOf(element(by.xpath(OR.locators.GZLeadForm_Zakelijk.VoorLetter_XPATH))), browser.params.implicitWaitTime);

                element(by.xpath(OR.locators.GZLeadForm_Zakelijk.VoorLetter_XPATH)).sendKeys(Voornaam);
                element(by.xpath(OR.locators.GZLeadForm_Zakelijk.Telephone_XPATH)).sendKeys(Telefoonnummer);

                element(by.xpath(OR.locators.GZLeadForm_Zakelijk.Achternaam_XPATH)).sendKeys(Achternaam);
                element(by.xpath(OR.locators.GZLeadForm_Zakelijk.Emailid_XPATH)).sendKeys(Emailid);

                               var EC1 = protractor.ExpectedConditions;
                browser.wait(EC1.visibilityOf(element(by.xpath(OR.locators.GZLeadForm_Zakelijk.ThankYouPageHeading_XPATH))), browser.params.implicitWaitTime);


                element(by.xpath(OR.locators.GZLeadForm_Zakelijk.ThankYouPageHeading_XPATH)).getText().then(function (text) {
                    expect(text).toMatch('Bedankt voor uw aanvraag');
                });

    };

};
module.exports = new GZLeadForm_Zakelijk();
