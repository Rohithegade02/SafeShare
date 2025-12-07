import { create } from 'zustand';
import type { Share } from '@/types/share.types';
import type { File } from '@/types/file.types';

interface ShareState {
    // Shared files state
    sharedWithMeFiles: File[];
    sharedFilesLoading: boolean;
    sharedFilesError: string | null;
    currentFileShares: Share | null;
    currentSharesLoading: boolean;

    // Actions
    setSharedWithMeFiles: (files: File[]) => void;
    setSharedFilesLoading: (loading: boolean) => void;
    setSharedFilesError: (error: string | null) => void;
    setCurrentFileShares: (shares: Share | null) => void;
    setCurrentSharesLoading: (loading: boolean) => void;
    clearShareState: () => void;
}

export const useShareStore = create<ShareState>((set) => ({
    // Initial state
    sharedWithMeFiles: [],
    sharedFilesLoading: false,
    sharedFilesError: null,
    currentFileShares: null,
    currentSharesLoading: false,

    // Actions
    setSharedWithMeFiles: (files) => set({ sharedWithMeFiles: [...files] }),
    setSharedFilesLoading: (loading) => set({ sharedFilesLoading: loading }),
    setSharedFilesError: (error) => set({ sharedFilesError: error }),
    setCurrentFileShares: (shares) => set({ currentFileShares: shares }),
    setCurrentSharesLoading: (loading) => set({ currentSharesLoading: loading }),
    clearShareState: () =>
        set({
            sharedWithMeFiles: [],
            sharedFilesLoading: false,
            sharedFilesError: null,
            currentFileShares: null,
            currentSharesLoading: false,
        }),
}));
