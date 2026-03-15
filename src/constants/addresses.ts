/**
 * Contract addresses - now managed in src/config/env.ts
 * Import from env for type-safe, centralized configuration
 */
import { env } from "@/config/env";

export const SPEED_ADDRESS = env.contracts.speed; // Proxy
export const INT_ADDRESS = env.contracts.interface; // SAW V2
export const USDT_ADDRESS = env.contracts.usdt;
export const ADMIN_ADDRESS = env.contracts.admin;

// Legacy exports for backward compatibility
export {
  SPEED_ADDRESS as SPEED_ADDRESS_TESTNET,
  INT_ADDRESS as INT_ADDRESS_TESTNET,
  USDT_ADDRESS as USDT_ADDRESS_TESTNET,
  ADMIN_ADDRESS as ADMIN_ADDRESS_TESTNET,
};
