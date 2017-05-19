$(document).ready(function(){
	//Cleans up server
	$( window ).on('unload', function(){
		$.ajax({
			url: 'src/svr/resmger.php',
			type: 'post'
		});
	});
	//Track tracker
	var tracks = {
		trackCount: 1,
		track: [{
			name: 'track-1',
			url: null,
			trackRef: 'track1'
		},],
	}

	//Validates URL
	//Reference: http://stackoverflow.com/questions/2838404/javascript-regex-url-matching
	var ValidURL = function(url) {
	  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	  return pattern.test(url);
	}

	var ValidFileFormat = function(url){
		var pattern = new RegExp('\.mp3|\.wav|\.ogg');
		return pattern.test(url);
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

		//Check to make sure there is something in URL
		if( url != null && ValidURL(url) && ValidFileFormat(url)){
			if(tracks.trackCount == 1 && tracks.track[0].url == null){
				tracks.track[0].url = url;
				$('#track1-URL').empty();
				$('#track1-URL').append(url);
			}else {
				tracks.trackCount += 1;
				tracks.track[ tracks.trackCount - 1 ] = {
					name: "track-" + tracks.trackCount,
					url: url,
					trackRef: "track" + tracks.trackCount
				}

				$('.table-track-manager tbody').append('<tr><td><input class="form-control" type="text" name="' + tracks.track[ tracks.trackCount - 1 ].name + '" value="' + tracks.track[tracks.trackCount - 1].name + '"></td><td class="inactive" id="track' + tracks.trackCount + '-URL">' + url + '</td></tr>');
			}
			$('#url').val('');
		}else{
			alert("Please enter a valid URL with a valid file format.");
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

	//TODO: Check Ajax return request to save URL for audio processing.
	//TODO: Add function to add url to table
	//Simple File Uploader from http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
	$('#upload-submit').click(function() {
		var file = $("#fileInput").prop('files')[0];
	    if (file.size > 10000000 || (file.type != "audio/mp3" && file.type != "audio/wav" && file.type != "audio/ogg")) {
	        alert('Max upload size is 10MB and must be of type mp3, wav, or ogg.');
	    }else{
			$.ajax({
		        // Your server script to process the upload
		        url: 'src/svr/upload.php',
		        type: 'POST',

		        // Form data
		        data: new FormData($('#fileUpload')[0]),

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

				complete: function( xhr, status){
					console.log(xhr.responseText);
				}
		    });
		}
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

	$('#play-btn').click(function(){
		$('#play-btn').addClass('active');
		if($('#pause-btn').hasClass('active')) $('#pause-btn').removeClass('active');
	});

	$('#pause-btn').click(function(){
		$('#pause-btn').addClass('active');
		if($('#play-btn').hasClass('active')) $('#play-btn').removeClass('active');
	});

	$('#stop-btn').click(function(){
		if($('#play-btn').hasClass('active')) $('#play-btn').removeClass('active');
		if($('#pause-btn').hasClass('active')) $('#pause-btn').removeClass('active');
	});
});
