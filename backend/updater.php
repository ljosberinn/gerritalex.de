<?php declare(strict_types=1);

const JSON = [
    'html'  => __DIR__ . '/html.json',
    'stats' => __DIR__ . '/stats.json',
];

const THRESHOLD = 24 * 60 * 60;

$now        = time();
$lastUpdate = filemtime(JSON['html']);

// file exists && no update required
if($lastUpdate && $now - THRESHOLD <= $lastUpdate) {
    die('No update required.');
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

echo 'Update successful.';

