'use client';

import { useReadContract } from 'thirdweb/react';
import { useGbt } from '@/hooks/contracts/useSpeed';
import { useState, useEffect } from 'react';

export function useAdminUsersList(page: number = 1, pageSize: number = 20) {
  const [usersList, setUsersList] = useState<string[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Create contract instance
  const contract = useGbt();

  // Get total users count
  const { data: totalUsers, isPending: isLoadingTotal } = useReadContract({
    contract,
    method: "function totalUsers() view returns (uint256)",
    params: []
  });

  const totalUsersCount = totalUsers ? Number(totalUsers) : 0;
  const totalPages = Math.ceil(totalUsersCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalUsersCount);

  // Load users for current page using actual contract calls
  useEffect(() => {
    if (totalUsersCount === 0) {
      setUsersList([]);
      return;
    }

    setIsLoadingUsers(true);

    const loadUsers = async () => {
      const users: string[] = [];

      try {
        // Load each user address from contract
        for (let i = startIndex; i < endIndex; i++) {
          try {
            // Import readContract for direct contract calls
            const { readContract } = await import('thirdweb');

            const userAddress = await readContract({
              contract,
              method: "function allUsers(uint256) view returns (address)",
              params: [BigInt(i)]
            });

            if (userAddress && userAddress !== '0x0000000000000000000000000000000000000000') {
              users.push(userAddress);
            }
          } catch (error) {
            console.error(`Error loading user at index ${i}:`, error);
            // Continue loading other users even if one fails
          }
        }

        setUsersList(users);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsersList([]);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    // Small delay to prevent too many rapid calls
    const timer = setTimeout(loadUsers, 100);
    return () => clearTimeout(timer);
  }, [page, totalUsersCount, startIndex, endIndex]); // Removed contract from dependencies

  return {
    // Data
    usersList,
    totalUsersCount,
    totalPages,
    currentPage: page,
    pageSize,

    // Pagination info
    startIndex: startIndex + 1, // 1-based for display
    endIndex,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,

    // Loading states
    isLoadingUsers,
    isLoadingTotal,
    isLoading: isLoadingUsers || isLoadingTotal,

    // Helper functions
    getPageNumbers: () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, page - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    isEmpty: () => usersList.length === 0 && !isLoadingUsers,

    // Refresh function
    refresh: () => {
      setUsersList([]);
      setIsLoadingUsers(true);
    }
  };
}
