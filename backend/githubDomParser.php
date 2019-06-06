<?php declare(strict_types=1);

error_reporting(E_ERROR);

$DOM = new DOMDocument();

const URI = 'https://github.com/ljosberinn';

try {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL            => URI,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    $DOM->loadHTML($response);
} catch(Error $error) {
    die($error->getMessage());
}

$main = $DOM->getElementById('js-pjax-container');

header('Content-type: application/json');

echo json_encode([
    'contributionHistory' => getContributionHistory($main),
    'contributionAmount'  => getContributionAmount($main),
    'activityOverview'    => getActivityOverview($main),
]);

function getActivityOverview(DOMElement $main): string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('div')), function(string $carry, DOMElement $div): string {
        if($div->getAttribute('class') !== 'Box mb-5 p-3 activity-overview-box border-top border-xl-top-0') {
            return $carry;
        }

        return $carry . getInnerHTML($div);
    }, '');
}

/**
 * Searches through h2s for the relevant heading, parses it properly and returns its value
 * 
 * @param DOMElement $main
 * 
 * @returns int
 */
function getContributionAmount(DOMElement $main): int {
    return array_reduce(iterator_to_array($main->getElementsByTagName('h2')), function(int $carry, DOMElement $h2): int {
        if($h2->getAttribute('class') !== 'f4 text-normal mb-2' || $h2->nodeValue === 'Contribution activity') {
            return $carry;
        }

        $contributions = (int) str_replace(' contributions in the last year', '', $h2->nodeValue);

        if($contributions > 0) {
            return $contributions;
        }

        return $carry;
    }, 0);
}


/**
 * Searches through SVGs for the relevant svg, extracts its contents concatinated onto its outer HTML
 * 
 * @param DOMElement $main
 * 
 * @returns string
 */
function getContributionHistory(DOMElement $main) : string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('svg')), function(string $carry, DOMElement $svg): string {
        if($svg->getAttribute('class') !== 'mx-auto js-calendar-graph-svg') {
            return $carry;
        }

        return $carry . getInnerHTML($svg);
    }, '');
}

function getInnerHTML(DOMElement $node) : string {
    return preg_replace('', '', array_reduce(iterator_to_array($node->childNodes), function(string $carry, $child): string {
        return $carry . $child->ownerDocument->saveXML($child);
    }, ''));
}
