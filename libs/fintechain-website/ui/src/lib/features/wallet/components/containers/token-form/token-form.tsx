import React from 'react';
import { Card, CardBody, Input, Button } from "@material-tailwind/react";

interface TransferFormProps {
    recipientAddress: string;
    transferAmount: string;
    isTransferring: boolean;
    onRecipientChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onTransfer: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({
    recipientAddress,
    transferAmount,
    isTransferring,
    onRecipientChange,
    onAmountChange,
    onTransfer
}) => (
    <Card className="mt-6 bg-dark-300">
        <CardBody className="flex flex-col gap-4">
            <Input
                type="text"
                label="Recipient Address"
                value={recipientAddress}
                color='white'
                variant="outlined" 
                onChange={(e) => onRecipientChange(e.target.value)}
                size="lg"
            />
            <Input
                type="text"
                label="Amount to Transfer"
                value={transferAmount}
                color='white'
                variant="outlined" 
                onChange={(e) => onAmountChange(e.target.value)}
                size="lg"
            />
            <Button
                onClick={onTransfer}
                disabled={isTransferring || !recipientAddress || !transferAmount}
                className="mt-2 bg-accent"
            >
                {isTransferring ? 'Transferring...' : 'Transfer Tokens'}
            </Button>
        </CardBody>
    </Card>
);