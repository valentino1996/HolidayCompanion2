var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("http://fly-travel.al/tours/").then(function(){

        driver.findElement(By.className('deals'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split('<article class="tour_item one-fourth">');
                data = arr.join("");
                arr = data.split('</article>');
                arr.pop();

                var links = [];
                var titulli = [];
                var img = [];
                var pershkrimi = [];

                for(var i = 0; i<arr.length; i++){

                    x(arr[i], "a@href")(function(err, str){
                        links.push(str);
                    });

                    x(arr[i], "h3@text")(function(err, str){
                        titulli.push(str);
                    });

                    x(arr[i], "img@src")(function(err, str){
                        img.push(str);
                    });

                    x(arr[i], "div.description.clearfix@text")(function(err, str){
                        pershkrimi.push(str.replace(' More info', "."));
                    });

                }

                console.log(links);
                console.log(titulli);
                console.log(img);
                console.log(pershkrimi);

                dataJSON = {"links":links,
                            "titulli":titulli,
                            "img":img,
                            "pershkrimi":pershkrimi};

            });

});

module.exports = {
  flyTravel: function () {

      return dataJSON;

}};
