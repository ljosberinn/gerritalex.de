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
    $search = [
        '/ljosberinn', // currently, links point to github internally
        'a href',
    ];

    $replace = [
        'https://github.com/ljosberinn',
        'a target="_blank" href',

    ];

    $html = str_replace($search, $replace, $html);

    $search = [
        '/(js-\w+)/', // github uses many "js-" classes that have no styling purpose
        '/([[:blank:]]{2,})/', // also many "  " in classes
        '([[:blank:]]")', // and some dangling spaces
    ];

    $replace = [
        '',
        ' ',
        '"',
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

    foreach($subNavSpans as $index => $span) {
        $stats[] = (int) $span->nodeValue;
    }

    return empty($stats) ? [0, 0, 0, 0, 0] : $stats;
}

function getPinnedRepos(DOMElement $main): string {
    // github has invalid html in span.repo-language-color
    $search  = '/>
  <span itemprop';
    $replace = '></span><span itemprop';

    return str_replace($search, $replace, getInnerHTML($main->getElementsByTagName('ol')[0]));
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


