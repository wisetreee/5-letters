import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/components/theme/theme-provider";
import EndlessModePage from "@/pages/EndlessModePage";
import { useInitapp } from "@/hooks/useInitApp";
import { useAuth } from "./hooks/useAuth";


const App = () => {
  const { appReady } = useInitapp();
  const { isAuth, loading, authError } = useAuth(appReady);
  
  if(loading) {
    return <div>Загрузка...</div>
  }
  if(!isAuth && !loading) {
    return <div>Ошибка авторизации: {authError}</div>
  }
    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/game/endless" element={<EndlessModePage />} />
        </Routes>
      </main>
    </ThemeProvider> 
  )
};
export default App;
