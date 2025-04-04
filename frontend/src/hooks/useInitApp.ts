import { useEffect, useState } from "react";


const initTelegramApp = async() => {
    //@ts-expect-error
    const Telegram = window.Telegram;
    if (Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        console.log("Телеграм работает");
        await Telegram.WebApp.expand();
    } else {
        console.error("Телеграм недоступен");
    }
};

export const useInitApp = () : {appReady: boolean} => {
    const [isAppReady, setIsAppReady] = useState(false);
    useEffect(() => {
        initTelegramApp().then(() => {
            setIsAppReady(true);
        });
    }, []);
    return {appReady: isAppReady};
};