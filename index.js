var express = require('express');
var ejs = require('ejs');
var app = express();
 
app.get('/', function (req, res) {
 
    var sql = require("mssql");

    // Database konfigürasyonu.
    var config = {
        user: 'sa',
        password: '123123',
        server: 'FERHAT', 
        database: 'Turkey',
        port:1433 
    }; 
    // Database bağlantısı
    sql.connect(config, function (err) {  
    
        if (err) console.log(err);

        // Request objesi yaratıldı.
        var request = new sql.Request(); 
        // request query ile database den veriler alındı.
        request.query('select * from Coordinates', function (err, recordset) {
        if (err) console.log(err)  //varsa hata bilgisi konsola yazılır.
       
        //veriler index.ejs dosyasına gönderildi/işlendi. 
        res.render('index.ejs', {
            title:"Geze Geze Türkiye",
             data:recordset.recordset
        });
        sql.close();
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});