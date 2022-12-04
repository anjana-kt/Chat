import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";
import Toast from "./toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col">
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
