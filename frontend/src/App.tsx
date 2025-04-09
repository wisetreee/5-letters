import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/components/theme/theme-provider";
import EndlessModePage from "@/pages/EndlessModePage";
import { useInitApp } from "@/hooks/useInitApp";
import { useAuth } from "./hooks/useAuth";
import { SidebarProvider } from "./components/ui/sidebar";
import Header from "./components/Header";

const App = () => {
  const { appReady } = useInitApp();
  const { isAuth, loading, authError } = useAuth(appReady);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {loading ? (
        <div>Загрузка...</div>
      ) : !isAuth ? (
        <div>Ошибка авторизации: {authError} </div>
      ) : (
        <SidebarProvider>
          <Header />
          <main>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/game/endless" element={<EndlessModePage />} />
            </Routes>
          </main>
        </SidebarProvider>
      )}
    </ThemeProvider>
  );
};
export default App;
