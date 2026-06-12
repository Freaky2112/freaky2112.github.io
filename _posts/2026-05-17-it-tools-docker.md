---
layout: default
title: "It Tool Docker"
---

# IT-Tools: The Self-Hosted Swiss Army Knife for Developers

How many browser tabs do you have open with tools like "base64 decode online", "jwt decoder", or "json formatter"? If you're a developer or sysadmin, probably more than you'd like to admit.

**IT-Tools** solves that. It's a self-hosted, open-source collection of 86+ developer utilities — all in one clean web interface, running entirely in your browser, with no data sent anywhere.

---

## What's Inside — 86 Tools Across 10 Categories

### 🔐 Crypto
Token Generator, Hash Text (MD5/SHA-256/SHA-512), Bcrypt, UUID & ULID Generator, AES Encryption/Decryption, RSA Key Pair Generator, HMAC Generator, BIP39 Passphrase, Password Strength Analyser, PDF Signature Checker.

### 🔄 Converter
Base64 (string & file), Color (HEX/RGB/HSL), Case (camelCase/snake_case/kebab-case), Date-Time, Integer Base, YAML ↔ JSON ↔ TOML, XML ↔ JSON, Markdown to HTML, List Converter, Text to Binary/Unicode/NATO Alphabet.

### 🌐 Web
JWT Parser, URL Encoder/Decoder & Parser, HTML Entities, Basic Auth Generator, OTP Code Generator, MIME Types reference, HTTP Status Codes reference, Meta Tag Generator, User Agent Parser, JSON Diff, Slugify String, HTML WYSIWYG Editor.

### 🛠️ Development
**Docker Run → Compose Converter**, Crontab Generator, Chmod Calculator, Regex Tester & Memo, JSON Viewer/Minifier/to CSV, SQL Prettify, YAML Viewer, XML Formatter, Git Memo, Random Port Generator.

> The Docker Run → Compose converter alone is worth the deployment. Paste a `docker run` command, get a clean `compose.yml` back instantly.

### 🌍 Network
IPv4 Subnet Calculator, IPv4 Address Converter, IPv4 Range Expander, MAC Address Lookup & Generator, IPv6 ULA Generator.

### 🖼️ Images & Videos
QR Code Generator, WiFi QR Code Generator, SVG Placeholder Generator, Camera Recorder.

### 📝 Text & Math
Lorem Ipsum Generator, Text Diff, Text Statistics, String Obfuscator, Emoji Picker, ASCII Art, Math Evaluator, Percentage Calculator, ETA Calculator, Temperature Converter, Chronometer.

### 📊 Data
Phone Parser & Formatter, IBAN Validator & Parser.

---

## Why Self-Host?

The official demo at [it-tools.tech](https://it-tools.tech) is publicly available — but self-hosting makes sense for a few reasons:

**Privacy** — Even though everything runs client-side, keeping it internal is the right call when handling sensitive values like API tokens, private keys, or JWTs.

**Always available** — No dependency on external uptime or internet access.

**It's 20 MB.** There's genuinely no reason not to.

---

## Quick Reference

| Property | Value |
|---|---|
| **Image** | `corentinth/it-tools:latest` |
| **Image size** | ~20 MB |
| **Exposed port** | 80 |
| **Database** | None |
| **Volumes** | None |
| **Data sent externally** | Nothing — 100% client-side |
| **Source** | [github.com/CorentinTh/it-tools](https://github.com/CorentinTh/it-tools) |

---

## Installation Link

IT-Tools docker SetUp:
 
 Links: <a href="/docs/it-tools/">It-Tools</a>


---
*Questions / idea? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*
