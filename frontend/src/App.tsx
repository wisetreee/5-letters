import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/components/theme/theme-provider";
import EndlessModePage from "./pages/EndlessModePage";

const App = () => (

  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <main>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/game/endless" element={<EndlessModePage />} />
      </Routes>
    </main>
  </ThemeProvider>
);
export default App;
