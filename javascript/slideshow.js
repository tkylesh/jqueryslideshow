
var imageArray = [];
var dateArray = [];
var $slideshow = $('#slideshow');
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
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[0])
		.done(function(data){
			resolve(imageArray.push(data));
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var secondAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[1])
		.done(function(data){
			resolve(imageArray.push(data));
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var thirdAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[2])
		.done(function(data){
			resolve(imageArray.push(data));
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};
var fourthAJAX = function() {
	return new Promise((resolve, reject)=> {
		$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK&date="+dateArray[3])
		.done(function(data){
			resolve(imageArray.push(data));
		}).fail(function(xhr, status, error){
			reject(error);
		});
	})
};




//goals:
//push all of the images into an array then populate the page using the array
(function(){
	firstAJAX()
	.then(secondAJAX)
	.then(thirdAJAX)
	.then(fourthAJAX)
	.then(
		function(){
		console.log("imageArray", imageArray)
		console.log(imageArray.length)
		for(var i =0; i < imageArray.length; i++){
			console.log("title: ",imageArray[i].title," | ","hdurl: ", imageArray[i].hdurl);
		};
	})
})();

//when dom is ready to be manipulated
$(document).ready(function() { 
});
