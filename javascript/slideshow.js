$.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
	function(data) {
		console.log(data);
		$("#slideshow").html(data);
		console.log("Load was performed.");
	});