import { sendRequest } from "./sendRequest";
import { authData, userData } from "@/lib/types";
export const sendAuthRequest = async (
      initData: string,
      onError: (error: string) => void
    ) => {
      try {
        const response = await sendRequest<{user: userData, auth_data: authData}, object>(
          `/api/game/auth`,
          'post',
          {initData: initData}
        );   
        if (!response.succeeded || !response.data) {
          onError(response.err || 'No data');
          return null;
        } 
        return response.data;            
      } catch (error: any) {
        onError(error.message);
        return null;
      } 
    };
