var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("https://www.etour.al").then(function(){

        driver.findElement(By.className('bllokuQender'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr;
                x(data, "div.blloku:nth-child(n+1)@html")(function(err, str){
                    arr = str.split('<div class="oferta">')
                    arr.shift();
                })

                var links = [];
                var img = [];
                var titulli = [];
                var pershkrimi = [];

                for(var i = 0; i<arr.length; i++){

                    x(arr[i], "a@href")(function(err, str){
                        links.push(str);
                    })

                    x(arr[i], "b@html")(function(err, str){
                        var titulliLinks = str.split('">');
                        var temp = titulliLinks[1];
                        titulliLinks = temp.split('</a>');
                        titulli.push(titulliLinks[0]);
                    })

                    x(arr[i], "div.foto@html")(function(err, str){
                        var imgLinks = str.split('<img src="');
                        var temp = imgLinks[1];
                        imgLinks = temp.split('" width');
                        img.push(imgLinks[0]);
                    })

                    x(arr[i], "div.txt@text")(function(err, str){
                        pershkrimi.push(str);
                    })

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
  eTour: function () {

      return dataJSON;

}};
