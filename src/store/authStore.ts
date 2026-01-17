import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../supabase-config';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User | null, session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  initializeAuth: () => () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setAuth: (user, session) =>
    set({
      user,
      session,
      isAuthenticated: !!session,
    }),

  setLoading: isLoading => set({ isLoading }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isLoading: false,
      });
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isLoading: false,
      });

      // You can handle navigation in components that use this store
      // by checking the event type
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.email);
      }

      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });

    // Return cleanup function
    return () => subscription.unsubscribe();
  },
}));
