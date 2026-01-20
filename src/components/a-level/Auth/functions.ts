import { supabase } from '../../../supabase-config';
import type { Signup, Login } from './types';
import api from '../../../utils/api';
// SIGNUP
export const signup = async ({ email, password, name, type }: Signup) => {
  // 1) create auth user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) throw signUpError;

  const userId = signUpData.user?.id;
  if (!userId) {
    throw new Error(
      'Signup succeeded but user id is missing (email confirmation may be required).'
    );
  }

  // 2) store extra fields in your table (recommended: "profiles")

  const { error: profileError } = await supabase
    .from('users')
    .upsert({ id: userId, email, name, type });

  if (profileError) throw profileError;
  console.log(signUpData);
  const localdata=await api.post('/users',{userId,email,name,type});
  if(localdata.data.error){
    throw new Error(localdata.data.error);
  }
  console.log("local data created"+localdata.data);
  return signUpData;
};

// LOGIN
export const login = async ({ email, password }: Login) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.session) {
    throw new Error('Login failed: No active session found.');
  }
  return data;
};

// LOGOUT
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
