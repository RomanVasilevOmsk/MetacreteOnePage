<?php

if (!defined('ROISTAT_KEY')) {
    define('ROISTAT_KEY', 'MToxOjEyMzIxMzIxMw==');
}
if (!defined('ROISTAT_SYNC')) {
    define('ROISTAT_SYNC', 1);
}
define('ROISTAT_PROXY_URL', 'http://cloud.roistat.com/proxy/lead/add');
define('ROISTAT_PROXY_DEBUG', 1);
define('ROISTAT_NOHUP_RUN_KEY', 'sendlead');

if (php_sapi_name() === 'cli' && $argv[1] === ROISTAT_NOHUP_RUN_KEY && $argv[2]) {
    _sendData(json_decode(base64_decode($argv[2]), JSON_OBJECT_AS_ARRAY), 'Transport: nohup external process. PHP: ' . PHP_VERSION . '(' . php_sapi_name() . ')');
    exit();
}
/**
 * @param string $leadName
 * @param string $leadText
 * @param string $email
 * @param string $phone
 * @param string $name
 * @param array $additionalData
 * @return string
 */
function sendLeadToRoistat($leadName, $leadText, $email, $phone, $name, array $additionalData = array()) {
    $roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : null;
    $leadInfo = array (
        'leadName'      => $leadName,
        'leadText'      => $leadText,
        'email'          => $email,
        'phone'          => $phone,
        'name'           => $name,
        'additionalData' => $additionalData,
        'roistatVisitId' => $roistatVisitId,
        'key'            => ROISTAT_KEY,
    );

    if (ROISTAT_SYNC && function_exists('fastcgi_finish_request')) {
        register_shutdown_function(function () use ($leadInfo) {
            fastcgi_finish_request();
            _sendData($leadInfo, 'Transport: fastcgi shutdown function. PHP: ' . PHP_VERSION . '(' . php_sapi_name() . ')');
        });
        return "Shutdown function registered";
    } elseif (ROISTAT_SYNC && _isCanUseNohup() && is_writable(sys_get_temp_dir())) {
        $tempDir = sys_get_temp_dir();
        $outPutFile = $tempDir . "/nohup.output";
        $command = 'nohup php ' . __DIR__ . '/' . basename(__FILE__) . " " . ROISTAT_NOHUP_RUN_KEY . " " . base64_encode(json_encode($leadInfo)) . " > {$outPutFile}";
        $result = exec($command);
        return "Nohup command {$command} has been ran with result {$result}";
    } else {
        $result = _sendData($leadInfo, 'Transport: plain sync request. PHP: ' . PHP_VERSION . '(' . php_sapi_name() . ')');
        return "Simple request with result {$result}";
    }
}

/**
 * @param array $data
 * @param string $debug
 * @return string
 */
function _sendData(array $data, $debug = null) {
    if (!is_null($debug)) {
        $data['debug'] = $debug;
    }
    $postData = http_build_query($data);
    $streamOptions = array (
        'http' => array (
            'method'         => 'POST',
            'content'        => $postData,
            'header'         => 'Content-Type: application/x-www-form-urlencoded',
            'content-length' => sizeof($postData),
            'ignore_errors' => true,
        ),
    );
    $context = stream_context_create($streamOptions);
    return file_get_contents(ROISTAT_PROXY_URL, false, $context);
}

/**
 * @param string $functionName
 * @return bool
 */
function _isFunctionAvailable($functionName) {
    if (ini_get('safe_mode')) {
        return false;
    }
    $disabled = ini_get('disable_functions');
    if ($disabled) {
        $disabled = explode(',', $disabled);
        $disabled = array_map('trim', $disabled);
        return !in_array($functionName, $disabled);
    }
    return true;
}

/**
 * @return bool
 */
function _isCanUseNohup() {
    $nohupStr = '';
    $nohupReturn = 0;
    if (_isFunctionAvailable('exec') && (exec('echo 1') === '1')) {
        exec('nohup true', $nohupStr, $nohupReturn);
        return $nohupReturn === 0;
    }
    return false;
}

$roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : "";
$roistatMarker = array_key_exists('roistat_marker', $_COOKIE) ? $_COOKIE['roistat_marker'] : "";
