const express = require('express');

const path = require('path');

const http = require('http');

const bodyParser = require('body-parser');

const multiparty = require('multiparty');

const xlsx = require('xlsx');

const fs = require('fs')

const app = express();

const router = express.Router();

//원문 사이트는 package.json -> description 참조

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: false,
}));

app.get('/', (req, res, next) => {
    let contents = '';
    contents += '<html><body>';
    contents += '   <form action="/" method="POST" enctype="multipart/form-data">';
    //contents += '       <input type="file" name="xlsx" />';
    contents += '       <input type="submit" />';
    contents += '   </form>';
    contents += '</body></html>';
    res.send(contents);
});

app.post('/', (req, res, next) => {
    const resData = {};
    const dir = __dirname + "/406호 재고 정리.ods"
    console.log(dir)
    const workbook = xlsx.readFile(dir);
    const sheetnames = Object.keys(workbook.Sheets);
    let i = sheetnames.length;
    while (i--) {
        const sheetname = sheetnames[i];
        let count = 6;
        console.log(sheetnames[i])
        resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        let j = resData[sheetnames[i]].length
        console.log(j)
        while(j--){
            resData[sheetnames[i]][j].id=j;
            console.log(resData[sheetnames[i]][j]);
        }
    }
    res.send(resData);
    xlsx.writeFile(workbook, path.join(__dirname, 'hereherehere.xlsx'));
});

http.createServer(app).listen(3000, () => {
    console.log('HTTP server listening on port ' + 3000);
});


