/**
 Purpose:-This is an email utility script for sending email to the
 specific user this is drived through config file or from command prompt
 Author:- Sunil(Team Helios)
 Date:- 25-05-2017
 */


var mail = function () {


//Checking for the default product selection in the home page.

    this.sendMails = function () {

        var gmailSend = require("gmail-send")
        var send = require('gmail-send')({
            user: 'sssssss@gmail.com',
            pass: 'abcdefgh',
//on the above line set up 2 pass authentication pass from your gmail id from your GMAIL box
			
            to: browser.params.emailToAddress,
            subject: 'test subject',

            html: '<p>Hi All,<br> <br> Please find the attached mail containing the Automation test Report.<br> </p>' +
            '<h4> Below are the steps needs to be followed to view reports:</h4>'+
            '<ul> <li> Unzip the attached zip folder  by right clicking and doing Extract all</li>'+
            '<li> After Unzipping double click on htmlReports folder</li> <li>Open chrome-test-report.html either in Chrome/Firefox/Edge for better results </li></ul>'+
            '<br><h4>This Report is Generated automatically please dont reply back to this mail.</h4><br><br>Regards,<br> sssss Team',
            text: 'gmail-send example 1',
        });

        var filepath = './PartnerPortal/ReportToMail.zip';

        send({
            subject: 'Automation Test Report_Environment_'+browser.baseUrl.toUpperCase()+'_'+ new Date().toLocaleDateString(),
            files: [
                {
                    path: filepath,
//                    filename: 'Sanity Test Report_' + new Date().toLocaleDateString() + '.zip'
                    filename: 'Sanity Test Report_'+browser.baseUrl+'_' + new Date().toLocaleDateString() + '.zip'


                }
            ],
        }, function (err, res) {
            console.log('err:', err, '; res:', res);
        });

    };

};

module.exports = new mail();