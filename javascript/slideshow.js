
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
			console.log("title: ",imageArray[i].title," | ","url: ", imageArray[i].url);
		};
		for(var i =0; i < imageArray.length; i++){
			$slideshow.append('<li><img id="image-'+i+'" class="img-responsive img-thumbnail" src="'+imageArray[i].url+'"/></li>')
		};
		$('#image-0').addClass('active');

		var $previous = $('#previous');
		var $next = $('#next');
		var imgElementArray = $('img').toArray();


		$previous.click(function(){
			//create an array of img elements
			//then find the element with the class of active
			//get the id of active, then subtract one if greater than 0
			//or add 3 if 0
			console.log(this, "has been clicked");
			console.log(imgElementArray);
	});
	$next.click(function(){
		console.log(this, "has been clicked");
		console.log(imgElementArray);
	});
	})
})();






		



