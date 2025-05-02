import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/author/:authorId" element={<Author />} /> {/* Ensure you handle authorId in Author component */}
            <Route path="/item-details/:itemId" element={<ItemDetails />} /> {/* Ensure you handle itemId in ItemDetails component */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
