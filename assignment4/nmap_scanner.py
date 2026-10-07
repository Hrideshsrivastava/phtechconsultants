#!/usr/bin/env python3
"""Run an Nmap service scan against explicitly supplied lab targets."""

import argparse
import ipaddress
import sys

try:
    import nmap
except ImportError:
    print("Missing dependency. Install it with: python -m pip install python-nmap")
    sys.exit(1)


def valid_ip(value):
    """Accept only individual IPv4 or IPv6 addresses, not hostnames or subnets."""
    try:
        return str(ipaddress.ip_address(value))
    except ValueError as error:
        raise argparse.ArgumentTypeError(f"Invalid IP address: {value}") from error


def scan_host(target_ip, port_range="1-1000"):
    """Run service/version detection and return the PortScanner result."""
    scanner = nmap.PortScanner()
    scanner.scan(hosts=target_ip, ports=port_range, arguments="-sV")
    return scanner


def print_open_ports(scanner, target_ip):
    """Print open ports and return them as a list of dictionaries."""
    findings = []

    if target_ip not in scanner.all_hosts():
        print(f"Host: {target_ip} (no response or not scanned)")
        return findings

    state = scanner[target_ip].state()
    print(f"Host: {target_ip} ({state})")
    if state != "up":
        return findings

    for protocol in sorted(scanner[target_ip].all_protocols()):
        ports = scanner[target_ip][protocol]
        for port in sorted(ports.keys()):
            details = ports[port]
            if details.get("state") != "open":
                continue

            service = details.get("name") or "unknown"
            product = details.get("product") or ""
            version = details.get("version") or ""
            extra = details.get("extrainfo") or ""
            description = " ".join(
                part for part in (product, version, extra) if part
            ) or "version unknown"

            print(
                f"  Port {port}/{protocol} -- {service} -- open -- {description}"
            )
            findings.append(
                {
                    "port": port,
                    "protocol": protocol,
                    "service": service,
                    "product": product,
                    "version": version,
                }
            )

    if not findings:
        print("  No open ports found in the selected range.")
    return findings


def scan_multiple_targets(target_list, port_range="1-1000"):
    """Scan each supplied target and return {IP: [open-port records]}."""
    summary = {}
    for target_ip in target_list:
        print(f"\nScanning authorized target {target_ip}...")
        try:
            scanner = scan_host(target_ip, port_range)
            summary[target_ip] = print_open_ports(scanner, target_ip)
        except nmap.PortScannerError as error:
            print(f"Nmap error for {target_ip}: {error}")
            summary[target_ip] = []
        except OSError as error:
            print(f"System error for {target_ip}: {error}")
            summary[target_ip] = []
    return summary


def main():
    parser = argparse.ArgumentParser(
        description="Scan open ports/services on lab systems you are authorized to test."
    )
    parser.add_argument(
        "targets",
        nargs="+",
        type=valid_ip,
        help="one or more authorized target IP addresses",
    )
    parser.add_argument(
        "--ports",
        default="1-1000",
        help="Nmap port expression (default: 1-1000; example: 21,22,80,443)",
    )
    args = parser.parse_args()

    summary = scan_multiple_targets(args.targets, args.ports)

    print("\nCombined summary")
    print("----------------")
    for host, findings in summary.items():
        ports = ", ".join(
            f"{item['port']}/{item['protocol']} ({item['service']})"
            for item in findings
        )
        print(f"{host}: {ports or 'no open ports found'}")


if __name__ == "__main__":
    main()
