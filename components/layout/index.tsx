import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";
import Toast from "./toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 from-60% via-purple-500 via-35% to-pink-200 min-h-screen to-5% text-white flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center flex-col">
        {children}
      </main>

      <Toast />
      <Footer />
    </div>
  );
};

export default Layout;
