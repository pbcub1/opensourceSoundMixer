$(document).ready(function(){
	//Track tracker
	var tracks = {
		trackCount: 1,
		track: [{
			name: 'Track-1',
			url: null,
			trackRef: 'track1'
		},],
	}

	var readImportData = function(){
		var url = $("#url").val();
		var selectedMode;
		var verifiedURL = false;

		//Check to make sure a radio button is selected.
		if($('#audio').is(":checked")){
			selectedMode = 'audio';
		}else if ($('#video').is(':checked')){
			selectedMode = 'video';
		}else {
			console.error("Nothing is checked in import form.")
		}

		//Check to make sure the url given is a valid link
		//TODO: Check to make sure given URL is valid

		//Check to make sure there is something in URL
		if( url != null ){
			if(tracks.trackCount == 1 && tracks.track[0].url == null){
				tracks.track[0].url = url;
				$('#track1-URL').empty();
				$('#track1-URL').append(url);
			}else {
				tracks.trackCount += 1;
				tracks.track[ tracks.trackCount - 1 ] = {
					name: "Track-" + tracks.trackCount,
					url: url,
					trackRef: "track" + tracks.trackCount
				}

				$('.table-track-manager tbody').append('<tr><td><input class="form-control" type="text" name="track-' + tracks.trackCount + '" value="' + tracks.track[tracks.trackCount - 1].name + '"></td><td class="inactive" id="track' + tracks.trackCount + '-URL">' + url + '</td></tr>');
			}
			$('#url').val('');
		}
	}

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
	//TODO: Add function to add url to table
	$('#upload-submit').click(function() {
	    $.ajax({
	        // Your server script to process the upload
	        url: 'upload.php',
	        type: 'POST',

	        // Form data
	        data: new FormData($('#fileForm')[0]),

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

	$("#import-submit").click(function(){
		readImportData();
	});

	$('#url').keypress(function(event){
		if(event.which == 13){
			event.preventDefault();
			readImportData();
		}
	});
});
