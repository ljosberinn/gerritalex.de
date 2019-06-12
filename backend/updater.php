<?php declare(strict_types=1);

const JSON = [
    'html'  => __DIR__ . '/html.json',
    'stats' => __DIR__ . '/stats.json',
];

const THRESHOLD = 24 * 60 * 60;

header('Content-type: application/json');

$now        = time();
$lastUpdate = filemtime(JSON['html']);
$response   = ['success' => false, 'msg' => 'No update required.'];

// file exists && no update required
if($lastUpdate && $now - THRESHOLD <= $lastUpdate) {
    echo json_encode($response);
    die;
}

$data = require 'githubDomParser.php';

foreach(JSON as $name => $json) {
    $handle = fopen($json, 'wb+');

    switch($name) {
        case 'html':
            $dataset = json_encode([
                'contributionHistory'  => $data['contributionHistory'],
                'contributionAmount'   => $data['contributionAmount'],
                'contributionActivity' => $data['contributionActivity'],
                'repositories'         => $data['repositories'],
            ]);
            break;
        case 'stats':
            $dataset = json_encode([
                'subNavStats' => $data['subNavStats'],
            ]);
            break;
        default:
            die('Unknown type: ' . $name);
    }

    fwrite($handle, $dataset);
    fclose($handle);
}

$response['success'] = true;
$response['msg']     = 'Update successful.';

echo json_encode($response);


