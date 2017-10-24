<?

    function timeUtm()
    {
        $now = new DateTime("now", new DateTimeZone('Europe/Moscow'));

        $morning = clone $now;
        $morning->setTime(6, 30);

        $evening = clone $now;
        $evening->setTime(15, 0);

        $isWeekend = $now->format('N') >= 6;
        if ($now >= $morning && $now < $evening && !$isWeekend) {
            return 'Перезвоним в течение 4 минут.';
        } else {
            return 'Мы перезвоним Вам в рабочее время.';
        }


    }
	
?>