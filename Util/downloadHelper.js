//Helper function for downloading files in a spec.

module.exports = {
    waitFileExists: function (fileName) {
        var fs = require('fs');
        var path = require('path');

        var filepath = path.join(__dirname, '..', 'downloads', fileName);

        if (fs.existsSync(filepath)) {
            // Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filepath);
        }

        browser.driver.wait(function() {
            // Wait until the file has been downloaded.
            // We need to wait thus as otherwise protractor has a nasty habit of
            // trying to do any following tests while the file is still being
            // downloaded and hasn't been moved to its final location.
            return fs.existsSync(filepath);
        }, 30000);
    },
    clearFolder: function() {
        var path = require('path');
        var del = require('del');
        var downloadFolder = path.join(__dirname, '..', 'downloads', '*');

        browser.driver.wait(function() {
            // Clear all files from the download folder.
            // This makes sure you won't get scenarios with: filename (1)
            return del(downloadFolder);
        }, 30000);
    }
}
