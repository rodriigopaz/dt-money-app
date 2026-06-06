import { FormLoginParams } from "@/screens/Login/LoginForm";
import { FormRegisterParams } from "@/screens/Register/RegisterForm";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response";
import { IUser } from "@/shared/interfaces/user.interface";
import * as AuthServices from "@/shared/services/dtMoney/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await AuthServices.authenticate(userData);

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token }),
    );

    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: FormRegisterParams) => {
    const { user, token } = await AuthServices.registerUser(formData);

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token }),
    );

    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {};

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");

    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;

      setUser(user);
      setToken(token);
    }

    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
