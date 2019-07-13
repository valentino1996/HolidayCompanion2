var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("https://nolimits.al/te-gjitha-paketat/").then(function(){

        driver.findElement(By.className('package-item-holder'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split('<div class="row">');
                data = arr.join();
                arr = data.split('<div class="four columns gdl-package-widget">')


                var links = [];
                var titulli = [];
                var img = [];
                var pershkrimi = [];

                for(var i = 1; i<arr.length; i++){

                    x(arr[i], "a@href")(function(err, str){
                        links.push(str);
                    });

                    x(arr[i], "h2@text")(function(err, str){
                        titulli.push(str);
                    });

                    x(arr[i], "img@src")(function(err, str){
                        img.push(str);
                    });

                    x(arr[i], "div.package-content@text")(function(err, str){
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
  noLimits: function () {

      return dataJSON;

}};
