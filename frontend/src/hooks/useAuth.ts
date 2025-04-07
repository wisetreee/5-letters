import { useCallback, useEffect, useState } from "react";
import { sendAuthRequest } from "@/api/sendAuthRequest";
import { useUserStore } from "@/store/userStore";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

export const useAuth = (appReady: boolean) => {  
    const [isAuth, setIsAuth] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const { setUser, setAuthData } = useUserStore(); // Деструктурируем для стабильности ссылок

    const getInitData = useCallback(() => {
        //@ts-expect-error turned off because ts can't find window.Telegram 
        const Telegram = window.Telegram;
        if (!Telegram || !Telegram.WebApp || !Telegram.WebApp.initData) {
            if (import.meta.env.DEV) {
                return import.meta.env.VITE_INIT_DATA;
            }
            console.error("Телеграм недоступен");
            return null;
        }
        return Telegram.WebApp.initData;
    }, []);

    const auth = useCallback(async () => {
      if (loading) return;
      try {
        console.log("Текущий API_URL:", import.meta.env);
        if (!appReady) throw new Error("Приложение не готово");
        
        setLoading(true);
        const initData = getInitData();
        if (!initData) {
          setAuthError("Не удалось получить данные от Телеграма");
          setLoading(false);
          return;
        }

        const response = await sendAuthRequest(initData, setAuthError);
        console.log("Auth Response:", response);

        if (!response || !response.user) {
          throw new Error("Некорректный ответ сервера");
        }
        setUser(response.user);
        setAuthData(response.auth_data);
        setIsAuth(true);
        setAuthError(null);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "Неизвестная ошибка аутентификации");
        setAuthError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [appReady, getInitData, loading, setAuthData, setUser]);

    useEffect(() => {
      if (appReady && !isAuth && !loading) {
        auth();
      }
    }, [appReady, isAuth, loading, auth]);

    return { isAuth, authError, loading };
};