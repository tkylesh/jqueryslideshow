
var imageArray = [];
var dateArray = [];
var myInterval;
var $slideshow = $('#slideshow');
var $slide = $("#slide");
function setSlide(src){
	$slide.attr('src', src);
};
function showSlide(counter){
	if($('#fadeRadio')[0].checked){
		$slide.fadeOut("slow",function() {
			setSlide(imageArray[counter].url);
			$slide.hide();
		});
		$slide.fadeIn("slow");
	}else if($("#slideRadio")[0].checked){
		$slide.animate({ 'margin-bottom': "1200" }, {duration: 3000, complete: function() {
			setSlide(imageArray[counter].url);
		}});
		$slide.animate({ "margin-bottom": "0" }, 4000 );
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



//push all of the images into an array then populate the slides from the array
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
		var previous;
		var next;


		function autoplay(){
			console.log("autoplay is running");
			myInterval = setInterval(function() {
				if(counter === 3) {
					counter = 0;
				}else {
					counter++;
				}
			showSlide(counter);
			}, 3000);
		};


		$("#autoBtn").click(function() {
			console.log("autoplay button clicked");
			autoplay();
		});
		$("#pauseBtn").click(function() {
			console.log("pause");
			clearInterval(myInterval);
		})
		// $slide.mouseenter(function() {
		// 	console.log("mouseenter");
		// 	clearInterval(myInterval);
		// });
		// $slide.mouseleave(function() {
		// 	console.log("mouseleave");
		// 	autoplay();
		// });
		

		$previous.click(function(e){
			clearInterval(myInterval);
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
			clearInterval(myInterval);
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






		



