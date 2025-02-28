"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@account-kit/react";
import { 
  getSmartAccountClient,
  initializeSmartAccountClient,
  getCFAddress,
  setPrivateKey,
  /*extendWithMultiOwnerActions*/
} from "@/backend/modularaccount";

import { deployAccount, isAccountDeployed } from "@/deployAccount";


export default function AccountComponent() {
  const { account, address, isLoadingAccount } = useAccount({
    type: "MultiOwnerModularAccount",
  });
  
  const [smartAccountClient, setSmartAccountClient] = useState<any>(null);
  const [clientStatus, setClientStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txStatus, setTxStatus] = useState<'idle' | 'sending' | 'waiting' | 'confirmed' | 'error'>('idle');
  const [isDeployed, setIsDeployed] = useState(false);
  const [isCheckingDeployment, setIsCheckingDeployment] = useState(false);
  const [cfAddress, setCfAddress] = useState<string | null>(null);
  const [recoveryKey, setRecoveryKey] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);

  // Initialize client
  useEffect(() => {
    const initClient = async () => {
      try {
        // Get EOA address from stored private key
        const cfa = await getCFAddress();
        setCfAddress(cfa);

        // Check for existing client first
        let client = getSmartAccountClient();
        
        if (!client) {
          // Initialize a new client if none exists
          client = await initializeSmartAccountClient();
        }
        
        if (client) {
          // Extend the client with multi-owner actions
          /*const extendedClient = extendWithMultiOwnerActions(client);
          setSmartAccountClient(extendedClient);
          setClientStatus('ready');
        } else {
          throw new Error("Failed to initialize smart account client");
        }
      } catch (error) {
        console.error("Error initializing smart account client:", error);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setClientStatus('error');
      }
    };*/
          setSmartAccountClient(client);
          setClientStatus('ready');
          } else {
          throw new Error("Failed to initialize smart account client");
        }
      } catch (error) {
        console.error("Error initializing smart account client:", error);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setClientStatus('error');
      }
    };

    initClient();
  }, []);

  // Check if account is deployed
  useEffect(() => {
    if (!address || clientStatus !== 'ready') return;

    const checkDeployment = async () => {
      setIsCheckingDeployment(true);
      try {
        const deployed = await isAccountDeployed(address);
        setIsDeployed(deployed);
      } catch (error) {
        console.error("Error checking deployment:", error);
      } finally {
        setIsCheckingDeployment(false);
      }
    };

    checkDeployment();
  }, [address, clientStatus, txStatus]);

  // Function to deploy the account
  const handleDeployAccount = async () => {
    if (!smartAccountClient || isDeployed) return;
    
    try {
      setTxStatus('sending');
      setErrorMessage(null);
      
      // Send the user operation to deploy the account
      const result = await deployAccount();
      
      setTxHash(result.transactionHash);
      setTxStatus('confirmed');
      
    // Check deployment status again after transaction is confirmed
      const deployed = await isAccountDeployed(address || "");
      setIsDeployed(deployed);
      
    } catch (error) {
      console.error("Error deploying account:", error);
      setErrorMessage(error instanceof Error ? error.message : String(error));
      setTxStatus('error');
    }
  };

  // Function to recover account using private key
  const handleRecoverAccount = async () => {
    if (!recoveryKey) {
      setErrorMessage("Please enter a private key");
      return;
    }
    
    try {
      setIsRecovering(true);
      setErrorMessage(null);
      
      // Set the new private key for account recovery
      setPrivateKey(recoveryKey);
      
      // Reset the client status to force reinitialization
      setClientStatus('loading');
      setSmartAccountClient(null);
      
      // Re-initialize with the new key
      const client = await initializeSmartAccountClient();
      if (client) {
        setSmartAccountClient(client);
        setClientStatus('ready');
        
        // Update EOA address
        const cfa = await getCFAddress();
        setCfAddress(cfa);
        
        // Clear the recovery key input
        setRecoveryKey("");
      } else {
        throw new Error("Failed to initialize client with recovery key");
      }
    } catch (error) {
      console.error("Error recovering account:", error);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      
      {isLoadingAccount ? (
        <p className="text-gray-500">Loading account details...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Account Address</h3>
            <p className="font-mono text-sm break-all bg-gray-50 p-2 rounded">{address || "Not available"}</p>
            </div>
            
            {cfAddress && (
            <div>
              <h3 className="font-medium">Counterfactual Address</h3>
              <p className="font-mono text-sm break-all bg-gray-50 p-2 rounded">{cfAddress}</p>
              <p className="text-xs text-gray-500 mt-1">This is the generated counterfactual address for your smart account</p>
            </div>
          )}
          
          {account && (
            <div>
              <h3 className="font-medium">Account Type</h3>
              <p>{account.type}</p>
            </div>
          )}
          
          <div>
            <h3 className="font-medium">Deployment Status</h3>
            {isCheckingDeployment ? (
              <p className="text-gray-500">Checking deployment status...</p>
            ) : isDeployed ? (
              <div className="bg-green-50 p-2 rounded">
                <p className="text-green-600">Account is deployed on-chain</p>
              </div>
            ) : (
              <div className="bg-yellow-50 p-2 rounded">
                <p className="text-yellow-600">Account is not deployed yet</p>
                {clientStatus === 'ready' && (
                  <button
                    onClick={handleDeployAccount}
                    disabled={txStatus === 'sending' || txStatus === 'waiting'}
                    className="mt-2 px-3 py-1 bg-blue-500 text-black rounded text-sm hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    {txStatus === 'sending' ? "Sending User Operation..." : 
                     txStatus === 'waiting' ? "Waiting for Confirmation..." : 
                     "Deploy Account"}
                  </button>
                )}
              </div>
            )}
            
            {txHash && (
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-sm text-black">Transaction Hash:</p>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs break-all text-blue-600 hover:underline"
                >
                  {txHash}
                </a>
                {txStatus === 'confirmed' && (
                  <p className="text-green-600 text-sm mt-1">Transaction confirmed!</p>
                )}
              </div>
            )}
            
            {errorMessage && (
              <div className="mt-3 p-3 bg-red-50 rounded">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium">Smart Account Client</h3>
            {clientStatus === 'loading' && <p className="text-gray-500">Initializing smart account client...</p>}
            {clientStatus === 'error' && (
              <div className="text-red-500">
                <p>Error initializing client: {errorMessage}</p>
              </div>
            )}
            {clientStatus === 'ready' && (
              <div className="bg-green-50 p-2 rounded text-black">
                <p className="text-green-600">Smart account client initialized successfully</p>
                {smartAccountClient && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-gray-600">Show client details</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-auto text-xs text-left">
                      {JSON.stringify({ 
                        chainId: smartAccountClient.chain?.id, 
                        account: smartAccountClient.account?.address,
                        type: smartAccountClient.account?.type || "ModularAccount"
                      }, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
            </div>
            {/* Account Recovery Section */}
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Account Recovery</h3>
            <p className="text-sm text-gray-600 mb-2">
              Recover your account by entering your private key
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={recoveryKey}
                onChange={(e) => setRecoveryKey(e.target.value)}
                placeholder="Enter private key with or without 0x prefix"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleRecoverAccount}
                disabled={isRecovering || !recoveryKey}
                className="px-3 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isRecovering ? "Recovering..." : "Recover"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Note: This will replace your current account with the recovered one.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}