<?php
header('Content-Type: multipart/form-data');

function rndJesus(){
	rand(100000000000001, 999999999999999);
}

//Reference and code from https://www.w3schools.com/php/php_file_upload.asp
$target_dir = "uploads/";
$extention = rndJesus();
$uploadOk = 1;
$uploadName = basename($_FILES["file"]["name"]);
$fileType = pathinfo($uploadName,PATHINFO_EXTENSION);
$target_file = $target_dir . $extention . $fileType;

$jsonReturn = "{ ";
// Check if file already exists
while (file_exists($target_file)) {
	$extention = rndJesus();
	$target_file = $target_dir . $extention . $fileType;
}
// Check file size
if ($_FILES["file"]["size"] > 10000000) {
    $jsonReturn = $jsonReturn . 'error-size: true, ';
    $uploadOk = 0;
}
// Allow certain file formats
if($fileType != "mp3" && $fileType != "ogg" && $fileType != "wav") {
	$jsonReturn = $jsonReturn . 'error-type: true, ';
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    $jsonReturn = $jsonReturn . 'error: true';
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
		$jsonReturn = $jsonReturn . 'error: false, ';
		$jsonReturn = $jsonReturn . 'success: true ';
    } else {
		$jsonReturn = $jsonReturn . 'error-moving: true, ';
		$jsonReturn = $jsonReturn . 'error: true';
    }
}

echo $_FILES["file"]["tmp_name"];

$jsonReturn = $jsonReturn . '}';
echo $jsonReturn;
?>
