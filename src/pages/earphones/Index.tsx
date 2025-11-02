import React from "react";
import Header from "./Header";
import NewProduct from "./NewProduct";
import Gadgets from "../home/Gadgets";
import Footer from "../home/Footer";

const Index: React.FC = () => {
  return (
    <div>
      <Header />
      <NewProduct />
      <Gadgets />
      <Footer />
    </div>
  );
};

export default Index;
