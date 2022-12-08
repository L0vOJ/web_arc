const express = require('express');
const path = require('path');
const app = express();

//post방식으로 데이터를 받을 때 필요한 모듈입니다.
//req에 데이터를 담아줍니다.
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//cors정책을 피하기 위한 모듈
const cors = require('cors')
app.use(cors());

app.set('port', process.env.PORT || 3000);
/*
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,'/index.html'))
});
*/
//받은 데이터를 다음과 같이 가공해 json을 통해 클라이언트로 보내줍니다.
app.post('/ajax', function(req,res){
  var responseData = `hi ${req.body.name} i'm bonobono`
  res.json(responseData);
})

app.listen(app.get('port'), () => {
  var string = 'http://127.0.0.1:' + app.get('port')
  console.log(string);
});