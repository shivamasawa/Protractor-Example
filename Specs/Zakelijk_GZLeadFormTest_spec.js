/**
 URL:- https://www.###.############/
 Purpose:-Filling the form and checking whether form is getting submitted.
 Author:- Sunil(Team Helios)
 Date:- 18-09-2017
 */

var base = require('./../util/BasePage.js');
var OR = require('./../Json/PartnerPortalOR.json');
var Zakelijk_LeadForm = require('./../Pages/GZLeadForm_Zakelijk.js');
var Excelfunc = require('./../util/excelFunctionalities.js');
var getURL = require('./../util/urldecide.js');

describe("Zakelijk Home Page Test", function () {

    beforeEach(function (done) {
        done();
    }, 10000);


    it("Verify the Functionality of GZ Lead Form", function () {

        browser.ignoreSynchronization = true;

        base.navigationTOURL(getURL.getURL() + 'p###############################gas');
        base.maxmizeWindow();

        var Gewenste = Excelfunc.readExcel(3, 'B3', 'PartnerPortal_Data');
        var Bedrijfsnaam = Excelfunc.readExcel(3, 'B4', 'PartnerPortal_Data');

        var KVKnummer = Excelfunc.readExcel(3, 'B5', 'PartnerPortal_Data');
        var Aanhef = Excelfunc.readExcel(3, 'B6', 'PartnerPortal_Data');

        
        var Postcode = Excelfunc.readExcel(3, 'B11', 'PartnerPortal_Data');
        var Huisnummerentoevoeging = Excelfunc.readExcel(3, 'B12', 'PartnerPortal_Data');

       Zakelijk_LeadForm.fillandSubmitLeadForm(Gewenste, Bedrijfsnaam, KVKnummer, Aanhef, Voornaam, Achternaam, Telefoonnummer, Emailid, Postcode, Huisnummerentoevoeging);

    });

    afterAll(function () {
        browser.driver.manage().deleteAllCookies();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');

    });

});

