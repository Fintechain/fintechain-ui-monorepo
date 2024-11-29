import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import type { Dispatch, RootState } from '@fintechain-monorepo/fintechain-website-data';
import { TokenStatus } from '../token-status/token-status';
import { TransferForm } from '../token-form/token-form';
import { Alert } from "@material-tailwind/react";

interface ErrorAlertProps {
    error: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
    if (!error) return null;

    return (
        <Alert
            color="red"
            variant="gradient"
            className="mb-4"
        >
            {error}
        </Alert>
    );
};

// components/TokenInteraction/LoadingState.tsx
import { Spinner } from "@material-tailwind/react";

export const LoadingState: React.FC = () => (
    <Card className="w-full">
        <CardBody className="flex flex-col items-center justify-center p-8">
            <Spinner className="h-12 w-12 mb-4" />
            <Typography variant="h5">
                Initializing...
            </Typography>
        </CardBody>
    </Card>
);

export const TokenInteraction: React.FC = () => {
    const [transferAmount, setTransferAmount] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [isInitializing, setIsInitializing] = useState(true);

    const dispatch = useDispatch<Dispatch>();

    const tokenState = useSelector((state: RootState) => state.token) ?? {
        error: '',
        networkName: '',
        account: '',
        tokenName: '',
        balance: '',
        isTransferring: false
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                setIsInitializing(true);
                await dispatch.token.initializeContract();
            } catch (err) {
                console.error('Failed to initialize:', err);
            } finally {
                setIsInitializing(false);
            }
        };

        initialize();

        return () => {
            dispatch.token.resetState();
        };
    }, [dispatch.token]);

    const handleTransfer = async () => {
        if (!tokenState) return;

        try {
            await dispatch.token.transfer({
                to: recipientAddress,
                amount: transferAmount
            });
            setTransferAmount('');
            setRecipientAddress('');
        } catch (err) {
            console.error('Transfer failed:', err);
        }
    };

    if (isInitializing) {
        return <LoadingState />;
    }

    return (
        <div className='w-full p-10'>
            <Card className="bg-dark">
                <CardHeader
                    variant="gradient"
                    className="p-6 bg-accent"
                >
                    <Typography variant="h3" color="white">
                        Token Interaction
                    </Typography>
                </CardHeader>

                <CardBody className="flex flex-col gap-4 p-6">
                    <ErrorAlert error={tokenState.error} />

                    <TokenStatus tokenState={tokenState} />

                    {/* <Button
                        onClick={() => dispatch.token.switchNetwork()}
                        className="mt-4 bg-dark-500"
                    >
                        Switch to Hardhat Network
                    </Button> */}

                    <TransferForm
                        recipientAddress={recipientAddress}
                        transferAmount={transferAmount}
                        isTransferring={tokenState.isTransferring}
                        onRecipientChange={setRecipientAddress}
                        onAmountChange={setTransferAmount}
                        onTransfer={handleTransfer}
                    />
                </CardBody>
            </Card>

        </div>
    );
};

export default TokenInteraction;