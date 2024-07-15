import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ViewInvoice from "./pages/ViewInvoice";
import NewInvoice from "./pages/NewInvoice";

export default function App() {

  return (
    <BrowserRouter>
      <div className="bg-slate-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewInvoice" element={<NewInvoice />} />
          <Route path="/viewinvoice/:invoiceid" element={<ViewInvoice />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}