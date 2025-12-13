import { useActiveAccount } from 'thirdweb/react';
import { ADMIN_ADDRESS } from '@/constants/addresses';

export function useAdminAuth() {
  const activeAccount = useActiveAccount();

  const isAdmin = activeAccount?.address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
  const isConnected = !!activeAccount?.address;

  return {
    isAdmin,
    isConnected,
    address: activeAccount?.address,
    isLoading: false,
  };
}
