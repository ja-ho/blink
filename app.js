const express = require('express');
const app = express();
const fs = require('fs');


app.get('/', (req, res) => res.send('Hello World!'));

var seq = 0;
app.get('/log', function(req, res) {
	console.log("%j", req.query);
	res.end(seq++);
});



app.get('/get', function(req, res){
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
	console.log(time);
	
	var temperature = req.query.field1;
	Number(temperature);
	console.log(temperature);
	fs.appendFile("log.txt", time + "," + temperature.toString() + '\n', (err) => {
		if(err) throw err;
		console.log('The "data to append" was appended to file!');
		seq++;
		res.end();
	});
});



app.listen(3000, () => console.log('Example app listening on port 3000'));
