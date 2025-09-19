import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, sendOtpSchema, verifyOtpSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required for security");
}
const jwtSecret: string = JWT_SECRET;

// Simple in-memory rate limiting
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limit = rateLimiter.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimiter.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (limit.count >= MAX_ATTEMPTS) {
    return false;
  }
  
  limit.count++;
  return true;
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send email with OTP (mock implementation - replace with real email service)
async function sendOTPEmail(email: string, otp: string): Promise<void> {
  console.log(`📧 OTP for ${email}: ${otp}`);
  // In production, integrate with email service like SendGrid, AWS SES, etc.
  // For now, we'll just log it to console for testing
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Cleanup expired OTP codes periodically
  setInterval(() => {
    storage.cleanupExpiredOtpCodes().catch(console.error);
  }, 5 * 60 * 1000); // Every 5 minutes

  // User Signup
  app.post("/api/signup", async (req, res) => {
    try {
      console.log("Signup request body:", req.body);
      const validatedData = insertUserSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);

      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // User Login
  app.post("/api/login", async (req, res) => {
    try {
      // Rate limiting for login attempts
      const clientKey = `login_${req.ip || 'unknown'}_${req.body.email || 'unknown'}`;
      if (!checkRateLimit(clientKey)) {
        return res.status(429).json({ error: "Too many login attempts. Please try again later." });
      }

      const validatedData = loginSchema.parse(req.body);

      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Send OTP
  app.post("/api/send-otp", async (req, res) => {
    try {
      // Rate limiting for OTP requests
      const clientKey = `otp_${req.ip || 'unknown'}_${req.body.email || 'unknown'}`;
      if (!checkRateLimit(clientKey)) {
        return res.status(429).json({ error: "Too many OTP requests. Please try again later." });
      }

      const validatedData = sendOtpSchema.parse(req.body);

      // Generate OTP
      const otp = generateOTP();

      // Store OTP in database
      await storage.createOtpCode(validatedData.email, otp);

      // Send OTP via email
      await sendOTPEmail(validatedData.email, otp);

      res.json({
        message: "OTP sent successfully to your email",
        email: validatedData.email,
      });
    } catch (error) {
      console.error("Send OTP error:", error);
      res.status(400).json({ error: "Failed to send OTP" });
    }
  });

  // Verify OTP
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const validatedData = verifyOtpSchema.parse(req.body);

      // Find valid OTP code
      const otpCode = await storage.getValidOtpCode(validatedData.email, validatedData.otp);
      if (!otpCode) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Mark OTP as used
      await storage.markOtpCodeAsUsed(otpCode.id);

      // Update user email verification status
      await storage.updateUserEmailVerified(validatedData.email, true);

      res.json({
        message: "OTP verified successfully",
        email: validatedData.email,
        verifiedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
