'use client';

import React, { useEffect } from 'react';
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from '@/client/client';
import { chain } from '@/chain/chain';

interface WalletConnectProps {
  isConnected?: boolean;
  account?: string;
  onConnectChange?: (connected: boolean, address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ 
  onConnectChange 
}) => {
  const activeAccount = useActiveAccount();
  
  // Update parent component when wallet connection changes
  useEffect(() => {
    if (onConnectChange) {
      if (activeAccount?.address) {
        onConnectChange(true, activeAccount.address);
      } else {
        onConnectChange(false, '');
      }
    }
  }, [activeAccount, onConnectChange]);

  // Define supported wallets
  const wallets = [
    createWallet("com.safepal"),
    createWallet("com.trustwallet.app"),
    createWallet("walletConnect"),
    createWallet("pro.tokenpocket"),
    createWallet("io.metamask"),
  ];

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      chain={chain}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
        title: "Connect Your Wallet",
      }}
      theme={darkTheme({
        colors: { 
          primaryButtonBg: "hsl(280, 67%, 55%)",
          primaryButtonText: "hsl(0, 0%, 100%)",
          accentButtonBg: "hsl(280, 67%, 55%)",
          accentButtonText: "hsl(0, 0%, 100%)",
        },
      })}
    />
  );
};

export default WalletConnect;
