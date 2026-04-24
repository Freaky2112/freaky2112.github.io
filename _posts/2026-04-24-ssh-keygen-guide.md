---
layout: post
title: "SSH Keygen Guide"
---

# 🔐 SSH Keygen Guide

Choosing the right SSH key type is important for both **security** and **performance**.

---

## 🔍 Key Types Overview

Here’s a quick breakdown:

- ❌ **DSA**  
  Deprecated and removed in modern OpenSSH versions. Do not use.

- ⚠️ **RSA**  
  Still widely used.  
  ✔️ Safe if ≥ 3072 bits  
  ❌ Weak if 1024 bits  

- ⚠️ **ECDSA**  
  Fast, but depends heavily on secure randomness and has some trust concerns around NIST curves.

- ✅ **Ed25519 (Recommended)**  
  Modern, fast, and secure. Best choice for most users.

---

## Why Ed25519?

Ed25519 is the current standard for SSH keys:

- 🔒 Strong security
- ⚡ Faster than RSA
- 📦 Much smaller keys
- 🧠 Designed to avoid common cryptographic pitfalls

👉 In short: **use this unless you have a specific reason not to**

---

## 🛠 Generate an Ed25519 Key

Run:

```bash
ssh-keygen -t ed25519 -a 100 -C "your@email.com"
````

### Options explained:

* `-t ed25519` → key type
* `-a 100` → increases resistance to brute-force attacks
* `-C` → label (email or hostname)

👉 Default path:

```
~/.ssh/id_ed25519
```

Set a **strong passphrase** when prompted.

---

## 🔑 Add Key to SSH Agent

Start the agent:

```bash
eval "$(ssh-agent -s)"
```

Add your key:

```bash
ssh-add ~/.ssh/id_ed25519
```

👉 To add all keys:

```bash
ssh-add
```

---

## ⚙️ SSH Config (Recommended)

Create or edit:

```
~/.ssh/config
```

```bash
Host *
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_ed25519
```

👉 This lets SSH automatically use your key.

---

## 🌐 Connect to a Server

### One-time connection:

```bash
ssh -i ~/.ssh/id_ed25519 user@server-ip
```

---

### Better: create a shortcut

```bash
Host myserver
  HostName 198.222.111.33
  User john
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

Then connect with:

```bash
ssh myserver
```

---

## 📤 Copy Your Key to a Server (ssh-copy-id)

Instead of manually editing `authorized_keys`, you can use `ssh-copy-id` to install your public key on a remote server.

### Basic usage

```bash
ssh-copy-id user@server-ip
````

👉 This will:

* Copy your public key (`~/.ssh/id_ed25519.pub`)
* Add it to `~/.ssh/authorized_keys` on the server
* Set correct permissions automatically

---

### Specify a key manually

If you have multiple keys:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519 user@server-ip
```

---

### Test your connection

After copying the key:

```bash
ssh user@server-ip
```

👉 You should now connect **without a password** (only passphrase if set).

---

## ⚠️ Troubleshooting

* Make sure SSH is running on the server
* Check permissions:

  ```bash
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/authorized_keys
  ```
* Ensure password login is enabled temporarily (for first copy)

---

## 🔐 Bonus: Disable password login (after setup)

Once your key works, improve security:

Edit SSH config on the server:

```bash
sudo nano /etc/ssh/sshd_config
```

Set:

```bash
PasswordAuthentication no
```

Then restart SSH:

```bash
sudo systemctl restart ssh
```

✅ Your server now accepts only SSH key authentication.


---

## 💡 Tips

* Keep old RSA keys only if needed
* Use one key per device
* Backup your private key securely
* Never share your private key
* Use a passphrase (seriously)

---

## ✅ Conclusion

If you're still using RSA or older keys, switching to **Ed25519** is a quick upgrade that improves both **security and performance**.

---

You now have a modern SSH setup.