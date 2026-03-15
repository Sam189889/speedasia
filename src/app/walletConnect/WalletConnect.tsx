'use client';

import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

interface WalletConnectProps {
  isConnected?: boolean;
  account?: string;
  onConnectChange?: (connected: boolean, address: string) => void;
  showBalance?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Beautiful custom wallet connection component
 * SpeedAsia Gold Theme with smooth animations
 */
const WalletConnect: React.FC<WalletConnectProps> = ({ 
  onConnectChange,
  showBalance = false,
  size = 'md',
  className = ''
}) => {
  const { address, isConnected } = useAccount();
  
  // Update parent component when wallet connection changes
  useEffect(() => {
    if (onConnectChange) {
      if (isConnected && address) {
        onConnectChange(true, address);
      } else {
        onConnectChange(false, '');
      }
    }
  }, [isConnected, address, onConnectChange]);

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
              className="flex items-center"
            >
              {(() => {
                // Not connected - show connect button
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className={`
                        ${sizeClasses[size]}
                        bg-gradient-to-r from-[#D4AF37] to-[#FFD700]
                        hover:from-[#FFD700] hover:to-[#FFA500]
                        text-black font-bold rounded-xl
                        shadow-lg shadow-[#D4AF37]/25
                        hover:shadow-[#FFD700]/50
                        transition-all duration-300
                        hover:scale-[1.02] active:scale-[0.98]
                        flex items-center gap-2
                        border border-[#D4AF37]/30
                      `}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Connect Wallet
                    </button>
                  );
                }

                // Wrong network
                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className={`
                        ${sizeClasses[size]}
                        bg-red-500 hover:bg-red-600
                        text-white font-semibold rounded-xl
                        shadow-lg transition-all duration-300
                        flex items-center gap-2
                      `}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Wrong Network
                    </button>
                  );
                }

                // Connected - show chain and account
                return (
                  <div className="flex items-center gap-2">
                    {/* Chain Button */}
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="
                        flex items-center gap-1.5
                        px-2.5 py-2
                        bg-black/80 hover:bg-black
                        rounded-xl border border-[#D4AF37]/30
                        hover:border-[#D4AF37]/50
                        transition-all duration-200
                      "
                    >
                      {chain.hasIcon && (
                        <div
                          className="w-5 h-5 rounded-full overflow-hidden"
                          style={{ background: chain.iconBackground }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain'}
                              src={chain.iconUrl}
                              className="w-5 h-5"
                            />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Account Button */}
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="
                        flex items-center gap-2
                        px-3 py-2
                        bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10
                        hover:from-[#D4AF37]/20 hover:to-[#FFD700]/20
                        rounded-xl border border-[#D4AF37]/30
                        hover:border-[#D4AF37]/50
                        transition-all duration-200
                      "
                    >
                      {/* Balance */}
                      {showBalance && account.displayBalance && (
                        <span className="text-xs font-medium text-[#D4AF37]">
                          {account.displayBalance}
                        </span>
                      )}

                      {/* Address */}
                      <span className="text-sm font-medium text-white">
                        {account.displayName}
                      </span>

                      {/* Chevron */}
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnect;
