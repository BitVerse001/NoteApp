import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
