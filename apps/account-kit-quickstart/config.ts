import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import {
  alchemy,
  sepolia
} from "@account-kit/infra";
import { SupportedAccountTypes } from "@account-kit/core";
import { SmartAccountClientOptsSchema } from "@aa-sdk/core";
import { QueryClient } from "@tanstack/react-query";
import { z } from "zod";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [
        { "type": "email", "emailMode": "otp" }
      ],
      [
        { "type": "passkey" },
        { "type": "social", "authProviderId": "google", "mode": "popup" }
      ],
      [
        { "type": "external_wallets", "walletConnect": { "projectId": "14adcea61e46beec211e72dc912f7b22" } }
      ]
    ],
  addPasskeyOnSignup: true,
  },
}; 

export const config = createConfig(
  {
    transport: alchemy({ apiKey: "wDY33OUpyOid6cyriRdVEhFCWaHrQ6vl"  }),
    
    chain: sepolia,
    ssr: true, // more about ssr: https://accountkit.alchemy.com/react/ssr
    storage: cookieStorage, // more about persisting state with cookies: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state
    enablePopupOauth: true, // must be set to "true" if you plan on using popup rather than redirect in the social login flow
    policyId: "29778054-e618-4d38-a2e6-7211b09b3835",
  },
  uiConfig
);

export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";

export const chain = sepolia; 

export const queryClient = new QueryClient();

type SmartAccountClientOptions = z.infer<typeof SmartAccountClientOptsSchema>;
export const accountClientOptions: Partial<SmartAccountClientOptions> = {
  txMaxRetries: 20,
} as const;
