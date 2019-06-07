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
    'contributionHistory'  => getContributionHistory($main),
    'contributionAmount'   => getContributionAmount($main),
    'contributionActivity' => getContributionActivity($main),
]);

/**
 * @param DOMElement $main
 *
 * @return string
 */
function getContributionActivity(DOMElement $main): string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('div')), function(string $carry, DOMElement $div): string {
        if(strpos($div->getAttribute('class'), 'contribution-activity') === false) {
            return $carry;
        }

        return getInnerHTML($div);
    }, '');
}

/**
 * Searches through h2s for the relevant heading, parses it properly and returns its value
 *
 * @param DOMElement $main
 *
 * @return int
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
 * Searches through SVGs for the relevant svg, extracts its contents concatenated onto its outer HTML
 *
 * @param DOMElement $main
 *
 * @return string
 */
function getContributionHistory(DOMElement $main): string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('svg')), function(string $carry, DOMElement $svg): string {
        if($svg->getAttribute('class') !== 'mx-auto js-calendar-graph-svg') {
            return $carry;
        }

        return $carry . getInnerHTML($svg);
    }, '');
}

/**
 * Extracts the inner HTML of an DOMElement
 *
 * @param DOMElement $node
 *
 * @return string
 */
function getInnerHTML(DOMElement $node): string {
    return array_reduce(iterator_to_array($node->childNodes), function(string $carry, $child): string {
        return $carry . $child->ownerDocument->saveXML($child);
    }, '');
}
