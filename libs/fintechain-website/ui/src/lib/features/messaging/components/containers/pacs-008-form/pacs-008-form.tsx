import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button,
    Alert,
    Spinner
} from "@material-tailwind/react";
import {
    ArrowPathIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import { ethers } from 'ethers';
import type { Dispatch, RootState } from '@fintechain-monorepo/fintechain-website-data';
import { MessageStatus } from '@fintechain-monorepo/fintechain-website-data';
import { Pacs008Message } from 'libs/fintechain-website/data/src/lib/features/messaging/types/pacs008';

interface FormState {
    debtorAgent: string;
    creditorAgent: string;
    token: string;
    amount: string;
    targetChain: string;
}

const initialFormState: FormState = {
    debtorAgent: '',
    creditorAgent: '',
    token: '',
    amount: '',
    targetChain: '0'
};

const Pacs008Form = () => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [isInitializing, setIsInitializing] = useState(true);

    const dispatch = useDispatch<Dispatch>()
    const messageState = useSelector((state: RootState) => state.message);

    // Initialize contracts when component mounts
    useEffect(() => {
        const initialize = async () => {
            try {
                setIsInitializing(true);
                await dispatch.message.initializeContract();
            } catch (err) {
                console.error('Failed to initialize:', err);
            } finally {
                setIsInitializing(false);
            }
        };

        initialize();

        return () => {
            dispatch.message.resetState();
        };
    }, [dispatch.message]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): string | null => {
        if (!ethers.isAddress(formState.debtorAgent)) {
            return "Invalid debtor agent address";
        }
        if (!ethers.isAddress(formState.creditorAgent)) {
            return "Invalid creditor agent address";
        }
        if (!ethers.isAddress(formState.token)) {
            return "Invalid token address";
        }
        if (isNaN(Number(formState.amount)) || Number(formState.amount) <= 0) {
            return "Invalid amount";
        }
        if (isNaN(Number(formState.targetChain))) {
            return "Invalid target chain";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        const validationError = validateForm();
        if (validationError) {
            console.error(validationError);
            return;
        }
    
        try {
            const message = {
                debtorAgent: formState.debtorAgent,
                creditorAgent: formState.creditorAgent,
                token: formState.token,
                amount: formState.amount,
                // For the handler address, we should use the PACS008 handler contract address
                // This should be configured somewhere in your application
                handler: "0x3949405ac9ff14bffb3D17C601e810B0ca75DeE3" // Replace with actual handler address
            };
            console.log('Form submitting message', message);
            const result = await dispatch.message.submitPACS008Message(message);
    
            // Reset form on success
            if (result) {
                setFormState(initialFormState);
            }
        } catch (err: any) {
            console.error('Message submission failed:', err);
        }
    };

    if (isInitializing) {
        return (
            <Card className="w-full">
                <CardBody className="flex items-center justify-center p-8">
                    <Spinner className="h-8 w-8" />
                    <Typography variant="h6" className="ml-2">
                        Initializing contracts...
                    </Typography>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card className="w-full bg-dark">
                <CardHeader
                    variant="gradient"
                    className="mb-4 p-6 bg-accent"
                >
                    <Typography variant="h6" color="white">
                        Submit PACS.008 Message
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-dark-300 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Debtor Agent"
                                name="debtorAgent"
                                size="lg"
                                placeholder="0x..."
                                value={formState.debtorAgent}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                color='white'
                            />
                            <Input
                                label="Creditor Agent"
                                name="creditorAgent"
                                size="lg"
                                placeholder="0x..."
                                value={formState.creditorAgent}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                color='white'
                            />
                            <Input
                                label="Token Address"
                                name="token"
                                size="lg"
                                placeholder="0x..."
                                value={formState.token}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                color='white'
                            />
                            <Input
                                label="Amount"
                                name="amount"
                                type="number"
                                size="lg"
                                placeholder="1.0"
                                value={formState.amount}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                color='white'
                            />
                            <Input
                                label="Target Chain"
                                name="targetChain"
                                type="number"
                                size="lg"
                                value={formState.targetChain}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                color='white'
                            />
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            className="flex items-center justify-center gap-2 bg-accent"
                        >
                            Submit Message
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Pacs008Form;