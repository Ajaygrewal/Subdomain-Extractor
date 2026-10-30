Domain & File Extractor

A lightweight Chrome extension that extracts all domains, subdomains, and referenced file paths from any webpage in seconds.

Built for bug bounty hunters, security researchers, and penetration testers who need fast reconnaissance without manual copy-pasting.

⚠️ Browser Support: This extension is built and tested for Google Chrome only. It is not compatible with Firefox.

Overview

During reconnaissance, security researchers often need to manually scan through page source code to find subdomains, API endpoints, and file references — a slow, repetitive process. This extension automates that by scanning the current page and extracting every domain-like pattern into a clean, filterable list.

Features

One-click scanning — Extract all domains from the active tab instantly

Smart filtering — Filter results by extension (.com, .in, .org, custom)

Live search — Search within extracted results by keyword

Export options — Download results as CSV, JSON, or TXT

Clipboard support — Copy individual results or the full list

Zero configuration — No setup, no API keys, works out of the box

Installation

Since this extension is not published on the Chrome Web Store, it must be loaded manually in Developer Mode.

Download or clone this repository

Extract the ZIP file (if downloaded as ZIP)

Open Chrome and navigate to chrome://extensions/

Enable Developer mode (toggle in the top-right corner)

Click Load unpacked

Select the extracted project folder

The extension icon will now appear in your toolbar

Usage

Navigate to the target website

Click the extension icon in the Chrome toolbar

Click Scan Page

Review the extracted list of domains and file references

Use the filter or search bar to narrow results

Export the results as CSV, JSON, or TXT — or copy them directly

Use Cases

Scenario	How it helps

Reconnaissance	Quickly surface subdomains and linked assets on a target

OSINT	Map out a website's domain footprint

Penetration Testing	Build a target list for further enumeration

Research	Understand a site's third-party integrations and structure

Project Structure

manifest.json  → Extension configuration

popup.html    → User interface (what you see)

popup.css     → Styling & colors

popup.js      → Logic (domain extraction)

icon.png      → Extension icon

Known Limitations

Chrome only — not compatible with Firefox or other Chromium-based forks without modification

Cannot scan internal browser pages (chrome://, about:, etc.) due to browser security restrictions

Results depend on what's present in the page's HTML — heavily obfuscated or dynamically rendered content may yield partial results

Troubleshooting

Extension doesn't load Ensure Developer mode is enabled and the selected folder contains manifest.json directly (not nested inside another folder).

No results after scanning Refresh the target page and try again. Some pages block content scripts or load content after the initial scan.

"Cannot access this page" error This is expected behavior on Chrome system pages (chrome://extensions, etc.) — scan a regular website instead.

Disclaimer

This tool is intended for authorized security testing and educational purposes only. Only use it on websites and systems you own or have explicit permission to test. The author is not responsible for any misuse of this tool.

License

MIT License — free to use, modify, and distribute.

Contributing

Issues and pull requests are welcome. If you find a bug or have a feature suggestion, feel free to open an issue.

⭐ If you find this useful, consider starring the repository.
