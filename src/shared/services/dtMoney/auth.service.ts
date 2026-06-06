import { FormLoginParams } from "@/screens/Login/LoginForm";
import { dtMoneyApi } from "@/shared/api/dtmoney";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response";

export const authenticate = async (
  userData: FormLoginParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData,
  );

  return data;
};
