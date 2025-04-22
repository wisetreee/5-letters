import { useCallback, useEffect, useRef, useState } from "react";
import { sendAuthRequest } from "@/api/sendAuthRequest";
import { useUserStore } from "@/store/userStore";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

export const useAuth = (appReady: boolean) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const retryDelay = 3000;

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
      retryCount.current = 0;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(
        error,
        "Неизвестная ошибка аутентификации",
      );
      setAuthError(errorMessage);
      retryCount.current += 1;
      if (retryCount.current < maxRetries) {
        setTimeout(() => {
          if (!isAuth) auth();
        }, retryDelay);
      }
    } finally {
      setLoading(false);
    }
  }, [appReady, getInitData, isAuth, loading, setAuthData, setUser]);

  useEffect(() => {
    if (appReady && !isAuth && retryCount.current === 0) {
      auth();
    }
  }, [appReady, isAuth, auth]);

  return { isAuth, authError, loading };
};
