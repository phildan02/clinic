<?php
    // Файлы phpmailer
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    # проверка, что ошибки нет
    if (!error_get_last()) {

        // Переменные, которые отправляет пользователь
        // $name = $_POST['name'] ;
        // $email = $_POST['email'];
        // $text = $_POST['text'];
        // $file = $_FILES['myfile'];
        
        $name = 'Philipp';
        $email = 'phildan02@yandex.ru';
        $text = 'Message';
        
        // Формирование самого письма
        $title = "Ещё одно письмо";
        $body = "
        <h2>Новое письмо</h2>
        <b>Имя:</b> $name<br>
        <b>Почта:</b> $email<br><br>
        <b>Сообщение:</b><br>$text
        ";
        
        // Настройки PHPMailer
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {echo $str;};
        // Настройки вашей почты
        $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
        $mail->Username   = 'phildan02@yandex.ru'; // Логин на почте
        $mail->Password   = 'inilelcyzzkysvmr'; // Пароль на почте
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;
        $mail->setFrom('phildan02@yandex.ru', 'Philipp'); // Адрес самой почты и имя отправителя
        
        // Получатель письма
        $mail->addAddress('phildan02@mail.ru');
        

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;    
        
        // Проверяем отправленность сообщения
        if ($mail->send()) {
            $data['result'] = "success";
            $data['info'] = "Сообщение успешно отправлено!";
        } else {
            $data['result'] = "error";
            $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
            $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
        }
        
    } else {
        $data['result'] = "error";
        $data['info'] = "В коде присутствует ошибка";
        $data['desc'] = error_get_last();
    }

    // Отправка результата
    // header('Content-Type: application/json');
    // echo json_encode($data);

?>