
var imageArray = [];

var dateArray = [];
//get the current date
//then get the image from that day
//and the three previous to use in slideshow
var currentDate = new Date();
// var month = currentDate.getMonth()+1;
// var day = currentDate.getDate();
// var output = currentDate.getFullYear() + '-' +
//     (month<10 ? '0' : '') + month + '-' +
//     (day<10 ? '0' : '') + day;
// console.log(output);
for(var i =0; i < 4; i++){
	var month = currentDate.getMonth()+1;
	var day = currentDate.getDate()-i;
	var output = currentDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    dateArray.push(output);
};
console.log(dateArray);



//Four jquery get requests that return one json object each

var firstAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[0],
		function(data) {
			imageArray.push(data);
		}).done(function(){
			resolve();
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var secondAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[1],
		function(data) {
		imageArray.push(data);
		}).done(function(){
			resolve();
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var thirdAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[2],
		function(data) {
			imageArray.push(data);
		}).done(function(){
			resolve();
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var fourthAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[3],
		function(data) {
			console.log("data3", data)
			imageArray.push(data);
		}).done(function(){
			console.log("imageArray", imageArray)
			resolve();
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
// $.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[1],
// 	function(data) {
// 		imageArray.push(data);
// 	});
// $.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[2],
// 	function(data) {
// 		imageArray.push(data);
// 	});
// $.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[3],
// 	function(data) {
// 		imageArray.push(data);
// 	});
//goals:
//push all of the images into an array then populate the page using the array
firstAJAX()
	.then(function(){
		console.log("date1", Date.now())
		secondAJAX();
	})
	.then(function(){
		console.log("date2", Date.now())
		thirdAJAX();
	})
	.then(function(){
		console.log("date3", Date.now())
		fourthAJAX();
	})
	.then(function(){
		// console.log("date4", Date.now())
		// console.log(imageArray);
		// console.log(imageArray.length);
		// console.log(imageArray[2]);


		// for(var i =0; i < imageArray.length; i++){
		// 	console.log(imageArray[i]);
		// };

		// $.each(imageArray,function(){
		// 	$.each(this, function (name, value) {
		//     console.log(name + '=' + value);
		//    })
		// });
	});
