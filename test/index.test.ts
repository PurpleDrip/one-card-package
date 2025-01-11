import { calculateAge } from "../lib/helper";
import OneCard from "../src/index";

describe("OneCard Class", () => {
  const aadhar = "123456789012";
  const pan = "ABCDE1234F";
  const passport = "Z1234567";
  const drivingLicense = "DL1234567890";
  const ration = "R1234567";
  const birthCertificate = "BC123456";
  const dob = "1990-01-01";

  let oneCard: OneCard;

  beforeEach(() => {
    oneCard = new OneCard(
      aadhar,
      pan,
      passport,
      drivingLicense,
      ration,
      birthCertificate,
      dob
    );
  });

  // Test 1: Check if documents are available
  test("should return true for available documents", () => {
    expect(oneCard.hasAadhar()).toBe(true);
    expect(oneCard.hasPan()).toBe(true);
    expect(oneCard.hasPassport()).toBe(true);
    expect(oneCard.hasVoter()).toBe(true);
    expect(oneCard.hasDrivingLicense()).toBe(true);
    expect(oneCard.hasRation()).toBe(true);
    expect(oneCard.hasBirthCertificate()).toBe(true);
  });

  test("should return false for missing documents (NVA)", () => {
    // Test with missing documents
    const oneCard2 = new OneCard();

    expect(oneCard2.hasAadhar()).toBe(false);
    expect(oneCard2.hasPan()).toBe(false);
    expect(oneCard2.hasPassport()).toBe(false);
    expect(oneCard2.hasVoter()).toBe(false);
    expect(oneCard2.hasDrivingLicense()).toBe(false);
    expect(oneCard2.hasRation()).toBe(false);
    expect(oneCard2.hasBirthCertificate()).toBe(false);
  });

  test("should return true for some available and some missing documents", () => {
    // Test with only a few documents
    const oneCard3 = new OneCard("123456789012", "ABCDE1234F");

    expect(oneCard3.hasAadhar()).toBe(true);
    expect(oneCard3.hasPan()).toBe(true);
    expect(oneCard3.hasPassport()).toBe(false);
    expect(oneCard3.hasVoter()).toBe(false);
    expect(oneCard3.hasDrivingLicense()).toBe(false);
    expect(oneCard3.hasRation()).toBe(false);
    expect(oneCard3.hasBirthCertificate()).toBe(false);
  });

  test("should correctly handle undefined optional parameters", () => {
    // Testing with undefined parameters
    const oneCard4 = new OneCard(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );

    expect(oneCard4.hasAadhar()).toBe(false);
    expect(oneCard4.hasPan()).toBe(false);
    expect(oneCard4.hasPassport()).toBe(false);
    expect(oneCard4.hasVoter()).toBe(false);
    expect(oneCard4.hasDrivingLicense()).toBe(false);
    expect(oneCard4.hasRation()).toBe(false);
    expect(oneCard4.hasBirthCertificate()).toBe(false);
  });

  // Test 3: Age calculation based on DOB
  test("should calculate age correctly", () => {
    const oneCard6 = new OneCard(
      "NVA",
      "NVA",
      "NVA",
      "NVA",
      "NVA",
      "NVA",
      "NVA",
      "1990-01-01"
    ); // Initialize with dob
    const age = oneCard6.getAge();
    const expectedAge = calculateAge("1990-01-01");

    expect(age).toBe(expectedAge);
  });

  // Test 4: Encryption and Decryption
  test("should encrypt and decrypt data correctly", () => {
    const encryptedData = oneCard.hashify();
    expect(encryptedData).toBeDefined();

    const decryptedData = oneCard.decrypt(encryptedData);
    expect(decryptedData).toBeDefined();
    expect(decryptedData.age).toBe(oneCard.getAge());
    expect(decryptedData.hasAadhar).toBe(oneCard.hasAadhar());
    expect(decryptedData.isAadharVerified).toBe(oneCard.isAadharVerified());
  });

  // Test 5: Verify document flags are false initially
  test("should initialize document flags to false", () => {
    expect(oneCard.isAadharVerified()).toBe(false);
    expect(oneCard.isPanVerified()).toBe(false);
    expect(oneCard.isPassportVerified()).toBe(false);
    expect(oneCard.isVoterVerified()).toBe(false);
    expect(oneCard.isDrivingLicenseVerified()).toBe(false);
    expect(oneCard.isRationVerified()).toBe(false);
    expect(oneCard.isBirthCertificateVerified()).toBe(false);
  });

  test("Performing random operations", () => {
    const oneCard5 = new OneCard();

    oneCard5.setAadhar("123456789012");
    oneCard5.setDrivingLicense("12345");

    const encryptData = oneCard5.hashify();
    const decryptedData = oneCard5.decrypt(encryptData);

    expect(oneCard5.isAadharVerified()).toBe(false);
    expect(oneCard5.isDrivingLicenseVerified()).toBe(false);
    expect(encryptData).toBeDefined();
    expect(decryptedData.isAadharVerified).toBe(oneCard5.isAadharVerified());
  });

  test("Attempt to login and verify documents", () => {
    const oneCard7 = new OneCard();

    oneCard7.setAadhar("12345678");
    oneCard7.signin("thepasswordisthatiamhim");
    oneCard7.verifyAadhar();

    const encrypted = oneCard7.hashify();
    const decrypted = oneCard7.decrypt(encrypted);
    expect(decrypted.isAadharVerified).toBe(true);
  });

  test("Attempt to login and verify documents with wrong password.", () => {
    const oneCard7 = new OneCard();

    oneCard7.setAadhar("12345678");

    expect(() => oneCard7.signin("123456789")).toThrow("Incorrect password");
  });

  test("Attempt to login and verify documents without an actual document.", () => {
    const oneCard7 = new OneCard();

    oneCard7.setAadhar("12345678");
    oneCard7.signin("thepasswordisthatiamhim");

    expect(() => oneCard7.verifyPan()).toThrow("First set the document.");
  });

  test("Attempt to login and verify documents without signing.", () => {
    const oneCard8 = new OneCard();

    oneCard8.setAadhar("12345678");

    expect(() => oneCard8.verifyAadhar()).toThrow(
      "Only Admin can verify documents."
    );
  });
});
