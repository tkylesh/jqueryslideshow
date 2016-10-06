
var imageArray = [];
var dateArray = [];

var $slideshow = $('#slideshow');
var $slide = $("#slide");
function setSlide(src){
	$slide.attr('src', src);
};
function showSlide(){
	$slide.fadeIn("fast");
};

//get the current date
//then get the image from that day
//and the three previous to use in slideshow
var currentDate = new Date();
for(var i =0; i < 4; i++){
	var month = currentDate.getMonth()+1;
	var day = currentDate.getDate()-i;
	var output = currentDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    dateArray.push(output);
};
// console.log(dateArray);


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



//push all of the images into an array then populate the page using the array
(function(){
	firstAJAX()
	.then(secondAJAX)
	.then(thirdAJAX)
	.then(fourthAJAX)
	.then(
		function(){
		// console.log("imageArray", imageArray)
		// console.log(imageArray.length)
		// for(var i =0; i < imageArray.length; i++){
		// 	console.log("title: ",imageArray[i].title," | ","url: ", imageArray[i].url);
		// };
		setSlide(imageArray[0].url);
		showSlide();
	})
	.then(
		function(){
		var counter = 0;
		var $previous = $('#previous');
		var $next = $('#next');
		//How to set interval and animate
		// var slideInterval = setInterval(function(){
		// }, 2000);
		// $(selector).animate(obj, time, callback);
		var previous;
		var next;
		$previous.click(function(e){
			e.preventDefault();
			$slide.fadeOut("fast");
			$slide.hide();
			if(counter === 0){
				setSlide(imageArray[3].url);
				counter = 3;
			}else{
				counter--;
				setSlide(imageArray[counter].url);
			}
			showSlide();
		});
		$next.click(function(e){
			e.preventDefault();
			$slide.fadeOut("fast");
			$slide.hide();
			if(counter === 3){
				setSlide(imageArray[0].url);
				counter = 0;
			}else{
				counter++;
				setSlide(imageArray[counter].url);
			}
			showSlide();
		});
	});
})();






		



