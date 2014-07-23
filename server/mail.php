<?php
//ini_set('display_errors', 'On');
//error_reporting(E_ALL);


class Mail 
{
	private $mail;

	public function __construct()
	{

		require_once 'vendors/PHPMailer/PHPMailerAutoload.php';
		require_once 'mail_config.php';

		//Create a new PHPMailer instance
		$this->mail = new PHPMailer();
		//Tell PHPMailer to use SMTP
		$this->mail->isSMTP();
		//Enable SMTP debugging
			// 0 = off (for production use)
			// 1 = client messages
			// 2 = client and server messages
		$this->mail->SMTPDebug   = 0;
		$this->mail->Debugoutput = 'html'; //Ask for HTML-friendly debug output

		$this->mail->Host       = $config['host'];    //hostname of the mail server
		$this->mail->Port       = 465;                //SMTP port number - likely to be 25, 465 or 587
		$this->mail->SMTPAuth   = true;               //Whether to use SMTP authentication
		$this->mail->SMTPSecure = 'ssl';              //Enable encryption, 'ssl', 'tls' 
		$this->mail->Username   = $config['username']; //Username to use for SMTP authentication
		$this->mail->Password   = $config['password'];         //Password to use for SMTP authentication
		$this->mail->CharSet    = 'UTF-8';

		$this->mail->setFrom($config['username'], 'Mailer'); //Set who the message is to be sent from
		$this->mail->WordWrap = 50;                          // Set word wrap to 50 characters
		$this->mail->isHTML(true);                           // Set email format to HTML
	}

	public function send($email, $htmlText, $cssText)
	{
		$this->mail->addAddress($email);      //Set who the message is to be sent to
		$this->mail->Subject = 'CSS3 Button Generator';
		$this->mail->Body    = '' .
				$this->applyStyles($htmlText, $cssText) . '<br><br>' .
				htmlspecialchars($htmlText) . '<br><br>' .
				htmlspecialchars ($cssText) . '';
		$this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		if(!$this->mail->send()) {
		    //echo 'Message could not be sent.';
		    //echo 'Mailer Error: ' . $this->mail->ErrorInfo;
		    return false;
		} else {
		    //echo 'Message has been sent';
		    return true;
		}
		//print_r($this->mail->Body);
	}

	private function applyStyles($html, $styles)
	{
		$styles = str_replace(array("\n", "\r"), '', $styles);

		$result = '';
		$pattern = '/class="([\w])"/';
		$pattern = '@^\.([\-\w]+) \{(.+)\}$@';
		preg_match($pattern, $styles, $matches);
		$className = $matches[1];
		$classStyle = $matches[2];

		$result = str_replace('<button ', '<button style="' . $classStyle . '" ', $html);		

		return $result;
	}

	public function getError()
	{
		return $this->mail->ErrorInfo;
	}
}
