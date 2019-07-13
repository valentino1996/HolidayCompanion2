var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var albaniaTravelVoyage =   require("./selenium/albaniaTravelVoyage"),
    eTour               =   require("./selenium/eTour"),
    flyTravel           =   require("./selenium/flyTravel"),
    globalTravel        =   require("./selenium/globalTravel"),
    globusTravel        =   require("./selenium/globusTravel"),
    kalemiTravel        =   require("./selenium/kalemiTravel"),
    noLimits            =   require("./selenium/noLimits"),
    unionTravel         =   require("./selenium/unionTravel");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Schema = mongoose.Schema;

mongoose.connect("mongodb://test:test@ds053156.mlab.com:53156/mongodb-test-valentino", function (err) {

	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	}

	else {
		console.log('Connection established');
	}
});

var data = {
        "albaniaTravelVoyage":  "",
        "eTour"              :  "",
        "flyTravel"          :  "",
        "globalTravel"       :  "",
        "globusTravel"       :  "",
        "kalemiTravel"       :  "",
        "noLimits"           :  "",
        "unionTravel"        :  ""
         };

var tempData = {};

mongoose.connection.once("open", function(err){

    if(err){
        console.log(err);
    }

    else{

        var schema = new Schema({
            oldData : Schema.Types.Mixed,
            newData : Schema.Types.Mixed,
            updated : {type:Date, default:Date.now().toString()}
        });

        var Oferta = mongoose.model("Oferta", schema);

        Oferta.create({oldData:data, newData:data}, function(err, snippet){

            if(err){
                console.log(err);
            }

            console.log("Databaza u krijua me sukses!");
            return;

        });

    }

    var scrap = function() {

        data = {
            "albaniaTravelVoyage":  albaniaTravelVoyage.albaniaTravelVoyage(),
            "eTour"              :  eTour.eTour(),
            "flyTravel"          :  flyTravel.flyTravel(),
            "globalTravel"       :  globalTravel.globalTravel(),
            "globusTravel"       :  globusTravel.globusTravel(),
            "kalemiTravel"       :  kalemiTravel.kalemiTravel(),
            "noLimits"           :  noLimits.noLimits(),
            "unionTravel"        :  unionTravel.unionTravel()
             }

    }

    setTimeout(function(){

        scrap();

        Oferta.find({}, function(err, snippetData){

            if(err||!snippetData){
                console.log(err);
            }
            else{
                if(snippetData[0].oldData == data){
                    console.log("Nuk ka oferta te reja.");
                }
                else{
                    console.log("U shtuan oferta te reja!");
                }
            }

            Oferta.updateMany({},{oldData:snippetData[0].newData, newData:data}, function(err, snippet){

                if(err||!snippet){
                    console.log(err);
                }
                else{
                    console.log("Databaza u modifikua me sukses!");
                }

            });

        });

    }, 300000);

app.get("/", function(req, res){

    res.send(JSON.stringify(data));

});

});

app.listen(8080);
