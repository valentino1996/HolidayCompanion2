var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("http://uniontravel.al/?page_id=4708").then(function(){

        driver.findElement(By.className('tourmaster-tour-item-holder'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split('<div class="tourmaster-item-list tourmaster-tour-medium tourmaster-item-mglr clearfix tourmaster-tour-frame gdlr-core-skin-e-background">');
                arr.shift();

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

                    x(arr[i], "div.tourmaster-tour-info-wrap@text")(function(err, str){
                        pershkrimi.push(str);
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
  unionTravel: function () {

      return dataJSON;

}};
