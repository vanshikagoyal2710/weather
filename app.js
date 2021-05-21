const express = require("express");
const app = express();
const https = require("https");
const bodyparser=require("body-parser");
  app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){
  app.use(bodyparser.urlencoded({extended:true}))
  const query=req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=96f7586f78909ce08e17bd1ed58a081f&units=metric"
  https.get(url, function(response){
      console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata=JSON.parse(data)
      const temp=weatherdata.main.temp
      const weatherdes=weatherdata.weather[0].description
      const icon=weatherdata.weather[0].icon
      const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>the temperature in "+query+" is:"+temp+"degree.celsius</h1>");
      res.write("<h1> description:"+weatherdes+"</h1>");
      res.write("<img src="+imgurl+">");

      res.send()

})

})
});






    app.listen(3000, function() {
      console.log("hihiiii");
    });
