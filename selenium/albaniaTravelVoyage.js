var webdriver = require("selenium-webdriver");
var geckodriver = require('geckodriver');
var Xray = require("x-ray");
var x = Xray();
var By = require("selenium-webdriver").By;
var dataJSON;

var driver = new webdriver.Builder().forBrowser("firefox").build();

driver.manage().deleteAllCookies();

driver.get("http://albaniatravelvoyage.al/udhetime-turistike/").then(function(){

        driver.findElement(By.className('kd-package-list'))
            .getAttribute('innerHTML')
            .then(function(data){

                var arr = data.split('<article class="col-md-3">');
                data = arr.join("");
                arr = data.split('</article>');
                arr.pop();

                var links = [];
                var titulli = [];
                var img = [];
                var pershkrimi = [];

                for(var i = 1; i<arr.length; i++){

                    x(arr[i-1], "a@href")(function(err, str){
                        links.push(str);
                    });

                    x(arr[i], "span.term-name@text")(function(err, str){
                        titulli.push(str);
                    });

                    x(arr[i], "div.cover-image@style")(function(err, str){
                        var temp = str.replace('background-image: url(', "");
                        str = temp.replace(');overflow:hidden;', "")
                        img.push(str);
                    });

                    x(arr[i], "h5@text")(function(err, str){
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
          albaniaTravelVoyage: function () {

              return dataJSON;

}};
