<?
//session_start();

if (!empty($_SERVER['HTTP_REFERER'])) {
    $_SESSION['referer'] = $_SERVER['HTTP_REFERER'];
}

require_once 'cpc.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Metacrete - сухие ремонтные и подливочные смеси</title>
    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/app.css">
    @@include('partial/common/head.html')
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TKKGPR8"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="l-page">
    <div class="l-page__inner">
        <div class="l-page__header">
            @@include('./partial/common/header.html')
        </div>

        <div class="l-page__inner">
            @@include('./partial/main-screen.html')
        </div>
    </div>
</div>

@@include('./partial/common/modal.html')

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="js/vendor.min.js"></script>
<script src="js/app.js"></script>

</body>
</html>
