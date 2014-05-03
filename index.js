var cheerio = require('cheerio');
var request = require('request');

module.exports = function(searchString, cb) {
  request.get({
      uri: "https://www.strandbooks.com/index.cfm?fuseaction=search.results", 
      qs: {hasInventory: true, 
           searchString: searchString}
    },
    function(err, resp, body) {
      if (err) {
        return cb(err, null);
      }

      var $ = cheerio.load(body);
      var results = [];
      $('.product').each(function() {
        results.push({
          img: $('.image img', this).attr('src'),
          price: $('.price span', this).text().trim(),
          title: $('.info h3 a', this).text().trim(),
          description: $('.desc-brief').text().trim()
        });
      });
      return cb(null, results);
    }
  );
};
