import { useState } from 'react';
import { createModel } from 'rmox';
import { UserData } from '@/typings/userTypings';

const useAuthModel = () => {
  const [user, setUser] = useState<UserData | null>(null);

  return {
    setUser,
    user,
    isLoggedIn: () => user !== null,
    logout: () => setUser(null),
  };
};

export default createModel(useAuthModel, { global: true });
