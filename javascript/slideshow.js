$.get("https://api.nasa.gov/planetary/apod?api_key=cCEW3xxeVKbq40XJmNlblQG0BBQSBQ5FUQcqJuPK",
	function(data) {
		console.log(data);
		$("#slideshow").html(JSON.stringify(data));
		console.log("Load was performed.");
	});