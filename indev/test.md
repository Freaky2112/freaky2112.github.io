---
layout: post
title: "S-nail (Mailrc)"
---
S-nail Configuration Guide
Overview
S-nail is a modern mailx-compatible command-line mail client that supports:
    • SMTP submission
    • TLS/SSL encryption
    • Authentication
    • Attachments
    • IMAP/POP3 (optional)
    • Multiple accounts
    • Script automation
The primary configuration file is:
~/.mailrc

Basic SMTP Configuration
SMTP with STARTTLS (Port 587)
set from="alerts@example.com"
set realname="Monitoring Server"

set smtp="smtp://smtp.example.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="alerts@example.com"
set smtp-auth-password="YOUR_PASSWORD"

set ssl-verify=ignore

SMTP over SSL/TLS (Port 465)
set from="alerts@example.com"
set realname="Monitoring Server"

set mta="smtps://alerts@example.com:YOUR_PASSWORD@smtp.example.com:465"

set smtp-auth=login

TLS Configuration
Recommended
set tls-verify=strict
set tls-ca-file=/etc/ssl/certs/ca-certificates.crt
Disable Verification (Testing Only)
set ssl-verify=ignore

Common Variables
Sender Information
set from="alerts@example.com"
set realname="Alert System"

Character Sets
set sendcharsets=utf-8
set reply-in-same-charset

Wait for SMTP Completion
Useful for scripts:
set sendwait
Without this option S-nail may exit before the SMTP transaction completes.

Enable Verbose Logging
set verbose
Or from command line:
s-nail -v
For very detailed SMTP debugging:
s-nail -vv

Multiple Accounts
account gmail {
    set from="user@gmail.com"
    set smtp="smtp://smtp.gmail.com:587"
    set smtp-auth=login
    set smtp-auth-user="user@gmail.com"
    set smtp-auth-password="APP_PASSWORD"
    set smtp-use-starttls
}

account office {
    set from="user@company.com"
    set smtp="smtp://smtp.office365.com:587"
    set smtp-auth=login
    set smtp-auth-user="user@company.com"
    set smtp-auth-password="PASSWORD"
    set smtp-use-starttls
}
Use:
s-nail -A gmail
or
s-nail -A office

Gmail Example
Google requires an App Password.
set from="user@gmail.com"

set smtp="smtp://smtp.gmail.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="user@gmail.com"
set smtp-auth-password="GOOGLE_APP_PASSWORD"

set tls-verify=strict

Microsoft 365 / Office365 Example
set from="user@domain.com"

set smtp="smtp://smtp.office365.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="user@domain.com"
set smtp-auth-password="PASSWORD"

Local SMTP Relay Example
For Postfix, Exchange Relay, Mailcow, Mailrise, etc.
set from="alerts@homelab.local"

set smtp="smtp://192.168.1.10:25"

unset smtp-auth
unset smtp-auth-user
unset smtp-auth-password

IMAP Example
set inbox="imaps://user:password@mail.example.com:993"
set folder=imap://user:password@mail.example.com

Sent Mail Folder
set record=+Sent
or
set record=~/sent-mail

Useful Mailbox Settings
set hold
set append
set asksub
set crt=20
Meaning:
Option	Description
hold	Keep mail in mailbox
append	Append to mbox
asksub	Prompt for subject
crt=20	Pager after 20 lines

Attachments
Send attachment:
echo "Report attached" | \
s-nail -s "Daily Report" \
-a report.pdf \
admin@example.com

Command Line Examples
Simple Mail
echo "Hello World" | \
s-nail -s "Test" \
user@example.com

Using Specific Account
echo "Backup completed" | \
s-nail -A gmail \
-s "Backup Status" \
admin@example.com

With Attachment
echo "See attached log" | \
s-nail -A office \
-s "Daily Log" \
-a /tmp/log.txt \
admin@example.com

Troubleshooting
Test SMTP Connection
echo "test" | \
s-nail -vv \
-s "SMTP Test" \
user@example.com

Show Current Configuration
s-nail -X 'set'

Common Errors
Authentication Failed
535 Authentication failed
Check:
    • username
    • password
    • app password
    • smtp-auth setting

TLS Errors
certificate verify failed
Check:
set tls-ca-file=/etc/ssl/certs/ca-certificates.crt
or temporarily:
set ssl-verify=ignore

Connection Timeout
Connection timed out
Increase timeout:
set socket-connect-timeout=30

Homelab Alerting Example
set from="alerts@networkeclipse.com"
set realname="Homelab Monitoring"

set smtp="smtp://mail.networkeclipse.com:587"
set smtp-use-starttls

set smtp-auth=login
set smtp-auth-user="alerts@networkeclipse.com"
set smtp-auth-password="SECRET"

set sendwait
set verbose
Example:
echo "Docker host is down" | \
s-nail -s "ALERT" \
you@example.com

Useful Options Reference
set from=
set realname=
set smtp=
set mta=
set smtp-auth=
set smtp-auth-user=
set smtp-auth-password=
set smtp-use-starttls
set sendwait
set verbose
set ssl-verify=
set tls-verify=
set tls-ca-file=
set socket-connect-timeout=
set record=
set inbox=
set folder=
set hold
set append
set asksub
set crt=
