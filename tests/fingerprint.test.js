import { StableFingerprint } from '../src/fingerprint';

describe('StableFingerprint', () => {
  let fingerprinter;

  beforeEach(() => {
    fingerprinter = new StableFingerprint();
  });

  test('should collect information', () => {
    const data = fingerprinter.collectInformation();
    expect(data).toBeTruthy();
    expect(data.browser).toBeTruthy();
  });

  test('should generate unique fingerprint', () => {
    fingerprinter.collectInformation();
    const fingerprint = fingerprinter.generateUniqueFingerprint();
    expect(fingerprint.length).toBe(512);
  });
});