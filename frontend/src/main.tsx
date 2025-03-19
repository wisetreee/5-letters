import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import { init, miniApp } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { InitData} from "@telegram-apps/sdk-react";


const initializeTelegramSDK = async () => {
  try {
    await init();

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      const { initDataRaw, initData } = retrieveLaunchParams();
      console.log();
      console.log('Mini App готово');
      console.log(initData);
    }

  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
};

initializeTelegramSDK();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
