var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("https://kalemitravel.com/").then(function(){

        driver.findElement(By.id('tab-recent'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split("<li>");
                data = arr.join("");
                arr = data.split("</li>");

                var links = [];
                var titulli = [];
                var img = [];
                var pershkrimi = [];

                for(var i = 0; i<arr.length-1; i++){

                    x(arr[i], "a@href")(function(err, str){
                        links.push(str);
                    });

                    x(arr[i], "a@title")(function(err, str){
                        titulli.push(str);
                    });

                    x(arr[i], "div.tab-item-thumbnail", "img@src")(function(err, str){
                        img.push(str);
                    });

                    x(arr[i], "p@text")(function(err, str){
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
  kalemiTravel: function () {

      return dataJSON;

}};
