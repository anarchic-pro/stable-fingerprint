# Stable Fingerprint

## Overview

Stable Fingerprint is an advanced browser fingerprinting library that generates a unique, consistent 512-character identifier for a user's browser and device.

Brought to you by Oleg Chirukhin @ Anarchic.

## Installation

```bash
npm install stable-fingerprint
```

## Usage Example

```javascript
import { BrowserFingerprint } from 'stable-fingerprint';

const fingerprinter = new StableFingerprint();
fingerprinter.collectInformation();
const uniqueFingerprint = fingerprinter.generateUniqueFingerprint();
console.log(uniqueFingerprint);
```

## License

Universal Permissive License (UPL)

## Ethical Considerations

This library is designed for:
- Analytics
- Fraud detection
- Session management

Not intended for:
- Persistent user tracking
- Privacy invasion

## Fingerprinting Algorithm Details

The library collects and combines multiple device characteristics to create a robust, unique fingerprint:

### Data Collection Categories

1. **Browser Characteristics**
   - User Agent String
   - Platform
   - Language Settings
   - Cookie Enabled Status
   - Do Not Track Settings

2. **Hardware Information**
   - Hardware Concurrency (CPU Cores)
   - Device Memory
   - Maximum Touch Points
   - Device Pixel Ratio

3. **Screen Details**
   - Screen Width and Height
   - Color Depth
   - Pixel Depth
   - Available Screen Space
   - Screen Orientation

4. **Locale and Timezone**
   - Timezone
   - Timezone Offset
   - Supported Languages

5. **Advanced Fingerprinting Techniques**
   - WebGL Renderer Signature
   - Installed Font Detection
   - Audio Context Signature

### Fingerprint Generation Algorithm

The fingerprint is generated using a custom hashing technique:

1. Collect all device information into a comprehensive JSON object
2. Convert the object to a string representation
3. Apply a non-cryptographic hash function (FNV-1a variant)
   - Uses 32-bit FNV prime (0x01000193)
   - Applies bitwise operations for mixing
4. Extend the initial hash to 512 characters by:
   - Repeating and mixing the initial hash
   - Using character code transformations
   - Ensuring uniform distribution

### Uniqueness Guarantees

- Probability of hash collision: Extremely low
- Consistent across browser sessions
- No personally identifiable information stored
- Works across different browsers and devices
