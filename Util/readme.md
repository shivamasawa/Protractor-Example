# Using Utilities Library
Welcome to the Utility Library before creating new library check the below library to see whether it serves your purpose

## Index
1. [Mail](#Mail.js)  
2. [Scroll Down to Particular Element](#Scroll.js)
3. [Urldecide Navigation based on the config  baseUrl: Parmeter](#URL Decide and Navigate)
4. [Excel Functionality]
5. [Scroll Down Functionality]

## Mail.js

1. To Send email To the specific user/Team after the test execution we are using NPM gmail-send package.
2. We are using Gmail Smtp(ss#######ss@gmail.com) to send out email  to the recipients.
3. We can send out email to the specific user/stakeholders in 2 ways as mentioned below.

####Method 01:-
```
By making changes on the config file(conf.js) on the below paramerter.
 
params: {
emailToAddress: 'ss@gmail.nl'
}
```
####Method 02:-
```
gulp protractor --params.emailToAddress=ss@gmail.com
```
#####     OR
```
protractor --baseUrl='staging' --params.emailToAddress=ss@yahoo.com 
```

## Scroll.js

1. Scroll utility helps to scroll down to particular element on the webpage.
2. Scroll function takes 2 parameters one is the type of locators and another is element from the object repository.
3. Below is how we can implement Scroll library in your code.

```
var scroll = require("../../../util/scrollDown.js");
scroll.scrollToElement('#typeof locators', element(by.model(#element from the object repository)));
 
example:-
locators:- 'css','xpath','id','name','model','linktext','partiallinktext'
           
scroll.scrollToElement('model', element(by.model(OR.locators.Belmeterug_Zakelijk.Emailids_NGMODEL)));
```
## URL Decide and Navigate


1. URl Decide and Navigate helps to  Navigate to the base URL.
2. Rigth now only Zakelijk team is using this, This needs code changes on "urldecide.js" to include consumer homepage by default.
 
`````
 WIP