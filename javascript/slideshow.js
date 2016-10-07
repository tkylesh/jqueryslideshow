
var imageArray = [];
var dateArray = [];

var $slideshow = $('#slideshow');
var $slide = $("#slide");
function setSlide(src){
	$slide.attr('src', src);
};
function showSlide(counter){
	console.log("fade: ",$('#fadeRadio')[0].checked);
	console.log("slide: ",$('#slideRadio')[0].checked);
	if($('#fadeRadio')[0].checked){
		console.log("fade: ",$('#fadeRadio')[0].checked);
		$slide.fadeOut("slow",function() {
			setSlide(imageArray[counter].url);
			$slide.hide();
		});
		$slide.fadeIn("slow");
	}else if($("#slideRadio")[0].checked){
		console.log($slide);
		console.log("slide: ",$('#slideRadio')[0].checked);
		$slide.animate({ 'margin-bottom': "1000px" }, {duration: 1000, complete: function() {
			console.log(counter);
			setSlide(imageArray[counter].url);
			console.log($slide);
			$slide.animate({ "margin-bottom": "0" }, 1000 );
		}});
		// $slide.animate({ "margin-left":"-1000px" }, 2000 );
		}
}

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
		showSlide(0);
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

		function autoplay(){
			setInterval(function() {

				
				showSlide(counter);

			}, 3000);
		};



		var previous;
		var next;
		$previous.click(function(e){
			console.log(counter);
			if(counter === 0){
				counter = 3;
				showSlide(counter);
			}else{
				counter--;
				showSlide(counter);
			}
		});
		$next.click(function(e){
			console.log(counter);
			if(counter === 3){
				counter = 0;
				showSlide(counter);
			}else{
				counter++;
				showSlide(counter);
			}
		});
	});
})();






		



