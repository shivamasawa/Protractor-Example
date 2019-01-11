exports.config = {
    framework: 'jasmine2',
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['./../Specs/Zakelijk_GZLeadFormTest_spec.js'],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                   
                }
            }
        }
    },
    suites: {
        mkbOrderFlowTest: [
            '../specs/business/ZakelijkOS_Orderflow4StroomNoResultCreditTest_spec.js',
            '../specs/business/ZakelijkOS_Orderflow4Test_spec.js'
        ]
    },
    getPageTimeout: 30000,
    allScriptsTimeout: 30000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 90000
    },
    params: {
        implicitWaitTime: 7000,
        //Email to be sent to the below mail id's
        emailToAddress: 'sunils0505@gmail.com',
        block: ""
    },
    onPrepare: function () {
        //screenshots
        var fs = require('fs-extra');

        fs.emptyDir('./PartnerPortal/reports/screenshots', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter({
            specDone: function (result) {

                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');
                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('./PartnerPortal/reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                });
                //}
            }
        });

        //maximize window
        browser.driver.manage().window().maximize();

        //reporters
        var jasmineReporters = require('jasmine-reporters');

        // returning the promise makes protractor wait for the reporter config before executing tests
        return global.browser.getProcessedConfig().then(function (config) {
            // you could use other properties here if you want, such as platform and version
            var browserName = config.capabilities.browserName;

            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: './PartnerPortal/reports/htmlReports',
                // this will produce distinct xml files for each capability
                filePrefix: browserName + '-xmloutput',
                modifySuiteName: function (generatedSuiteName, suite) {
                    // this will produce distinct suite names for each capability,
                    // e.g. 'firefox.login tests' and 'chrome.login tests'
                    return browserName + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    },

    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './PartnerPortal/reports/htmlReports',
                screenshotPath: '../screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: true,
                screenshotsOnlyOnFailure: false
            };
            new HTMLReport().from('./PartnerPortal/reports/htmlReports/' + browserName + '-xmloutput.xml', testConfig);


        }).then(function () {
            var del = require('delete');

            del.sync(['./PartnerPortal/ReportToMail.zip']);

            var zipFolder = require('zip-folder');

            zipFolder('./PartnerPortal/reports', './PartnerPortal/ReportToMail.zip', function (err) {
                //WIP to make the reports to send it over email
                if (err) {

                } else {
                    var mail = require('../util/mail.js');
                    mail.sendMails();
                }
            });
        });

        //This is to wait for certain given seconds before sending out the reports
        return new Promise(function (resolve, reject) {
            setTimeout(function () {

                //a promise that is resolved after "delay" milliseconds with the data provided
                resolve();
            }, 2000);
        }).then(function () {

            browser.driver.close();
        });
    },

    baseUrl: 'acc.'
}