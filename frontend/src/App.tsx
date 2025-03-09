import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/components/theme/theme-provider";

const App = () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <main>
        <Routes>
             <Route index element={<Home />}/>
        </Routes>
      </main>
   </ThemeProvider>
  );
  export default App