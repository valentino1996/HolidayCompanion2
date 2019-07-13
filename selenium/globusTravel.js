var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("https://globustravel.al/hotele/").then(function(){

        driver.findElement(By.className('letstravel-vc-element clearfix archive-list list-content'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split('<div class="hotel-item style-3 bg-white">');

                var links = [];
                var titulli = [];
                var img = [];
                var pershkrimi = [];

                for(var i = 1; i<arr.length; i++){

                    x(arr[i], "a@href")(function(err, str){
                        links.push(str);
                    });

                    x(arr[i], "h4@text")(function(err, str){
                        titulli.push(str);
                    });

                    x(arr[i], "img@src")(function(err, str){
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
  globusTravel: function () {

      return dataJSON

}};
