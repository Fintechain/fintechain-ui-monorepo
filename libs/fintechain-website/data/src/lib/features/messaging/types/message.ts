// types/message.ts

/**
 * Represents the possible states of a message in the system.
 * Maps directly to the MessageStatus enum in the MessageRegistry smart contract.
 */
export enum MessageStatus {
    /**
     * Initial state when a message is first registered
     */
    PENDING = 0,

    /**
     * Message has been delivered to the target chain/handler
     */
    DELIVERED = 1,

    /**
     * Message has been successfully processed by the handler
     */
    PROCESSED = 2,

    /**
     * Message processing or delivery has failed
     */
    FAILED = 3,

    /**
     * Message has been cancelled by sender or admin
     */
    CANCELLED = 4,

    /**
     * Message has been settled (final state after processing)
     */
    SETTLED = 5
}

/**
 * Interface for tracking message state changes
 */
export interface MessageStatusInfo {
    /**
     * Unique identifier of the message
     */
    messageId: string;

    /**
     * Current status of the message
     */
    status: MessageStatus;

    /**
     * Hash of the delivery transaction (if applicable)
     */
    deliveryHash?: string;

    /**
     * ID of the settlement transaction (if applicable)
     */
    settlementId?: string;

    /**
     * Whether message processing was successful
     */
    processingSuccess?: boolean;

    /**
     * Timestamp of the last status update
     */
    lastUpdated: number;
}

/**
 * Core message state interface
 */
export interface MessageState {
    /**
     * All submitted messages
     */
    messages: any[]; // Replace 'any' with your specific message type

    /**
     * Whether a message operation is in progress
     */
    isPending: boolean;

    /**
     * Current error message, if any
     */
    error: string | null;

    /**
     * Last processed block number
     */
    lastProcessedBlock: number;

    /**
     * Whether the event listeners are active
     */
    isListening: boolean;

    /**
     * Log of message events
     */
    eventLogs: Array<{
        txHash: string;
        messageId: string;
        status: string;
        timestamp: number;
    }>;

    /**
     * Tracking information for each message
     */
    messageTracking: {
        [messageId: string]: MessageStatusInfo;
    };
}

/**
 * Helper type for message status updates
 */
export type MessageStatusUpdate = {
    messageId: string;
    status: MessageStatus;
    timestamp: number;
};

/**
 * Helper function to get status description
 */
export const getMessageStatusDescription = (status: MessageStatus): string => {
    switch (status) {
        case MessageStatus.PENDING:
            return "Message is waiting to be processed";
        case MessageStatus.DELIVERED:
            return "Message has been delivered to the target";
        case MessageStatus.PROCESSED:
            return "Message has been successfully processed";
        case MessageStatus.FAILED:
            return "Message processing has failed";
        case MessageStatus.CANCELLED:
            return "Message has been cancelled";
        case MessageStatus.SETTLED:
            return "Message has been settled";
        default:
            return "Unknown status";
    }
};

/**
 * Helper function to check if a status is final
 */
export const isMessageStatusFinal = (status: MessageStatus): boolean => {
    return [
        MessageStatus.PROCESSED,
        MessageStatus.FAILED,
        MessageStatus.CANCELLED,
        MessageStatus.SETTLED
    ].includes(status);
};

/**
 * Helper function to determine if a status transition is valid
 */
export const isValidStatusTransition = (
    currentStatus: MessageStatus,
    newStatus: MessageStatus
): boolean => {
    switch (currentStatus) {
        case MessageStatus.PENDING:
            return [MessageStatus.DELIVERED, MessageStatus.FAILED].includes(newStatus);
        case MessageStatus.DELIVERED:
            return [MessageStatus.PROCESSED, MessageStatus.FAILED].includes(newStatus);
        case MessageStatus.PROCESSED:
            return [MessageStatus.SETTLED].includes(newStatus);
        case MessageStatus.FAILED:
        case MessageStatus.CANCELLED:
        case MessageStatus.SETTLED:
            return false; // Final states
        default:
            return false;
    }
};