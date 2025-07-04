// src/LogParser.js

// Data from the latest WiFi_errors.csv
const wifiConnectErrors = {
  '2': 'Scan command issued while device is already associated with an Access Point',
  '3': 'No AP found',
  '4': 'Wrong PSK is issued while the device client tries to join an Access Point with WEP security enabled',
  '5': 'Invalid band',
  '6': 'Association not done or in unassociated state',
  '8': 'De-authentication received from AP',
  '9': 'Failed to associate to Access Point during "Join"',
  'a': 'Invalid channel',
  'e': '1. Authentication failure during "Join" 2. Unable to find AP during join which was found during scan.',
  'f': 'Missed beacon from AP during join',
  '13': 'Non-existent MAC address supplied in "Disassociate" command',
  '14': 'EAP configuration is not done',
  '15': 'Memory allocation failed or Store configuration check sum failed',
  '16': 'Information is wrong or insufficient in Join command',
  '17': 'Not a AP interface',
  '18': 'Push button command given before the expiry of previous push button command',
  '19': 'Scan results do not match with the network profile configured',
  '1a': 'Frequency not supported',
  '1b': 'Invalid opermode',
  '1c': 'EAP/P2P configuration failed or Unable to start Group Owner negotiation',
  '1d': 'Unable to start Group Owner negotiation',
  '20': 'Join timeout',
  '21': '1. Command given in incorrect state 2. SNTP client did not receive a response from server for time update',
  '22': 'Query GO parameters issued in incorrect operating mode',
  '23': 'Unable to form Access Point',
  '24': 'Wrong Scan input parameters supplied to "Scan" command',
  '25': 'Command issued during re-join in progress',
  '26': 'Wrong parameters the command request',
  '27': 'Provision discovery failed in P2P',
  '28': 'PSK length less than 8 bytes or more than 63 bytes',
  '29': 'Failed to clear or to set the Enterprise Certificate (Set Certificate)',
  '2a': 'P2P Go negotiation failed',
  '2b': 'Association between nodes failed in P2P WPS mode due to timeout',
  '2c': 'If a command is issued by the Host when the device is internally executing auto-join or auto-create',
  '2d': 'WEP key is of wrong length',
  '2e': 'ICMP request timeout error',
  '2f': 'ICMP data size exceeds maximum limit',
  '30': 'Send data packet exceeded the limit or length that is mentioned (or) MQTT publish data and publish data length mismatched (or) MQTT Send data packet exceeded the limit.',
  '31': 'ARP Cache entry not found',
  '32': 'UART command timeout happened',
  '33': 'Fixed data rate is not supported by connecting AP',
  '34': 'Maximum length exceeded of Username/password/Client_ID/Topic in MQTT',
  '35': 'Wrong WPS PIN',
  '36': 'Wrong WPS PIN length',
  '37': 'Wrong PMK length',
  '3a': 'SSID not present for PMK generation',
  '3b': 'SSID incorrect for PMK generation(more than 32 bytes)',
  '3c': 'Band not supported',
  '3d': 'User store configuration invalid length',
  '3e': 'Error in length of the command (Exceeds number of characters is mentioned in the PRM)',
  '3f': 'Data packet dropped',
  '40': 'WEP key not given',
  '41': 'Error in length of store config profile',
  '42': 'PSK or PMK not given',
  '43': 'Security mode given in join command is invalid',
  '44': 'Beacon miscount reaches max beacon miscount (De-authentication due to beacon miss)',
  '45': 'De-authentication received from supplicant',
  '46': 'De-authentication received from AP after channel switching',
  '47': 'Synchronization missed',
  '48': 'Authentication timeout occurred',
  '49': 'Association timeout',
  '4a': 'BG scan in given channels is not allowed',
  '4b': 'Scanned SSID and SSID given in Join are not matching',
  '4c': 'Given number of clients exceeded max number of stations supported',
  '4d': 'Given HT capabilities are not supported',
  '4e': 'Uart Flow control not supported',
  '4f': 'ZB/BT/BLE packet received and protocol is not enabled',
  '50': 'MGMT pkt dropped',
  '51': 'Invalid RF current mode',
  '52': 'Power save support is not present for a given interface',
  '53': 'Concurrent AP in connected state',
  '54': 'Connected AP or Station channel mismatch',
  '55': 'IAP co processor error',
  '56': 'WPS not supported in current operating mode',
  '57': 'Concurrent AP doesn\'t have same channel as connected station channel',
  '58': 'PBC session overlap error',
  '59': 'BT feature bit map invalid',
  '5a': '4/4 confirmation of 4 way handshake failed',
  '5b': 'MAC address not present in MAC based join',
  '5c': 'Concurrent mode, both AP and Client should UP, to enable configuration',
  '5d': 'Certificate load not allowed in flash',
  '5e': 'Certificate load not allowed in RAM',
  '5f': 'Certificate load failed due to wrong inx',
  '60': 'AP HT caps not enabled',
  '61': 'Address family not supported by protocol.',
  '62': 'Invalid beacon interval or DTIM period provided.',
  '63': 'Invalid range of the configuration provided',
  '64': 'RTS THRESHOLD Config type is invalid.',
  '65': 'Error with MQTT command',
  '66': 'listen interval in power save is greater than the join listen interval',
  '67': 'Wlan radio deregistered',
  '68': 'SAE failure due to multiple confirm frames from AP',
  '6a': 'AP does not support the EC-group set by station',
  '86': 'Disconnected due to Security Association Query Timeout',
  'af': 'Duplicate entry exists in DNS server table',
  'b1': 'Memory Error: No memory available',
  'b2': 'Invalid characters in JSON object',
  'b3': 'Update Commands: No such key found',
  'b4': 'No such file found: Re-check filename',
  'b5': 'No corresponding Web page exists with same filename',
  'b6': 'Space unavailable for new file',
  'c1': 'Invalid input data, Re-check filename, lengths etc',
  'c2': 'Space unavailable for new file',
  'c3': 'Existing file overwrite: Exceeds size of previous file. Use erase and try again',
  'c4': 'No such file found. Re-check filename',
  'c5': 'Memory Error: No memory available',
  'c6': 'Received more web-page data than the total length initially specified',
  'c7': 'Error in set region command',
  'c8': 'Web-page current chunk length is incorrect',
  'ca': 'Error in AP set region command',
  'cb': 'Error in AP set region command parameters',
  'cc': 'Region code not supported',
  'cd': 'Error in extracting country region from beacon',
  'ce': 'Device does not have selected region support',
  'd1': 'SSL/TLS Context Create Failed',
  'd2': 'SSL/TLS Handshake Failed. Socket will be closed',
  'd3': 'SSL/TLS Max sockets reached. Or FTP client is not connected',
  'd4': 'Cipher set failure',
  'f1': 'HTTP credentials maximum length exceeded',
  'f7': 'Feature not supported',
  'f8': 'Unable to write to flash OR Flash data verification failed',
  'f9': 'Calibration data verification failed',
  '100': 'SNMP internal error',
  '104': 'SNMP invalid IP protocol error',
  'bb01': 'No data received or receive timeout',
  'bb08': 'Insufficient data for converting NTP time to mm-dd-yy time format',
  'bb0a': 'Invalid SNTP server address',
  'bb0b': 'SNTP client not started',
  'bb10': 'SNTP server not available, Client will not get any time update service from current server',
  'bb15': 'SNTP server authentication failed',
  'bb0e': 'Internal error',
  'bb16': 'Entry not found for multicast IP address',
  'bb17': 'No more entries found for multicast',
  'bb21': 'IP address error',
  'bb22': 'Socket already bound',
  'bb23': 'Port not available',
  'bb27': 'Socket is not created',
  'bb29': 'ICMP request failed',
  'bb33': 'Maximum listen sockets reached',
  'bb34': 'DHCP duplicate listen',
  'bb35': 'Port Not in close state',
  'bb36': 'Socket is closed or in process of closing',
  'bb37': 'Process in progress',
  'bb38': 'Trying to connect non-existing TCP server socket',
  'bb3e': 'Error in length of the command(Exceeds number of characters is mentioned in the PRM)',
  'bb40': 'Wrong Packet Info',
  'bb41': 'Corrupted RPS encountered during firmware update',
  'bb42': 'Socket is still bound',
  'bb45': 'No free port',
  'bb46': 'Invalid port',
  'bb49': 'Corrupted RPS header encountered during firmware update',
  'bb4b': 'Feature not supported',
  'bb50': 'Socket is not in connected state. Disconnected from server. In case of FTP, user need to give destroy command after receiving this error',
  'bb87': 'POP3 session creation failed / POP3 session got terminated',
  'bb9c': 'DHCPv6 Handshake failure',
  'bb9d': 'DHCP invalid IP response',
  'bba0': 'SMTP Authentication error',
  'bba1': 'No DNS server was specified, SMTP over size mail data',
  'bba2': 'SMTP invalid server reply',
  'bba3': 'DNS query failed, SMTP internal error',
  'bba4': 'Bad DNS address, SMTP server error code received',
  'bba5': 'SMTP invalid parameters',
  'bba6': 'SMTP packet allocation failed',
  'bba7': 'SMTP GREET reply failed',
  'bba8': 'Parameter error, SMTP Hello reply error',
  'bba9': 'SMTP mail reply error',
  'bbaa': 'SMTP RCPT reply error',
  'bbab': 'SMTP message reply error',
  'bbac': 'SMTP data reply error',
  'bbad': 'SMTP authentication reply error',
  'bbae': 'SMTP server error reply',
  'bbaf': 'DNS duplicate entry.',
  'bbb1': 'SMTP oversize server reply',
  'bbb2': 'SMTP client not initialized',
  'bbb3': 'DNS IPv6 not supported',
  'bbc5': 'Invalid mail index for POP3 mail retrieve command',
  'bbd2': 'SSL/TLS handshake failed',
  'bbd3': 'FTP client is not connected or disconnected with the FTP server',
  'bbd4': 'FTP client is not disconnected',
  'bbd5': 'FTP file is not opened',
  'bbd6': 'SSL/TLS handshake timeout or FTP file is not closed',
  'bbd9': 'Expected [1XX response from FTP server but not received]',
  'bbda': 'Expected [2XX response from FTP server but not received]',
  'bbdb': 'Expected [22X response from FTP server but not received]',
  'bbdc': 'Expected [23X response from FTP server but not received]',
  'bbdd': 'Expected [3XX response from FTP server but not received]',
  'bbde': 'Expected [33X response from FTP server but not received]',
  'bbe1': 'HTTP Timeout',
  'bbe2': 'HTTP Failed',
  'bbe7': 'HTTP Timeout for HTTP PUT client',
  'bbeb': 'Authentication Error',
  'bbed': 'Invalid packet length, content length and received data length is mismatching',
  'bbef': 'Server responds before HTTP client request is complete',
  'bbf0': 'HTTP/HTTPS password is too long',
  'bbf1': 'MQTT ping time out error',
  'bbf2': 'MQTT command sent in incorrect state',
  'xbbf3': 'MQTT ACK time out error',
  'bbff': 'POP3 error for invalid mail index',
  'xffff': 'Listening TCP socket in device is not connected to the remote peer, or the LTCP socket is not yet opened in the device',
  'fffe': 'Sockets not available. The error comes if the Host tries to open more than 10 sockets.',
  'fffd': 'HTTP OTAF invalid packet',
  'fffc': 'TCP_IP initialization failed',
  'fffb': 'Cannot create IP in same interface in concurrent mode',
  'fff4': 'HTTP OTAF incomplete packet',
  'fff5': 'Store configuration profile type mismatch or Invalid profile type',
  'fff6': 'MQTT REMOTE TERMINATE ERROR',
  'fff7': 'Byte stuffing error in AT mode',
  'fff8': '1. Invalid command (e.g. parameters insufficient or invalid in the command). Invalid operation (e.g. power save command with the same mode given twice, accessing wrong socket, creating more than allowed sockets )',
  'fff9': 'HTTP OTAF no packet',
  'xfffa': 'TCP socket is not connected',
  'ffc5': 'Station count exceeded max station supported',
  'ffc4': 'Unable to send TCP data',
  'ffbc': 'Socket buffer too small',
  'ffbb': 'Invalid content in the DNS response to the DNS Resolution query',
  'ffba': 'DNS Class error in the response to the DNS Resolution query',
  'ffb8': 'DNS count error in the response to the DNS Resolution query',
  'ffb7': 'DNS Return Code error in the response to the DNS Resolution query',
  'ffb6': 'DNS Opcode error in the response to the DNS Resolution query',
  'ffb5': 'DNS ID mismatch between DNS Resolution request and response',
  'ffab': 'An invalid input to the DNS Resolution query',
  'ff42': 'DNS response was timed out',
  'ffa1': 'ARP request failure',
  'ff91': 'Unable to update TCP Window',
  'ff9d': 'DHCP lease time expired',
  'ff9c': 'DHCP handshake failure',
  'ff88': 'This error is issued when WebSocket creation failed',
  'ff87': 'This error is issued when device tried to connect to a non-existent TCP server socket on the remote side',
  'ff86': 'This error is issued when tried to close non-existent socket. or invalid socket descriptor',
  'ff85': 'Invalid socket parameters',
  'ff82': 'Feature not supported',
  'ff81': 'Socket already open',
  'ff80': 'Attempt to open more than the maximum allowed number of sockets',
  'xff7e': 'Data length exceeds mss',
  'xff75': 'DUT unable to configure IP Address due to IP conflict',
  'ff74': 'Feature not enabled',
  'ff73': 'DHCP server not set in AP mode',
  'ff71': 'Error in AP set region command parameters',
  'ff70': 'SSL/TLS not supported',
  'ff6f': 'JSON not supported',
  'ff6e': 'Invalid operating mode',
  'ff6d': 'Invalid socket configuration parameters',
  'ff6c': 'Web socket creation timeout',
  'ff6b': 'Parameter maximum allowed value is exceeded',
  'ff6a': 'Socket read timeout',
  'ff69': 'Invalid command in sequence',
  'ff41': 'HTTP socket creation failed',
  'ff40': 'TCP socket close command is issued before getting the response of the previous close command',
  'ff36': 'Wait On Host feature not enabled',
  'ff35': 'Store configuration checksum validation failed',
  'ff33': 'TCP keep alive timed out',
  'ff2d': 'TCP ACK failed for TCP SYN-ACK',
  'ff2c': 'Memory limit exceeded in a given operating mode',
  'ff2a': 'Memory limit exceeded in operating mode during auto join/create',
  'cc2f': 'PUF Operation is blocked',
  'cc31': 'PUF Activation code invalid',
  'cc32': 'PUF input parameters invalid',
  'cc33': 'PUF in error state',
  'xcc34': 'PUF Operation not allowed',
  'xcc35': 'PUF operation Failed',
  '5a5a': 'Auto join or user store configuration going on.',
  'ffe1': 'Improper RSNIE from AP to station',
  'ff5f': 'Reached maximum SNTP Invalid attempts',
  '00fc': 'Frequency offset sent is zero',
  '00fb': 'Frequency offset specified goes beyond the upper limit or lower limit and indicates that frequency offset cannot be changed further',
};

const errorRules = [
  {
    logic: 'SINGLE',
    keywords: ['BATTERY_LEVEL: 0'],
    description: 'Device is not charged. The battery level is reported as 0.',
  },
  {
    logic: 'AND',
    keywords: ['DHCP', 'E: ip addr'],
    description: 'Network issue: The device connects to Wi-Fi but fails to obtain an IP address via DHCP and is subsequently disconnected.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: Connectivity not up'],
    description: 'Possible connection issues. Verify that the network configuration is correct.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: touch FW update'],
    description: 'Touch functionality has malfunctioned. The touch tail might be torn or disconnected. RMA recommended.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: i2c wait 0x4'],
    description: 'An internal component is timing out on the I2C bus. This could indicate physical damage, loose connections, or soldering issues.',
  },
  {
    logic: 'OR',
    keywords: ['vp_dcm_start_display_drivers failed', 'E: Epson init', 'hready failed'],
    description: 'PCBA (Printed Circuit Board Assembly) failure. The device requires RMA. Consult with production to assess repairability.',
  },
  {
    logic: 'OR',
    keywords: ['E: wifi dev fffffff2', 'E: wifi init'],
    description: 'Known network module issue detected. Device requires RMA.',
  },
  {
    logic: 'OR',
    keywords: ['E: vp_dcm_request_display_update failed', 'E: Updating displays failed'],
    description: 'Display is broken or has malfunctioned.',
  },
  {
    logic: 'OR',
    keywords: ['E: missing /app/app.js', 'E: missing JS app'],
    description: 'The main application is missing or not installed. Install the latest update via the AC store.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: SyntaxError: source decode failed (line'],
    description: 'The JavaScript application is corrupt. Report this to the development team, then reinstall the update with "Format device" enabled.',
  },
  {
    logic: 'AND',
    keywords: ['/var/jenkins_home/workspace/Joan_Release/src/vlib/littlefs/lfs.c:', ']:debug: Found pending gstate'],
    description: 'QSPI FLASH memory error detected. Device requires RMA.',
  },
  {
    logic: 'OR',
    keywords: ['qf ### Exception! ###', 'Forced Hard Fault'],
    description: 'File system is full or corrupt. Formatting and reinstalling the JS app may resolve it. If not, the QSPI FLASH may be faulty; RMA required.',
  },
  {
    logic: 'AND',
    keywords: ['waiting for link-up', '***********E: Connectivity not up'],
    description: 'Ethernet connection issue. The device does not support high-speed Ethernet; ask the customer to configure the switch port to 10mbps.',
  },
  {
    logic: 'OR',
    keywords: ['/var/jenkins_home/workspace/Joan_Release/src/vlib/littlefs/lfs.c:', ':debug: Fixing move'],
    description: 'File system issue indicates probable corruption. The device likely needs to be replaced via RMA.',
  },
  {
    logic: 'OR',
    keywords: ['TLS disconnected', 'E: TLS read -173 -173', 'E: PV2 RX: getting TLS data failed'],
    description: 'A TLS connection error occurred. Disable TLS temporarily (using "tls_config_set 0") to diagnose if other issues exist.',
  },
  {
    logic: 'OR',
    keywords: ['BLE FW mismatch!', 'E: BLE'],
    description: 'Bluetooth module is likely malfunctioning. This is not critical; disable Bluetooth with "ble_power 0" if it is not needed.',
  },
  {
    logic: 'AND',
    keywords: ['assert: xQueueSemaphoreTake:', 'rv: '],
    description: 'Frontlight driver issue detected, meaning the frontlight will not work. The device should be functional otherwise. Ask customer if they wish to RMA.',
  },
  {
    logic: 'OR',
    keywords: ['E: FS bad, formatting...', 'assert: block_locate_free:'],
    description: 'File system corruption detected. Attempt to format the file system and redownload the application. If the issue persists, proceed with RMA.',
  },
  {
    logic: 'OR',
    keywords: ['FW Version: 3', 'FW Version: 4'],
    description: 'Device is running very old firmware (PV2 protocol). It needs a firmware update. Connect it to the "fwupdate.dk.visionect.com" server.',
  },
  {
    logic: 'OR',
    keywords: ['E: sntp dns ', 'E: time sync'],
    description: 'Device cannot reach the SNTP server for time synchronization. This could be a DNS issue or a firewall blocking UDP port 123.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: time sync'],
    description: 'Device cannot synchronize time. Ensure UDP port 123 is open on the firewall. Consider setting SNTP to "time.google.com".',
  },
  {
    logic: 'SINGLE',
    keywords: ['-111'],
    description: 'Connection error. Check that the server port is set to 11113. If it is, TCP port 11113 is likely being blocked on the firewall.',
  },
  {
    logic: 'SINGLE',
    keywords: ['init connect'],
    description: 'The device is broken or has malfunctioned. Proceed with an RMA.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: Image dimension'],
    description: 'Image dimension error. Verify that the display type is configured correctly in the VSS.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: General Event:2'],
    description: 'The Wi-Fi module aborted a connection attempt. This typically occurs after multiple failed retries.',
  },
  {
    logic: 'SINGLE',
    keywords: ['SPI lock ch 1: timeout'],
    description: 'Network module issue related to SPI communication. Proceed with an RMA.',
  },
  {
    logic: 'AND',
    keywords: ['### Exception! ###', 'Data access violation'],
    description: 'A critical data access violation exception occurred. This is likely a hardware issue. Proceed with an RMA.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: Updating d'],
    description: 'A hardware issue occurred during a display update. Proceed with an RMA.',
  },
  {
    logic: 'OR',
    keywords: ['BL Version: -1.-1.-1', 'FW Version: -1.-1.-1'],
    description: 'Corrupt firmware or bootloader. Connect the device to a mobile hotspot to trigger an update. If that fails, use the "fwupdate.dk.visionect.com" server.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: Protocol 0x00760000'],
    description: 'Protocol error, often seen on very old devices. Disable "Secure Connection" in the device settings to allow it to connect.',
  },
  {
    logic: 'AND',
    keywords: ['### Exception! ###', 'Usage Unaligned access'],
    description: 'An unaligned memory access exception occurred. This indicates a problem with the QSPI FLASH access (e.g., soldering). Proceed with an RMA.',
  },
  {
    logic: 'SINGLE',
    keywords: ['BATTERY_CURRENT: 0'],
    description: 'The device is not drawing current while connected to USB. This points to a faulty USB cable or a broken charging port on the device. If the port is faulty, proceed with an RMA.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: hdc2080 i2c wr'],
    description: 'The internal humidity & temperature sensor (HDC2080) is not responding on the I2C bus. Proceed with an RMA.',
  },
  {
    logic: 'SINGLE',
    keywords: ['E: rssi ffffffe2'],
    description: 'Wi-Fi signal strength error. The device is reporting a very poor or invalid signal, which can prevent it from connecting. This may indicate a hardware issue with the Wi-Fi module or antenna.',
  },
  {
    logic: 'SPECIAL_VOLTAGE',
    keywords: ['BATTERY_VOLTAGE'],
    description: 'Battery voltage is critically low (<= 3028 mV). This suggests a failing battery. RMA is recommended.',
  },
];

const deviceInfoPatterns = {
  batteryLevel: /BATTERY_LEVEL:\s*(\d+)/,
  firmwareVersion: /FW Version:\s*([\d.-]+)/,
  bootloaderVersion: /BL Version:\s*([\d.-]+)/,
  deviceUUID: /Device:\s*([0-9A-F-]+)/,
  networkModule: /CONN:\s*selected driver\s*(\w+)/,
  ssid: /SSID:\s*(.+)/,
};

export const parseLogFile = (logContent) => {
  const lines = logContent.split('\n');
  const errors = [];
  const deviceInfo = {
    batteryLevel: 'N/A',
    firmwareVersion: 'N/A',
    bootloaderVersion: 'N/A',
    deviceUUID: 'N/A',
    networkModule: 'N/A',
    ssid: 'N/A',
  };

  const foundInfo = {};
  const foundErrorsOnLines = new Set();
  // Regex to capture the alphanumeric code after "E: connect "
  const wifiConnectRegex = /E: connect (\S+)/;

  lines.forEach((line, index) => {
    // Extract Device Info
    for (const key in deviceInfoPatterns) {
      if (!foundInfo[key]) {
        const match = line.match(deviceInfoPatterns[key]);
        if (match && match[1]) {
          deviceInfo[key] = match[1].trim();
          foundInfo[key] = true;
        }
      }
    }

    // --- Check for Wi-Fi Connect Errors from the new CSV ---
    const wifiMatch = line.match(wifiConnectRegex);
    if (wifiMatch && wifiMatch[1]) {
      // Use toLowerCase() for case-insensitive matching (e.g., '3a' vs '3A')
      const errorCode = wifiMatch[1].toLowerCase(); 
      if (wifiConnectErrors[errorCode]) {
        errors.push({
          key: `${index}-wifi-connect`,
          lineNumber: index + 1,
          description: wifiConnectErrors[errorCode],
          logLine: line.trim(),
        });
        foundErrorsOnLines.add(index);
        return; // Skip other rules for this line to prevent duplicates
      }
    }
    
    // --- Existing Error Rules ---
    errorRules.forEach((rule) => {
      if (foundErrorsOnLines.has(index)) return;

      let isMatch = false;
      if (rule.logic === 'SINGLE') {
        if (line.includes(rule.keywords[0])) isMatch = true;
      } else if (rule.logic === 'AND') {
        if (rule.keywords.every((kw) => line.includes(kw))) isMatch = true;
      } else if (rule.logic === 'OR') {
        if (rule.keywords.some((kw) => line.includes(kw))) isMatch = true;
      } else if (rule.logic === 'SPECIAL_VOLTAGE') {
        const match = line.match(/BATTERY_VOLTAGE:\s*(\d+)/);
        if (match && parseInt(match[1], 10) <= 3028) isMatch = true;
      }

      if (isMatch) {
        errors.push({
          key: `${index}-${rule.description}`,
          lineNumber: index + 1,
          description: rule.description,
          logLine: line.trim(),
        });
        foundErrorsOnLines.add(index);
      }
    });
  });

  return { deviceInfo, errors };
};
