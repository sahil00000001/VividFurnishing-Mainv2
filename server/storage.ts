import { users, otpCodes, type User, type InsertUser, type OtpCode } from "@shared/schema";
import { db } from "./db";
import { eq, and, gt, lt } from "drizzle-orm";

// Storage interface for user authentication and OTP functionality
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserEmailVerified(email: string, verified: boolean): Promise<void>;
  
  // OTP methods
  createOtpCode(email: string, code: string): Promise<OtpCode>;
  getValidOtpCode(email: string, code: string): Promise<OtpCode | undefined>;
  markOtpCodeAsUsed(id: string): Promise<void>;
  cleanupExpiredOtpCodes(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserEmailVerified(email: string, verified: boolean): Promise<void> {
    await db
      .update(users)
      .set({ emailVerified: verified, updatedAt: new Date() })
      .where(eq(users.email, email));
  }

  // OTP methods
  async createOtpCode(email: string, code: string): Promise<OtpCode> {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const [otpCode] = await db
      .insert(otpCodes)
      .values({ email, code, expiresAt })
      .returning();
    return otpCode;
  }

  async getValidOtpCode(email: string, code: string): Promise<OtpCode | undefined> {
    const [otpCode] = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code),
          eq(otpCodes.used, false),
          gt(otpCodes.expiresAt, new Date())
        )
      );
    return otpCode || undefined;
  }

  async markOtpCodeAsUsed(id: string): Promise<void> {
    await db
      .update(otpCodes)
      .set({ used: true })
      .where(eq(otpCodes.id, id));
  }

  async cleanupExpiredOtpCodes(): Promise<void> {
    await db
      .delete(otpCodes)
      .where(lt(otpCodes.expiresAt, new Date()));
  }
}

export const storage = new DatabaseStorage();
