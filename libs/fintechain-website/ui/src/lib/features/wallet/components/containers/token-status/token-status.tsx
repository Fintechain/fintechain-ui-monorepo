import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { TokenState } from '@fintechain-monorepo/fintechain-website-data';

interface TokenStatusProps {
    tokenState: TokenState;
}

export const TokenStatus: React.FC<TokenStatusProps> = ({ tokenState }) => (
    <Card className="mt-6 bg-dark-300 text-white">
        <CardBody>
            {/* <Typography className="mb-2">
                <span className="">Network:</span> 
                <span className="font-extrabold"> {tokenState.networkName || 'Not connected'}</span> 
                
            </Typography> */}
            <Typography className="mb-2 text-xl">
                <span className="font-bold text-accent-light">Connected Account:</span> 
                <span className=""> {tokenState.account || 'Not connected'}</span> 
            </Typography>
            <Typography className="mb-2 text-xl">
                <span className="font-bold text-accent-light">Token Name:</span>
                <span className=""> {tokenState.tokenName || 'Not available'}</span> 
            </Typography>
            <Typography className="mb-2 text-xl">
                <span className="font-bold text-accent-light">Token Symbol:</span>
                <span className=""> GFSD</span> 
            </Typography>
            <Typography className='text-2xl '>
                <span className="font-bold text-accent-light">Balance:</span> 
                <span className=""> {tokenState.balance ? `${tokenState.balance} tokens` : 'Not available'}</span> 
            </Typography>
        </CardBody>
    </Card>
);
