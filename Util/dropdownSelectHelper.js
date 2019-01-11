//Helper function to automatically select a value in a dropdown

var dropdownSelect = function(selector) {
    this.webElement = element(selector);
};
dropdownSelect.prototype.getOptions = function() {
    return this.webElement.all(by.tagName('option'));
};
dropdownSelect.prototype.getOptionsCount = function() {
    return this.webElement.all(by.tagName('option')).count();
};
dropdownSelect.prototype.getSelectedOptions = function() {
    return this.webElement.all(by.css('option[selected="selected"]'));
};
dropdownSelect.prototype.selectByValue = function(value) {
    return this.webElement.all(by.css('option[value="' + value + '"]')).click();
};
dropdownSelect.prototype.selectByLabel = function(value) {
    return this.webElement.all(by.css('option[label="' + value + '"]')).click();
};
dropdownSelect.prototype.selectByPartialText = function(text) {
    return this.webElement.all(by.cssContainingText('option', text)).click();   
};
dropdownSelect.prototype.selectByText = function(text) {
    return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();   
};

module.exports = dropdownSelect;