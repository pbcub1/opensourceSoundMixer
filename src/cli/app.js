$(document).ready(function(){
	//Be sure everything is hidden to start
	$("#videoURL").hide();
	$("#fileUpload").hide();

	//Set up forms to auto select the import form
	var activeElement = "import";
	$("#import-btn").addClass("active");
	$("#videoURL").show();

	//Download and Import button click event listeners
	$("#upload-btn").click(function(){
		if( activeElement == "import" ){
			activeElement = "upload";
			$("#videoURL").hide();
			$("#fileUpload").show();
			$("#import-btn").removeClass("active");
			$("#upload-btn").addClass("active");
		}
	});
	$("#import-btn").click(function(){
		if( activeElement == "upload" ){
			activeElement = "import";
			$("#fileUpload").hide();
			$("#videoURL").show();
			$("#upload-btn").removeClass("active");
			$("#import-btn").addClass("active");
		}
	});
});
