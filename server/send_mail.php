<?php if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

	//ini_set('display_errors', 'On');
	//error_reporting(E_ALL);

	require_once 'mail.php';

	$email    = $_POST['email'];
	$cssText  = $_POST['cssText'];
	$htmlText = $_POST['htmlText'];


	if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// valid address
		$mail = new Mail;
		$res = $mail->send($email, 
							$htmlText, 
							$cssText);
	
		if ($res) {
			$response = '{"success":true, "text":"OK"}';
		} else {
			$error = 'Mailer Error: ' . $mail->getError();
			$response = '{"success":false, "text":"'.$error.'"}';
		}

	} else {
		// invalid address
		$response = '{"success":false, "text":"INVALID_EMAIL"}';
	}

	echo json_encode($response);

}