<?php
    $formContent = file_get_contents('php://input');

    $clientInfo = json_decode($formContent);


    echo 'OKAY';

    if (mail('phildan02@mail.ru', 'them', 'example-message')) {
        echo 'Письмо было принято для передачи';
    } else {
        echo 'что-то пошло не так...';
    }
?>