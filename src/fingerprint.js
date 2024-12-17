export class StableFingerprint {
    constructor() {
        this.fingerprintData = null;
    }

    // Method to gather comprehensive device information
    collectInformation() {
        this.fingerprintData = {
            // Basic browser and system information
            browser: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack
            },

            // Hardware characteristics
            hardware: {
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory || 'Unknown',
                maxTouchPoints: navigator.maxTouchPoints,
                devicePixelRatio: window.devicePixelRatio
            },

            // Screen details
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                orientation: screen.orientation?.type
            },

            // Timezone and locale
            locale: {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                languages: navigator.languages
            },

            // Plugin and extension information
            plugins: Array.from(navigator.plugins).map(plugin => ({
                name: plugin.name,
                description: plugin.description
            })),

            // Advanced fingerprinting techniques
            advanced: {
                webgl: this._getWebGLFingerprint(),
                fonts: this._detectInstalledFonts(),
                audioContext: this._getAudioContextSignature()
            },

            // Timestamps and unique markers
            timestamps: {
                collectionTime: new Date().toISOString(),
                browserInitTime: performance.timeOrigin
            }
        };

        return this.fingerprintData;
    }

    // Method to pretty print the collected information
    prettyPrint() {
        if (!this.fingerprintData) {
            console.warn('No fingerprint data collected. Run collectInformation() first.');
            return;
        }

        console.group('🔍 Detailed Browser Fingerprint');
        
        const printObject = (obj, indent = '  ') => {
            for (const [key, value] of Object.entries(obj)) {
                if (value && typeof value === 'object') {
                    console.log(`${indent}${key}:`);
                    printObject(value, indent + '  ');
                } else {
                    console.log(`${indent}${key}: ${value}`);
                }
            }
        };

        printObject(this.fingerprintData);
        console.groupEnd();
    }

    // Method to generate a unique 512-character fingerprint
    generateUniqueFingerprint() {
        if (!this.fingerprintData) {
            throw new Error('No fingerprint data collected. Run collectInformation() first.');
        }

        // Convert collected data to a string for hashing
        const dataString = JSON.stringify(this.fingerprintData);
        
        // Advanced hashing technique to generate a long, unique fingerprint
        const hash = this._advancedHash(dataString);
        
        return hash;
    }

    // Internal method for WebGL fingerprinting
    _getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return 'WebGL Unavailable';

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return debugInfo 
                ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                : 'Limited WebGL Info';
        } catch {
            return 'WebGL Error';
        }
    }

    // Internal method to detect installed fonts
    _detectInstalledFonts() {
        const testFonts = [
            'Arial', 'Helvetica', 'Times New Roman', 'Courier', 
            'Verdana', 'Georgia', 'Palatino', 'Garamond', 
            'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black'
        ];

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        return testFonts.filter(font => {
            context.font = `12px "${font}", sans-serif`;
            const baseWidth = context.measureText('abcdefghijklmnopqrstuvwxyz').width;
            
            context.font = `12px serif`;
            const serifWidth = context.measureText('abcdefghijklmnopqrstuvwxyz').width;
            
            return baseWidth !== serifWidth;
        });
    }

    // Internal method for audio context signature
    _getAudioContextSignature() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            
            oscillator.type = 'triangle';
            oscillator.connect(analyser);
            analyser.connect(audioContext.destination);
            oscillator.start(0);

            const audioData = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(audioData);
            
            oscillator.disconnect();
            audioContext.close();

            return audioData.slice(0, 20).join('');
        } catch {
            return 'Audio Signature Unavailable';
        }
    }

    // Advanced hashing method to generate a long, unique fingerprint
    _advancedHash(str) {
        let hash = 0x811c9dc5;
        const prime = 0x01000193;

        for (let i = 0; i < str.length; i++) {
            hash = ((hash ^ str.charCodeAt(i)) * prime) & 0xffffffff;
        }

        // Convert to a 512-character hexadecimal string
        const baseHash = hash.toString(16).padStart(8, '0');
        let extendedHash = baseHash;

        // Extend the hash to 512 characters by repeating and mixing
        while (extendedHash.length < 512) {
            const mixedPart = this._mixHash(extendedHash);
            extendedHash += mixedPart;
        }

        return extendedHash.substr(0, 512);
    }

    // Helper method to mix and extend the hash
    _mixHash(currentHash) {
        let mixedHash = '';
        for (let i = 0; i < currentHash.length; i++) {
            const charCode = currentHash.charCodeAt(i);
            mixedHash += ((charCode * 17) % 256).toString(16).padStart(2, '0');
        }
        return mixedHash;
    }
}

// Optional: Export as default
export default StableFingerprint;