import { useEffect, useState } from "react";
import { sendAuthRequest } from "@/api/sendAuthRequest";
// import { useUserStore } from "@/store/userStore";

export const useAuth = (appReady: boolean) => {  
    const [isAuth, setIsAuth] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // const setUser = useUserStore((state) => state.setUser);
    // const setAuthData = useUserStore((state) => state.setAuthData);

    const getInitData = () => {
        //@ts-expect-error
        const Telegram = window.Telegram;
        if (!Telegram || !Telegram.WebApp || !Telegram.WebApp.initData) {
            console.error("Телеграм недоступен");
            return null;
        }
        return Telegram.WebApp.initData;
    };

    const auth = async () => {
      try {
        if (!appReady) throw new Error("Приложение не готово");
        setLoading(true);
        const initData = getInitData();
        if (!initData) {
          throw new Error("Не удалось получить данные от Телеграма");
        }

        const response = await sendAuthRequest(initData, setAuthError);
        console.log("Auth Response:", response);

        if (!response || !response.user) {
          throw new Error("Ошибка авторизации: некорректный ответ сервера");
        }
        console.log(response.user);
        console.log(response.auth_data);
        // setUser(response.user);
        // setAuthData(response.auth_data);
        setIsAuth(true);
      } catch (error: any) {
        setAuthError(error.message || "Неизвестная ошибка авторизации");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      auth();
    }, [appReady]); // Добавляем зависимость, чтобы запускалось при `appReady`

    return { isAuth, authError, loading };
};