// scripts/deploy.ts
import { deployAccount } from '../deployAccount';

async function main() {
  console.log('Starting account deployment...');
  
  try {
    const result = await deployAccount();
    
    console.log('\nDeployment successful!');
    console.log('Transaction hash:', result.transactionHash);
    console.log('User operation hash:', result.userOperationResult.hash);
    
    // Print the transaction receipt in a readable format
    console.log('\nTransaction receipt:');
    console.log(`  Block number: ${result.transactionReceipt.blockNumber}`);
    console.log(`  Gas used: ${result.transactionReceipt.gasUsed}`);
    
    return result;
  } catch (error) {
    console.error('\nDeployment failed:');
    console.error(error);
    process.exit(1);
  }
}

// Execute the script
main()
  .then(() => {
    console.log('\nDeployment process completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Unhandled error during deployment:');
    console.error(error);
    process.exit(1);
  });