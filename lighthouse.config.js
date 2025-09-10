{
    "extends": "lighthouse:default",
        "settings": {
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo"],
            "formFactor": "mobile",
                "throttling": {
            "rttMs": 150,
                "throughputKbps": 1638.4,
                    "requestLatencyMs": 562.5,
                        "downloadThroughputKbps": 1474.56,
                            "uploadThroughputKbps": 675
        },
        "screenEmulation": {
            "mobile": true,
                "width": 412,
                    "height": 823,
                        "deviceScaleFactor": 2.625,
                            "disabled": false
        },
        "emulatedUserAgent": "Mozilla/5.0 (Linux; Android 11; moto g power (2021)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36"
    },
    "audits": [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
        "render-blocking-resources",
        "unused-css-rules",
        "unused-javascript",
        "modern-image-formats",
        "legacy-javascript",
        "layout-shift-elements",
        "lcp-lazy-loaded",
        "non-composited-animations",
        "unsized-images"
    ]
}
