const express = require('express');
const app = express();
const fs = require('fs');
var path = require('path');

mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'me',
	password: 'mypassword',
	database: 'mydb'
});
connection.connect();

function insert_sensor(device, unit, type, value, seq, ip) {
	obj = {};
	obj.seq = seq;
	obj.device = device;
	obj.unit = unit;
	obj.type = type;
	obj.value = value;
	obj.ip = ip.replace(/^.*:/, '');

	var query = connection.query('insert into sensors set?', obj, function(err, rows, cols) {
		if(err) throw err;
		console.log("database insertion ok = %j", obj);
	});
};

function make_csv_format(rows) {
	var csved;
	csved = rows.id+","+rows.seq+","+rows.device+","+rows.unit+","+rows.type+","+rows.value+","+rows.ip+","+rows.time+"\n";

	return csved;
};


var seq = 0;


app.get('/', (req, res) => res.send('Hello World!\n'));

app.get('/update', function(req, res){
	var date = new Date();
	
	var day = date.getUTCDate();
	var month = date.getUTCMonth() + 1;
	var year = date.getUTCFullYear();
	var time = date.getUTCHours() + 9;
	var min = date.getUTCMinutes();
	
	if(time > 24) {
		time = time - 24;
		day = day + 1;
		if(day > 32) {
			day = day - 31;
			month = month + 1;
			if(month > 12) {
				month = month - 12;
				yaer += 1;
			}
		}
	}
	
	if(day < 10) {
		day = "0" + day.toString();
	}
	if(month < 10) {
		month = "0"+month.toString();
	}

	if(time < 10) {
		time = "0"+time.toString();
	}
	if(min < 10) {
		min = "0"+min.toString();
	}

	var time = year.toString() + month.toString() + day.toString() + "," + time.toString() + ":" + min.toString();
	var api_key = req.query.api_key;
	var temperature = req.query.field1;
	temperature = Number(temperature).toFixed(2);
	fs.appendFile("log.txt", time + "," + temperature.toString() + '\n', (err) => {
		if(err) throw err;
		seq++;
		res.end();
	});
});

app.get('/get', (req,res)=>{
	fs.readFile('./log.txt', "utf8", (err,data) => {
		if (err) throw err;
		console.log(data);
		res.send(data);
		res.end();
	});
});

app.get('/log', function(req, res) {
	r = req.query;
	console.log("GET %j", r);

	insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
	res.end('OK: ' + JSON.stringify(req.query)+'\n');
});

app.get("/data", (req, res) => {
	console.log("param=" + req.query);

	var qstr = 'select * from sensors';
	connection.query(qstr, (err, rows, cols) =>  {
		if(err) {
			throw err;
			res.send('query error: ' + qstr);
			return;
		};

		console.log("Got " + rows.length + " records");
		html = ""
		for (var i=0; i < rows.length; i++) {
			html += JSON.stringify(rows[i]) + '\n';
		};
		res.send(html);
	});
});

app.get("/download", (req, res) => {
	
	var qstr = 'select * from sensors';
	connection.query(qstr, (err, rows, cols) =>  {
		if(err) {
			throw err;
			res.send('query error: ' + qstr);
			return;
		};

		console.log("Got " + rows.length + " records");
		html = "";
		var str="";
		for (var i=0; i < rows.length; i++) {
			html += JSON.stringify(rows[i]) + '\n';
			str += make_csv_format(rows[i]);
		};
		//res.send(html);
		console.log(str);

		fs.appendFile("./data.csv", str, (err) => {
			if(err) throw err;
			var file = __dirname + '/data.csv';
			console.log(file);
			res.download(file);
			console.log(file);
			res.end();			
			/*
			res.sendFile(path.join(__dirname, "./", 'data.csv'), (err) => {
				res.send('something weird');
				res.end();
			});
			*/
		});
		
		//res.send(html);
	});
});

var server = app.listen(8080, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
});



//app.listen(8080, () => console.log('Example app listening on port 8080'));
