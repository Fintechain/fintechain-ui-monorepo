import { MessageStatus } from "./message";
import { ethers } from "ethers";

export const MESSAGE_TYPE_PACS008 = ethers.keccak256(ethers.toUtf8Bytes("pacs.008"));

// Define required fields for PACS008
export const PACS008_REQUIRED_FIELDS = [
    ethers.id("debtorAgent").slice(0, 10),    // First 4 bytes
    ethers.id("creditorAgent").slice(0, 10),
    ethers.id("token").slice(0, 10),
    ethers.id("amount").slice(0, 10),
    ethers.id("instructionId").slice(0, 10)
];

// types/pacs008.ts
export interface Pacs008Message {
    // Message identification
    messageId: string;
    instructionId: string;
    
    // Financial institutions
    debtorBic: string;   // BIC of the sending bank
    creditorBic: string; // BIC of the receiving bank
    
    // Payment details
    amount: string;      // Payment amount as a string to handle large numbers
    currency: string;    // Currency code (e.g., 'USD', 'EUR')
    
    // Additional fields
    paymentPriority?: 'HIGH' | 'NORMAL';
    settlementDate: string; // ISO date string
    remittanceInfo?: string;
    
    // Status tracking
    status: MessageStatus;
    createdAt: number; // Unix timestamp
}

export interface MessageEvent {
    messageId: string;
    status: string;
    timestamp: number;
    txHash: string;
}