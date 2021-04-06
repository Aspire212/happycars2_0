<?php

$dataJSON = file_get_contents('php://input');
$data = json_decode($dataJSON, true);
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$mess = $data['mess'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$mess = htmlspecialchars($mess);

$name = urldecode($name);
$email = urldecode($email);
$phone = urldecode($phone);
$mess = urldecode($mess);

$name = trim($name);
$email = trim($email);
$phone = trim($phone);
$mess = trim($mess);


echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $phone;
echo "<br>";
echo $mess;


if (mail("example2@mail.ru", "Заявка с сайта", "Имя: $name.\r\n\r\n E-mail: $email.\r\n\r\n Номер телефона: +$phone.\r\n\r\nСообщение: $mess","From: example2@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}

?>