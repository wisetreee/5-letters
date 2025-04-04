import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/components/theme/theme-provider";
import EndlessModePage from "@/pages/EndlessModePage";
import { useInitApp } from "@/hooks/useInitApp";
import { useAuth } from "./hooks/useAuth";


const App = () => {
  const { appReady } = useInitApp();
  const { isAuth, loading, authError } = useAuth(appReady);

    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {loading ? 
      <div>Загрузка...</div> : 
      !isAuth ? 
      <div>Ошибка авторизации: {authError}</div> :
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/game/endless" element={<EndlessModePage />} />
        </Routes>
      </main>
      }
    </ThemeProvider> 
  )
};
export default App;
