//Helper function to convert strings that are entered via automated test in date fields to dd-mm-yyyy date format.  

module.exports = {
  convertDate: function (inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
	}
};