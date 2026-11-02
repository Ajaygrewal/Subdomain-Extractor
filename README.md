#  Domain & File Extractor

> A lightweight Chrome extension that extracts all domains, subdomains, and referenced file paths from any webpage in seconds. Built for bug bounty hunters, security researchers, and penetration testers who need fast reconnaissance without manual copy-pasting.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Google%20Chrome-green.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

 **Browser Support:** This extension is built and tested for **Google Chrome only**. It is not compatible with Firefox.

---

##  Overview

During reconnaissance, security researchers often need to manually scan through page source code to find subdomains, API endpoints, and file references—a slow, repetitive process. This extension automates that by scanning the current page and extracting every domain-like pattern into a clean, filterable list.

##  Features

*  One-click scanning:** Extract all domains from the active tab instantly.
*  Smart filtering:** Filter results by extension (`.com`, `.in`, `.org`, custom).
*  Live search:** Search within extracted results by keyword.
*  Export options:** Download results as **CSV**, **JSON**, or **TXT**.
*  Clipboard support:** Copy individual results or the full list with a single click.
*  Zero configuration:** No setup, no API keys required—works straight out of the box.

---
## Installation

* Since this extension is not published on the Chrome Web Store, it must be loaded manually in Developer Mode:
* Download or clone this repository.
* Extract the ZIP file (if downloaded as a ZIP archive).
* Open Google Chrome and navigate to chrome://extensions/.
* Enable Developer mode using the toggle switch in the top-right corner.
* Click the Load unpacked button in the top-left corner.
* Select the extracted project folder containing manifest.json.
* The extension icon will now appear in your browser toolbar!

---
##  Project Structure

```text
├── manifest.json     # Extension configuration (Manifest V3)
├── popup.html        # Extension popup UI
├── popup.css         # Styling
├── popup.js          # Core scanning and extraction logic
└── icon.png          # Extension icon
```
---
##  Use Cases

| Scenario | How it helps |
| :--- | :--- |
| **Reconnaissance** | Quickly surface subdomains and linked assets on a target |
| **OSINT** | Map out a website's domain footprint and external connections |
| **Penetration Testing** | Build a comprehensive target list for further enumeration |
| **Security Research** | Understand a site's third-party integrations and internal structure |

---
##  License
MIT License — free to use, modify, and distribute.


