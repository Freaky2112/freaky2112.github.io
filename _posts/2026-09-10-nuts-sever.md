---
layout: default
title: "Building a NUT UPS Monitoring and Shutdown System"
---

# Building a NUT UPS Monitoring and Shutdown System

> A UPS is great, but simply plugging your servers into it isn't enough. The real goal is to make sure the servers **know when the power goes out**, react appropriately, and shut down cleanly before the batteries are exhausted.

After setting up my UPS devices with **Network UPS Tools (NUT)**, I wanted to take things a little further.

The goal was to have one central NUT server managing multiple UPS devices, with remote Linux and Windows machines monitoring those UPS units over the network.

I also wanted a simple web interface to see what was happening.

## The Setup

The basic architecture looks like this:

**UPS → NUT Server → Network → Clients**

My NUT server is connected directly to the UPS devices through USB.

The NUT server handles communication with the UPS hardware and makes the UPS information available over the network.

Remote machines then connect to the NUT server and monitor the UPS status.

This means I don't need to connect every server directly to a UPS.

## Multiple UPS Devices

One of the nice things about NUT is that a single server can manage multiple UPS devices.

In my setup, I have several UPS units connected through USB.

Each UPS gets its own name inside NUT.

For example:

* `tripplite`
* `apc-network`
* `apc-modem`

This makes it possible for clients to monitor a specific UPS depending on which equipment they are protecting.

The important part is identifying each UPS correctly.

`nut-scanner` makes this much easier because it can detect compatible USB UPS devices and provide the information needed for the NUT configuration.

## USB Detection

When troubleshooting a UPS, one of the first things I check is USB detection.

The simplest check is:

`lsusb`

If the UPS appears there, Linux can at least see the USB device.

For more detailed information, `lsusb -D` can be used against the appropriate USB device path.

This can be especially useful when troubleshooting multiple UPS devices that use the same vendor and product IDs.

For example, two APC UPS units may both report the same USB vendor and product ID.

In that situation, the serial number can be used to distinguish between them.

## NUT Server

The NUT server is the central part of the setup.

The UPS drivers communicate directly with the physical UPS devices.

NUT then exposes the UPS information through `upsd`.

The server can provide information such as:

* UPS status
* Battery charge
* Battery runtime
* Input voltage
* Output voltage
* Load
* Battery voltage
* Whether the UPS is online
* Whether the UPS is running on battery

The important part is that clients don't need direct USB access to the UPS.

They simply connect to the NUT server over the network.

## Network Mode

The NUT server runs in:

`MODE=netserver`

This allows remote clients to connect to it.

The NUT server listens on port:

`3493`

Once the server is listening on the network, a remote Linux machine can test the connection with `upsc`.

For example:

`upsc yourupsname@your-nut-server`

If everything is working, NUT will return the UPS information.

This is a great first test before configuring automatic shutdown.

## Remote Linux Clients

The remote Linux machines only need the NUT client components.

They don't need to have the UPS physically connected to them.

The client connects to the central NUT server and monitors the UPS.

The important configuration is the `MONITOR` entry in `upsmon.conf`.

This tells the machine which UPS to monitor and what credentials to use.

The client can then react to events such as:

* UPS goes onto battery
* UPS returns to utility power
* UPS battery becomes critically low
* Communication with the UPS is lost
* A forced shutdown is requested

## Automatic Shutdown

This is where NUT becomes much more useful than simply monitoring battery percentage.

A power outage might only last a few seconds.

In that case, there's no reason to shut down everything immediately.

Instead, the client can wait and see whether power returns.

For longer outages, `upssched` can be used to schedule actions.

For example:

**Power goes out**

↓

**UPS switches to battery**

↓

**Start a timer**

↓

**Power comes back**

↓

**Cancel the timer**

Or:

**Power goes out**

↓

**UPS stays on battery**

↓

**Timer expires**

↓

**Trigger a controlled shutdown**

This gives the system some protection against short power interruptions without unnecessarily shutting down the homelab.

## The Importance of `upssched`

`upssched` is useful because it gives the shutdown process some intelligence.

Instead of:

> Battery detected → immediately shutdown

I can define something closer to:

> Battery detected → wait → check again → shutdown only if the situation continues.

It can also react to communication problems.

For example, if the client temporarily loses communication with the NUT server, a timer can be started rather than immediately shutting down the machine.

If communication comes back, the timer can be cancelled.

This helps avoid unnecessary shutdowns caused by a temporary network or service problem.

## Testing the Shutdown Process

UPS shutdown systems should be tested.

A configuration that looks correct on paper isn't enough.

One simple test is to disconnect the UPS from utility power while keeping the equipment connected to the UPS.

The UPS should switch to battery.

The NUT server should detect the change.

The remote clients should also detect the event.

Logs can then be checked to confirm that everything is behaving as expected.

On Debian-based systems, the system logs can be inspected with:

`tail /var/log/syslog`

Depending on the distribution and logging configuration, `journalctl` can also be useful.

## Webnut

Once the NUT server was working, I wanted an easier way to see the UPS status.

For that, I added **WebNUT**.

WebNUT provides a web interface for viewing information from a NUT server.

I run it as a Docker container.

The container connects to the NUT server over port `3493` and exposes its own web interface on port `6543`.

This gives me a simple dashboard for checking the UPS without having to SSH into the NUT server and run `upsc` manually.

## Docker

The PeaNuts container is intentionally kept separate from the NUT server itself.

The architecture is:

**Physical UPS**

↓

**NUT Server**

↓

**Peanuts Docker Container**

↓

**Web Browser**

This is convenient because Peanuts doesn't need direct access to the USB UPS devices.

It only needs network access to the NUT server.

## Windows Clients

NUT isn't limited to Linux.

Windows machines can also monitor the NUT server.

For Windows, I use **WinNUT Client**.

The Windows client connects to the NUT server in the same general way as a Linux NUT client.

This is particularly useful in a homelab where you might have a mixture of:

* Linux servers
* Windows PCs
* Virtual machines
* NAS systems
* Other network-connected equipment

One UPS can therefore provide power information to many different systems.

## One Central Point of Monitoring

The biggest advantage of this setup is that the UPS hardware doesn't have to be distributed everywhere.

Instead, I have a central NUT server.

Something like:

```text
                 ┌───────────────┐
                 │   UPS #1      │
                 │   Tripp Lite  │
                 └───────┬───────┘
                         │ USB
                 ┌───────▼───────┐
                 │               │
                 │   NUT Server  │
                 │               │
                 └───────┬───────┘
                         │ Network
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
          Linux       Windows     WebNUT
          Client       Client      Docker
```

Additional UPS devices can be connected to the same NUT server.

The result is a centralized UPS monitoring system for the homelab.

## What Happens During a Power Outage?

The complete sequence now looks something like this:

**1. Utility power fails**

The UPS switches to battery.

**2. NUT detects the change**

The NUT driver reports that the UPS is running on battery.

**3. Remote clients receive the event**

Linux and Windows clients know that the UPS is no longer receiving utility power.

**4. Timers can start**

`upssched` can wait for a configurable amount of time.

**5. Power returns**

The UPS goes back online and the timers can be cancelled.

**6. Power stays off**

If the outage continues, the configured shutdown action can be triggered.

**7. Servers shut down cleanly**

Instead of suddenly losing power when the battery dies, the machines have an opportunity to shut down properly.

## Why I Like This Setup

The important part isn't really the web dashboard.

It's the automation behind it.

A UPS protects hardware from sudden power loss, but NUT makes the UPS part of the infrastructure.

Instead of having a UPS silently beep during an outage, the homelab can actually understand what's happening and react to it.

The final setup gives me:

* Multiple UPS devices
* Centralized monitoring
* Remote Linux clients
* Windows client support
* Automatic shutdown
* Delayed shutdown timers
* Web-based monitoring
* USB-level UPS detection
* Network-based UPS access

## Final Thoughts

NUT is one of those homelab services that you don't think about much when everything is working.

That's actually the point.

When the power goes out, I don't want to be scrambling around trying to shut down servers manually.

I want the UPS to detect the outage, NUT to report it, the clients to react, and the systems to shut down cleanly if the outage lasts long enough.

With a central NUT server and network clients, the UPS becomes another managed service in the homelab rather than just a battery sitting underneath a server.

And hopefully, the next power outage will be boring.

## Which is exactly what I want.
