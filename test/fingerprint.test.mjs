const chai = require('chai');
const expect = chai.expect;

describe('StableFingerprint', function() {
    let fingerprinter;
  
    beforeEach(function() {
      fingerprinter = new StableFingerprint();
    });
  
    it('should collect information', function() {
      const data = fingerprinter.collectInformation();
      expect(data).to.exist;
      expect(data.browser).to.exist;
    });
  
    it('should generate unique fingerprint', function() {
      fingerprinter.collectInformation();
      const fingerprint = fingerprinter.generateUniqueFingerprint();
      expect(fingerprint).to.have.lengthOf(512);
    });
  });