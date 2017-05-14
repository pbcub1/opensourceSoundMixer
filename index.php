<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!--Items that will need to be edited to match branding-->
		<title>Sound Application</title>
		<meta name="description" content="">
		<meta name="author" content="">
		<meta name="keywords" content="">

		<!--Styles-->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="res/styles/main.css">
	</head>
	<body>
		<!--Main navigational navbar-->
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
			      	</button>
					<a href="#" class="navbar-brand">Sound App</a>
				</div>
				<div class="collapse navbar-collapse" id="main-nav">
					<ul class="nav navbar-nav">
						<li><a href="#">Our Company</a></li>
						<li><a href="#">Our Products</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!--Body-->
		<div class="container">
			<div class="row">
				<div class="col-md-1"></div>
				<div class="col-md-10">
					<div class="selector">
						<button class="btn btn-info" type="button" id="import-btn" name="import">Import</button>
						<button class="btn btn-info" type="button" id="upload-btn" name="upload">Upload</button>
					</div>
				</div>
				<div class="col-md-1"></div>
			</div>
			<div class="row">
				<div class="col-md-1"></div>
				<div class="col-md-10">
					<form id="videoURL" class="fileForm" action="#" method="post">
						<div class="row">
							<div class="col-lg-12">
								<div class="form-group">
									<label for="url">Paste URL for video or audio file</label>
									<input type="text" class="form-control" id="url" name="url" placeholder="Paste URL here" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus required>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 cluster-items">
								<div class="form-group">
									<div class="row">
										<div class="col-sm-4"></div>
										<div class="col-sm-1">
											<input type="radio" class="form-control sm-radio" id="video" name="file_type" value="video" disabled>
										</div>
										<div class="col-sm-3">
											<label for="video" class="text-center">Video</label>
										</div>
										<div class="col-sm-4"></div>
									</div>

								</div>
							</div>
							<div class="col-md-6 cluster-items">
								<div class="form-group">
									<div class="row">
										<div class="col-sm-4"></div>
										<div class="col-sm-1">
											<input type="radio" class="form-control sm-radio" id="audio" name="file_type" value="audio">
										</div>
										<div class="col-sm-3">
											<label for="audio" class="text-center">Audio</label>
										</div>
										<div class="col-sm-4"></div>
									</div>
								</div>
							</div>
						</div>
						<button class="btn btn-success btn-submit" type="button" name="button">Import</button>
					</form>
					<form id="fileUpload" class="fileForm" action="#" method="post">
						<div class="form-group">
							<label for="fileInput">Choose your audio or video file</label>
							<input type="file" id="fileInput" name="file" value="">

						</div>
						<button class="btn btn-success btn-submit" type="button" name="button">Upload</button>
					</form>
				</div>
				<div class="col-md-1"></div>
			</div>

			<table class="table table-striped">
				<thead>
					<tr>
						<th>Track ID</th>
						<th>Track URL</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input class="form-control" type="text" name="track-1" value="track-1"></td>
						<td class="inactive" id="track1-URL">Nothing Yet - Import or upload file</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!--Footer navbar-->
		<div class="navbar navbar-default navbar-fixed-bottom">
			<div class="container">
				<p>Copyright 2017 &copy; Your Company Here</p>
			</div>
		</div>

		<!--Scripts-->
		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script type="text/javascript" src="src/cli/wad.min.js"></script>
		<script type="text/javascript" src="src/cli/app.js"></script>
	</body>
</html>
