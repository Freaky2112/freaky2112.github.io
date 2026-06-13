---
layout: default
title: "S-nail Mail"
permalink: /docs/s-nail/
---
# S-nail Configuration Guide

## Configuration File Location

User-specific configuration:

```bash
~/.mailrc
```

System-wide configuration:

```bash
/etc/s-nail.rc
```

---

# Basic Configuration

```bash
# Enable modern compatibility mode
set v15-compat

# Default sender address
set from="user@example.com"

# Sender display name
set realname="John Doe"

# Character encoding
set sendcharsets=utf-8

# Save sent mail
set record=~/Mail/sent

# Verbose output for troubleshooting
#set verbose
```

---

# SMTP Configuration

## SMTP with STARTTLS (Port 587)

```bash
set smtp="smtp://smtp.example.com:587"

set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="user@example.com"
set smtp-auth-password="SuperSecretPassword"

set ssl-verify=ignore
```

---

## SMTP with SSL/TLS (Port 465)

```bash
set smtp="smtps://smtp.example.com:465"

set smtp-auth=login
set smtp-auth-user="user@example.com"
set smtp-auth-password="SuperSecretPassword"

set ssl-verify=ignore
```

---

# TLS / Certificate Options

Use system CA bundle:

```bash
set tls-ca-file=/etc/ssl/certs/ca-certificates.crt
set tls-ca-no-defaults
```

Strict verification:

```bash
set ssl-verify=strict
```

Ignore certificate validation (testing only):

```bash
set ssl-verify=ignore
```

---

# Gmail Example

**Requires an App Password**

```bash
set v15-compat

set from="myaccount@gmail.com"
set realname="My Gmail Account"

set smtp="smtp://smtp.gmail.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="myaccount@gmail.com"
set smtp-auth-password="APP_PASSWORD"

set ssl-verify=ignore
```

---

# Microsoft 365 / Office 365 Example

```bash
set v15-compat

set from="user@company.com"

set smtp="smtp://smtp.office365.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="user@company.com"
set smtp-auth-password="PASSWORD"

set ssl-verify=ignore
```

---

# Multiple Accounts

```bash
account gmail {
    set from="user@gmail.com"
    set smtp="smtp://smtp.gmail.com:587"
    set smtp-use-starttls
    set smtp-auth=login
    set smtp-auth-user="user@gmail.com"
    set smtp-auth-password="APP_PASSWORD"
}

account work {
    set from="user@company.com"
    set smtp="smtp://smtp.office365.com:587"
    set smtp-use-starttls
    set smtp-auth=login
    set smtp-auth-user="user@company.com"
    set smtp-auth-password="PASSWORD"
}
```

Send using a specific account:

```bash
s-nail -A gmail -s "Test" recipient@example.com
```

---

# IMAP Configuration

```bash
set inbox="imaps://user@example.com:password@mail.example.com:993"

set folder=imaps://user@example.com:password@mail.example.com:993

set record="+Sent"

set imap-cache=~/.imap_cache

set imap-keepalive=240
```

---

# Logging / Debugging

Enable verbose mode:

```bash
set verbose
```

Or run:

```bash
s-nail -v
```

---

# Secure Password Storage

Instead of storing passwords in `.mailrc`, use permissions:

```bash
chmod 600 ~/.mailrc
```

Or store credentials in:

```bash
~/.netrc
```

Example:

```bash
machine smtp.example.com
login user@example.com
password SuperSecretPassword
```

---

# Common Command Examples

Send an email:

```bash
echo "Hello World" | s-nail -s "Test Message" recipient@example.com
```

Send a file:

```bash
cat report.txt | s-nail -s "Daily Report" recipient@example.com
```

Add attachment:

```bash
echo "See attached" | s-nail \
    -s "Report" \
    -a report.pdf \
    recipient@example.com
```

Use alternate account:

```bash
echo "Test" | s-nail \
    -A work \
    -s "Testing" \
    recipient@example.com
```

---

# Troubleshooting Checklist

Verify SMTP connectivity:

```bash
openssl s_client -connect smtp.example.com:587 -starttls smtp
```

Run with debugging:

```bash
s-nail -v
```

Check configuration:

```bash
s-nail -Xversion
```

Verify CA certificates:

```bash
ls -l /etc/ssl/certs/ca-certificates.crt
```

---

# Recommended Modern Template

```bash
set v15-compat

set from="alerts@example.com"
set realname="Server Alerts"

set sendcharsets=utf-8

set tls-ca-file=/etc/ssl/certs/ca-certificates.crt
set tls-ca-no-defaults

set smtp="smtp://smtp.example.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="alerts@example.com"
set smtp-auth-password="PASSWORD"

set ssl-verify=strict

set record=~/Mail/sent
```