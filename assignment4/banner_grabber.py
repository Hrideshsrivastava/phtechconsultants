#!/usr/bin/env python3
"""Grab basic service banners from explicitly supplied lab targets."""

import argparse
import ipaddress
import socket


def valid_ip(value):
    try:
        return str(ipaddress.ip_address(value))
    except ValueError as error:
        raise argparse.ArgumentTypeError(f"Invalid IP address: {value}") from error


def valid_port(value):
    try:
        port = int(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError(f"Invalid port: {value}") from error
    if not 1 <= port <= 65535:
        raise argparse.ArgumentTypeError("Port must be between 1 and 65535")
    return port


def grab_banner(target_ip, port, timeout=3.0):
    """Connect to one TCP port and return its banner, or None on failure."""
    try:
        with socket.create_connection((target_ip, port), timeout=timeout) as sock:
            sock.settimeout(timeout)

            # HTTP servers usually wait for the client to speak first.
            if port in (80, 8000, 8080, 8888):
                request = (
                    f"HEAD / HTTP/1.0\r\nHost: {target_ip}\r\n"
                    "User-Agent: Assignment4-BannerGrabber/1.0\r\n\r\n"
                )
                sock.sendall(request.encode("ascii"))

            data = sock.recv(1024)
            if not data:
                return None
            return data.decode("utf-8", errors="replace").strip()
    except (ConnectionRefusedError, TimeoutError, socket.timeout, OSError):
        return None


def scan_and_grab(target_ip, ports, timeout=3.0):
    findings = {}
    print(f"Target: {target_ip}")
    for port in ports:
        banner = grab_banner(target_ip, port, timeout)
        if banner:
            findings[port] = banner
            first_line = banner.splitlines()[0]
            print(f"Port {port}/tcp: {first_line}")
        else:
            print(f"Port {port}/tcp: no banner, filtered, or closed")
    return findings


def main():
    parser = argparse.ArgumentParser(
        description="Grab banners from ports on a lab system you are authorized to test."
    )
    parser.add_argument("target", type=valid_ip, help="authorized target IP address")
    parser.add_argument(
        "ports",
        nargs="+",
        type=valid_port,
        help="TCP ports discovered by your Nmap scan",
    )
    parser.add_argument(
        "--timeout", type=float, default=3.0, help="timeout in seconds (default: 3)"
    )
    args = parser.parse_args()
    scan_and_grab(args.target, sorted(set(args.ports)), args.timeout)


if __name__ == "__main__":
    main()
