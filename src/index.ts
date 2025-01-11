import * as dotenv from "dotenv";
import * as crypto from "crypto";
import { calculateAge } from "@lib/helper";

dotenv.config();

class OneCard {
  private aadhar: string;
  private pan: string;
  private passport: string;
  private voter: string;
  private drivingLicense: string;
  private ration: string;
  private birthCertificate: string;
  private dob: string;
  private isAdmin: boolean;

  private aadharVerified: boolean = false;
  private panVerified: boolean = false;
  private passportVerified: boolean = false;
  private voterVerified: boolean = false;
  private drivingLicenseVerified: boolean = false;
  private rationVerified: boolean = false;
  private birthCertificateVerified: boolean = false;

  private readonly algorithm: string = "aes-256-cbc";
  private readonly key: Buffer = crypto.randomBytes(32);
  private readonly iv: Buffer = crypto.randomBytes(16);

  private data: object = {};

  constructor(
    aadhar?: string,
    pan?: string,
    passport?: string,
    voter?: string,
    drivingLicense?: string,
    ration?: string,
    birthCertificate?: string,
    dob?: string
  ) {
    this.aadhar = aadhar || "NVA";
    this.pan = pan || "NVA";
    this.passport = passport || "NVA";
    this.voter = voter || "NVA";
    this.drivingLicense = drivingLicense || "NVA";
    this.ration = ration || "NVA";
    this.birthCertificate = birthCertificate || "NVA";
    this.dob = dob || "NVA";
    this.isAdmin = false;
    this.updateData();
  }

  setAadhar(aadhar: string): void {
    this.aadhar = aadhar;
    this.updateData();
  }

  setPan(pan: string): void {
    this.pan = pan;
    this.updateData();
  }

  setPassport(passport: string): void {
    this.passport = passport;
    this.updateData();
  }

  setVoter(voter: string): void {
    this.voter = voter;
    this.updateData();
  }

  setDrivingLicense(drivingLicense: string): void {
    this.drivingLicense = drivingLicense;
    this.updateData();
  }

  setRation(ration: string): void {
    this.ration = ration;
    this.updateData();
  }

  setBirthCertificate(birthCertificate: string): void {
    this.birthCertificate = birthCertificate;
    this.updateData();
  }

  setDob(dob: string): void {
    this.dob = dob;
    this.updateData();
  }

  public hasAadhar(): boolean {
    return this.aadhar !== "NVA";
  }

  public hasPan(): boolean {
    return this.pan !== "NVA";
  }

  public hasPassport(): boolean {
    return this.passport !== "NVA";
  }

  public hasVoter(): boolean {
    return this.voter !== "NVA";
  }

  public hasDrivingLicense(): boolean {
    return this.drivingLicense !== "NVA";
  }

  public hasRation(): boolean {
    return this.ration !== "NVA";
  }

  public hasBirthCertificate(): boolean {
    return this.birthCertificate !== "NVA";
  }

  // Document Verification
  public isAadharVerified(): boolean {
    return this.aadharVerified;
  }

  public isPanVerified(): boolean {
    return this.panVerified;
  }

  public isPassportVerified(): boolean {
    return this.passportVerified;
  }

  public isVoterVerified(): boolean {
    return this.voterVerified;
  }

  public isDrivingLicenseVerified(): boolean {
    return this.drivingLicenseVerified;
  }

  public isRationVerified(): boolean {
    return this.rationVerified;
  }

  public isBirthCertificateVerified(): boolean {
    return this.birthCertificateVerified;
  }

  public verifyAadhar(): void {
    if (this.isAdmin) {
      if (this.hasAadhar()) {
        //add logic for verifying
        this.aadharVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyPan(): void {
    if (this.isAdmin) {
      if (this.hasPan()) {
        //add logic for verifying
        this.panVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyPassport(): void {
    if (this.isAdmin) {
      if (this.hasPassport()) {
        //add logic for verifying
        this.passportVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyVoter(): void {
    if (this.isAdmin) {
      if (this.hasVoter()) {
        //add logic for verifying
        this.voterVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyDrivingLicense(): void {
    if (this.isAdmin) {
      if (this.hasDrivingLicense()) {
        //add logic for verifying
        this.drivingLicenseVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyRation(): void {
    if (this.isAdmin) {
      if (this.hasRation()) {
        //add logic for verifying
        this.rationVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  public verifyBirthCertificate(): void {
    if (this.isAdmin) {
      if (this.hasBirthCertificate()) {
        //add logic for verifying
        this.birthCertificateVerified = true;
        this.updateData();
      } else {
        throw new Error("First set the document.");
      }
    } else {
      throw new Error("Only Admin can verify documents.");
    }
  }

  // Get Age
  public getAge(): number {
    if (this.dob === "NVA") return 0;
    const age = calculateAge(this.dob);
    return age;
  }

  public signin(password: string): void {
    if (password === process.env.password) {
      this.isAdmin = true;
      this.updateData();
      console.log("Admin verified.");
    } else {
      throw new Error("Incorrect password");
    }
  }

  // Encrypt Data
  public hashify(): string {
    this.updateData();
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(this.data), "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  // Decrypt Data
  public decrypt(data: string): any {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  }

  // Update Data
  private updateData(): void {
    this.data = {
      hasAadhar: this.hasAadhar(),
      hasPan: this.hasPan(),
      hasPassport: this.hasPassport(),
      hasVoter: this.hasVoter(),
      hasDrivingLicense: this.hasDrivingLicense(),
      hasRation: this.hasRation(),
      hasBirthCertificate: this.hasBirthCertificate(),
      isAadharVerified: this.isAadharVerified(),
      isPanVerified: this.isPanVerified(),
      isPassportVerified: this.isPassportVerified(),
      isVoterVerified: this.isVoterVerified(),
      isDrivingLicenseVerified: this.isDrivingLicenseVerified(),
      isRationVerified: this.isRationVerified(),
      isBirthCertificateVerified: this.isBirthCertificateVerified(),
      age: this.getAge(),
    };
  }
}

export default OneCard;
