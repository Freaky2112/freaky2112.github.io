---
layout: post
title: "Proxmox Template"
---

# ☁️Cloud-init

## download the image
### ubuntu
  ``` bash
  wget https://cloud-images.ubuntu.com/daily/server/server/server/minimal/daily/resolute/current/resolute-minimal-cloudimg-amd64.img
```
### debian
  ``` bash
  wget https://cloud.debian.org/images/cloud/trixie/daily/20260404-2437/debian-13-generic-amd64-daily-20260404-2437.qcow2
```
### Set vga console
don't forgot to chage the number of the template > 900 = the id if the template

  ``` bash
  qm set 900 --serial0 socket --vga serial0
```
### Rename Images to more revelante name and change the extention to qcow2
  ``` bash
  mv resolute-minimal-cloudimg-amd64.img ubuntu-26.04.qcow2
```
### Resize image to final disk size
  ``` bash
  qemu-img resize ubuntu-26.04.qcow2 32G
```
### Create disk on local hdd 
  don't forget to change the number of the template , name of the image and the storage location

  ``` bash
  qm importdisk 900 ubuntu-26.04.qcow2 local-lvm
  ```

### Create a vm 
  
  General -> give a name and for ID put something big so its always a the bottom \
  OS -> don't use any media \
  System -> check qemu agent \
  Disks -> delete the disk \
  CPU -> socket 1 core 1 \
  Memory -> 1024 MB \
  Network -> chose a bridge \
  Finish

### On the vm 
  
  go to hardware Add - Cloudinit Drive - local-lvm
  
  on Cloud-Init edit User , Password , IPConfig add SSH public key if you got one

  on Hardware - select the used disk - Edit - Add 
  
  on Options - Edit - select the disk and move it to second position under the cd-rom
  
  Make sure that the Start on boot is set to yes

  And now Convert to template
 
 ---
 *Questions / idea? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*