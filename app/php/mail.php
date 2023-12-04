<?php
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    if (!error_get_last()) {
        $form_firstname = $_POST["firstname"];
        $form_lastname = $_POST["lastname"];
        $form_telnum = $_POST["telnum"];
        $form_email = $_POST["email"];

        $title = "Запись на приём Clinic.ru";
        $body = "
        <h2>Новый клиент</h2>
        <b>Имя:</b> $form_firstname<br>
        <b>Фамилия:</b> $form_lastname<br>
        <b>Номер телефона:</b> $form_telnum<br>
        <b>E-mail:</b> $form_email<br>
        <em>Тестовое задание, Данильян Филипп</em>
        ";

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        try {
            $mail->isSMTP();
            $mail->CharSet = "UTF-8";
            $mail->SMTPAuth = true;
            $mail->Host       = 'smtp.yandex.ru';
            $mail->Username   = '';
            $mail->Password   = '';
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;
            $mail->setFrom('phildan02@yandex.ru', 'register@clinic.ru');
            $mail->addReplyTo($form_email, $form_firstname);
    
            $mail->addAddress('rbru-metrika@yandex.ru');
    
            $mail->isHTML(true);
            $mail->Subject = $title;
            $mail->Body = $body;    
            
    
            if ($mail->send()) {
                $data['result'] = "success";
                $data['info'] = "Данные успешно отправлены!";
            } else {
                $data['result'] = "error";
                $data['info'] = "Ошибка при отправке данных";
                $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
            }
        } catch (Exception $e) {
            $data['result'] = "error";
            $data['info'] = $e->getMessage();
            echo ($data['result'] . ',' . $data['info']);
            return;
        }
        
    } else {
        $data['result'] = "error";
        $data['desc'] = error_get_last();
    }

    echo ($data['result'] . ',' . $data['info']);
?>