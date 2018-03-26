const express = require('express');
const app = express();
const fs = require('fs');


app.get('/', (req, res) => res.send('Hello World!\n'));

var seq = 0;


app.get('/log', function(req, res) {
	console.log("%j", req.query);
	res.end(seq++);
});

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



app.listen(8080, () => console.log('Example app listening on port 8080'));
