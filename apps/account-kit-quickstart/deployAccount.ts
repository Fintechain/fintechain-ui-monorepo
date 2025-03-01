import { initializeSmartAccountClient, getSmartAccountClient } from "@/backend/modularaccount";
import type { SendUserOperationResult } from "@aa-sdk/core";

/**
 * Deploys the modular account by sending a user operation with 0 value and no data
 * @returns Promise with the transaction hash if successful
 */
export async function deployAccount() {
    // Try to get existing client first, initialize if needed
    let smartAccountClient = getSmartAccountClient();

    if (!smartAccountClient) {
    smartAccountClient = await initializeSmartAccountClient();
  }
    
    if (!smartAccountClient) {
        throw new Error("Failed to initialize smart account client");
    }

    try {
    const result: SendUserOperationResult =
        await smartAccountClient.sendUserOperation({
            uo: {
                target: smartAccountClient.account?.address || "0x0",
                data: "0x",
                value: 0n,
            },
        });
    
  console.log("User operation result: ", result);

    console.log(
        "\nWaiting for the user operation to be included in a mined transaction..."
    );

    const txHash = await smartAccountClient.waitForUserOperationTransaction(
        result
    );

    console.log("\nTransaction hash: ", txHash);

    const userOpReceipt = await smartAccountClient.getUserOperationReceipt(
        result.hash as `0x${string}`
    );

    console.log("\nUser operation receipt: ", userOpReceipt);

    const txReceipt = await smartAccountClient.waitForTransactionReceipt({
        hash: txHash,
    });

    return {
      userOperationResult: result,
      transactionHash: txHash,
      userOperationReceipt: userOpReceipt,
      transactionReceipt: txReceipt
    };

} catch (error) {
    console.error("Error in transaction: ", error);
    throw error;
}
}

/**
 * Checks if an account is deployed by querying its code
 * @param address The account address to check
 * @returns Promise<boolean> True if deployed, false otherwise
 */

export async function isAccountDeployed(address: string): Promise<boolean> {
  try {
      if (!address) return false;
      
       // Try to get existing client first, initialize if needed
    let smartAccountClient = getSmartAccountClient();
    
    if (!smartAccountClient) {
      smartAccountClient = await initializeSmartAccountClient();
    }
    
    if (!smartAccountClient) return false;
    
    // Get the bytecode at the account address
    const code: any = await smartAccountClient.transport.request({
      method: 'eth_getCode',
      params: [address, 'latest']
    });
    
    // If there's code (not "0x"), the account is deployed
    return code !== "0x" && code.length > 2;
  } catch (error) {
    console.error("Error checking account deployment:", error);
    return false;
  }
}