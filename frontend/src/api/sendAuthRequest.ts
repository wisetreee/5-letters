import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { sendRequest } from "./sendRequest";
import { authData, userData } from "@/lib/types";
export const sendAuthRequest = async (
      initData: string,
      onError: (error: string) => void
    ) => {
      try {
        const response = await sendRequest<object, {user: userData, auth_data: authData}>(
          `/api/game/auth`,
          'post',
          {initData: initData}
        );   
        if (!response.succeeded || !response.data) {
          onError(response.err || 'No data');
          return null;
        } 
        return response.data;            
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, 'Неизвестная ошибка аутентификации');
        onError(errorMessage);
        return null;
      } 
    };
