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

    $html = curl_exec($curl);
    curl_close($curl);

    $DOM->loadHTML($html);
} catch(Error $error) {
    echo json_encode(['success' => false, 'curl failed']);
    die;
}

$main = $DOM->getElementById('js-pjax-container');

return [
    'contributionHistory'  => sanitize(getContributionHistory($main)),
    'contributionAmount'   => getContributionAmount($main),
    'contributionActivity' => sanitize(getContributionActivity($main)),
    'repositories'         => sanitize(getPinnedRepos($main)),
    'subNavStats'          => getSubNavStats($main),
];

final class Reducer {

    private const CONTRIBUTION_ACTIVITY_VALIDATION_CLASS = 'contribution-activity';
    private const CONTRIBUTION_HISTORY_VALIDATION_CLASS = 'mx-auto js-calendar-graph-svg';

    private const CONTRIBUTION_AMOUNT_VALIDATION_CLASS = 'f4 text-normal mb-2';
    private const CONTRIBUTION_AMOUNT_VALIDATION_NODE_VALUE = 'Contribution activity';
    private const CONTRIBUTION_AMOUNT_REPLACEMENT = ' contributions in the last year';

    /**
     * @param string $carry
     * @param        $child
     *
     * @return string
     */
    public static function innerHTML(string $carry, $child): string {
        return $carry . $child->ownerDocument->saveXML($child);
    }

    /**
     * @param string     $carry
     * @param DOMElement $div
     *
     * @return string
     */
    public static function contributionActivity(string $carry, DOMElement $div): string {
        if(strpos($div->getAttribute('class'), self::CONTRIBUTION_ACTIVITY_VALIDATION_CLASS) === false) {
            return $carry;
        }

        return getInnerHTML($div);
    }

    /**
     * @param int        $carry
     * @param DOMElement $h2
     *
     * @return int
     */
    public static function contributionAmount(int $carry, DOMElement $h2): int {
        if($h2->nodeValue === self::CONTRIBUTION_AMOUNT_VALIDATION_NODE_VALUE || $h2->getAttribute('class') !== self::CONTRIBUTION_AMOUNT_VALIDATION_CLASS) {
            return $carry;
        }

        $contributions = (int) str_replace(self::CONTRIBUTION_AMOUNT_REPLACEMENT, '', $h2->nodeValue);

        if($contributions > 0) {
            return $contributions;
        }

        return $carry;
    }

    /**
     * @param string     $carry
     * @param DOMElement $svg
     *
     * @return string
     */
    public static function contributionHistory(string $carry, DOMElement $svg): string {
        if($svg->getAttribute('class') !== self::CONTRIBUTION_HISTORY_VALIDATION_CLASS) {
            return $carry;
        }

        return getInnerHTML($svg);
    }
}

function sanitize(string $html): string {

    $strReplacePairs = [
        'a href="/'              => 'a target="_blank" rel="noreferrer noopener" href="https://github.com/ljosberinn/', // currently, links point to github internally
        '/ljosberinn/ljosberinn' => '/ljosberinn', // todo: remove this dirty hack
    ];

    $html = str_replace(array_keys($strReplacePairs), array_values($strReplacePairs), $html);

    $search = [
        '/(js-\w+)/', // github uses many "js-" classes that have no styling purpose
        '/([[:blank:]]{2,})/', // also many "  " in classes
        '([[:blank:]]")', // and some dangling spaces
        '/(\/>)(\s)+(<span itemprop)/m',// github has invalid html in span.repo-language-color
    ];

    $replace = [
        '',
        ' ',
        '"',
        '></span><span itemprop',
    ];

    return preg_replace($search, $replace, $html);
}

function getSubNavStats(DOMElement $main): array {
    $stats = [
        // Repositories
        // Projects
        // Stars
        // Followers
        // Following
    ];

    $subNavSpans = array_filter(iterator_to_array($main->getElementsByTagName('span')), static function(DOMElement $span): bool {
        return $span->getAttribute('class') === 'Counter hide-lg hide-md hide-sm';
    });

    foreach($subNavSpans as $span) {
        $stats[] = (int) $span->nodeValue;
    }

    return empty($stats) ? [0, 0, 0, 0, 0] : $stats;
}

function getPinnedRepos(DOMElement $main): string {
    return getInnerHTML($main->getElementsByTagName('ol')[0]);
}

/**
 * @param DOMElement $main
 *
 * @return string
 */
function getContributionActivity(DOMElement $main): string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('div')), 'Reducer::contributionActivity', '');
}

/**
 * Searches through h2s for the relevant heading, parses it properly and returns its value
 *
 * @param DOMElement $main
 *
 * @return int
 */
function getContributionAmount(DOMElement $main): int {
    return array_reduce(iterator_to_array($main->getElementsByTagName('h2')), 'Reducer::contributionAmount', 0);
}


/**
 * Searches through SVGs for the relevant svg, extracts its contents concatenated onto its outer HTML
 *
 * @param DOMElement $main
 *
 * @return string
 */
function getContributionHistory(DOMElement $main): string {
    return array_reduce(iterator_to_array($main->getElementsByTagName('svg')), 'Reducer::contributionHistory', '');
}

/**
 * Extracts the inner HTML of an DOMElement
 *
 * @param DOMElement $node
 *
 * @return string
 */
function getInnerHTML(DOMElement $node): string {
    return array_reduce(iterator_to_array($node->childNodes), 'Reducer::innerHTML', '');
}


