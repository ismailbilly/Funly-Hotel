import Header from "../components/Header"
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {/* <div className="container mx-auto">
          <SearchBar />
        </div> */}
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout
