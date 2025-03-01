import { createModularAccountAlchemyClient } from "@account-kit/smart-contracts";
import { LocalAccountSigner } from "@aa-sdk/core";
import { accountClientOptions, chain } from "@/config";
import { alchemy } from "@account-kit/infra";
import { generatePrivateKey } from "viem/accounts";

import { multiOwnerPluginActions } from "@account-kit/smart-contracts"; //extends actions of msca multi owner plugin
 
let _smartAccountClient: Awaited<ReturnType<typeof createModularAccountAlchemyClient>> | null = null;

// Storage key for the private key
const PRIVATE_KEY_STORAGE_KEY = 'smartAccount_privateKey';

/**
 * Gets the private key from storage or generates a new one
 * @returns The private key as a 0x-prefixed hex string
 */
function getOrCreatePrivateKey(): `0x${string}` {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // For server-side rendering, we need to generate a temporary key
    // This will be replaced with the stored key when running in the browser
    console.warn('Running in SSR mode, generating temporary key');
    return generatePrivateKey();
  }
    
    // Try to get the key from localStorage
  let privateKey = localStorage.getItem(PRIVATE_KEY_STORAGE_KEY);
  
  // If no key exists, generate and store a new one
  if (!privateKey) {
    privateKey = generatePrivateKey();
    localStorage.setItem(PRIVATE_KEY_STORAGE_KEY, privateKey);
    console.log('Generated and stored new private key');
  }
  
  return privateKey as `0x${string}`;
}


export async function initializeSmartAccountClient() {
    if (!_smartAccountClient) {
        try {
        
        // Get the private key from storage or create a new one
        const privateKey = getOrCreatePrivateKey();
        _smartAccountClient = await createModularAccountAlchemyClient({
        chain,
        transport: alchemy({ apiKey: "wDY33OUpyOid6cyriRdVEhFCWaHrQ6vl" }), // Use the http transport that the function expects
          signer: LocalAccountSigner.privateKeyToAccountSigner(privateKey),
          policyId: "29778054-e618-4d38-a2e6-7211b09b3835",

            // Spread the accountClientOptions from your config
            ...accountClientOptions
        });
            
       return _smartAccountClient;
    } catch (error) {
      console.error("Error initializing smart account client:", error);
      throw error;
    }
  }
  
  return _smartAccountClient;
}

/**
 * Gets the current smart account client instance if available
 * @returns The current smart account client or null if not initialized
 */
export const getSmartAccountClient = () => _smartAccountClient;

/**
 * Gets the counterfactual address from the stored private key
 * @returns Promise with the EOA address
 */
export async function getCFAddress(): Promise<string | null> {
  try {
    // Get the private key from storage
    const privateKey = getOrCreatePrivateKey();
    
    // Create the signer and get the address
    const signer = LocalAccountSigner.privateKeyToAccountSigner(privateKey);
    return await signer.getAddress();
  } catch (error) {
    console.error("Error getting counterfactual address:", error);
    return null;
  }
}

/**
 * Sets a specific private key to use (for account recovery)
 * @param privateKey The private key to use as a 0x-prefixed hex string
 */
export function setPrivateKey(privateKey: string): void {
  if (typeof window === 'undefined') {
    console.warn('Cannot set private key in SSR mode');
    return;
  }
  
  // Ensure the key has 0x prefix
  const formattedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  
  // Store the key
  localStorage.setItem(PRIVATE_KEY_STORAGE_KEY, formattedKey);
  
  // Reset the client so it will be reinitialized with the new key
  _smartAccountClient = null;
  
  console.log('Updated private key, client will be reinitialized');
}


// Extend the client with additional actions from the multi-owner plugin
export const extendWithMultiOwnerActions = (client: Awaited<ReturnType<typeof createModularAccountAlchemyClient>>) => {
    return client.extend(multiOwnerPluginActions);
};