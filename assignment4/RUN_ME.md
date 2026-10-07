# Assignment 4 — Running the code

Only use these commands against a VM or computer that you own or have explicit
permission to test. Replace `192.168.56.101` with your lab VM's IP address.

## 1. Install requirements

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install nmap python3-pip
python3 -m pip install -r requirements.txt
```

Windows: install Nmap from nmap.org, select the option to add it to `PATH`, then
run:

```powershell
py -m pip install -r requirements.txt
```

## 2. Manual Nmap commands for Q1

```bash
# Find live systems on your own lab-only subnet
nmap -sn 192.168.56.0/24

# TCP SYN scan of all ports (sudo is normally required for -sS)
sudo nmap -sS -p- -T3 -oN syn_scan.txt 192.168.56.101

# Detect services/versions and estimate the operating system
sudo nmap -sV -O -oN service_os_scan.txt -oX service_os_scan.xml 192.168.56.101
```

Interpretation: `open` means an application accepted a connection; `closed`
means the host replied but nothing is listening; `filtered` means Nmap could
not determine the state, usually because a firewall dropped the probes.

## 3. Run the automated scanner for Q2

Linux/macOS:

```bash
python3 nmap_scanner.py 192.168.56.101
python3 nmap_scanner.py 192.168.56.101 192.168.56.102 --ports 1-1000
```

Windows:

```powershell
py nmap_scanner.py 192.168.56.101 --ports 1-1000
```

## 4. Run the vulnerability checks for Q3

Use only the open ports you found in Q1/Q2:

```bash
nmap -sV --script vuln -p 21,22,80,3306 -oN vuln_scan.txt 192.168.56.101
python3 banner_grabber.py 192.168.56.101 21 22 80 3306
```

On Windows, replace `python3` with `py`.

The `vuln` NSE category can include intrusive checks. Run it only in an isolated,
authorized lab. A banner is evidence of a claimed product/version, not proof of
a vulnerability. Confirm apparent findings using the vendor advisory and the
NIST NVD, and record the service, version, CVE, evidence, and remediation.
