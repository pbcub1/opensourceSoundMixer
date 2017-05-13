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

//Simple File Uploader from http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
//TODO: Change Size
//TODO: Check type to make sure it's in proper format
$(':file').on('change', function() {
    var file = this.files[0];
    if (file.size > 1024) {
        alert('max upload size is 1k')
    }

    // Also see .name, .type
});

//TODO: Check Ajax return request to save URL for audio processing.
$(':button').on('click', function() {
    $.ajax({
        // Your server script to process the upload
        url: 'upload.php',
        type: 'POST',

        // Form data
        data: new FormData($('form')[0]),

        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,

        // Custom XMLHttpRequest
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                // For handling the progress of the upload
                myXhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total,
                        });
                    }
                } , false);
            }
            return myXhr;
        },
    });
});
