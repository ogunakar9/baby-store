import { useEffect, useState } from "react";
import "./styles.scss";
import Card from "../../components/Card";
import { ICardProps } from "../../components/Card/types";

const Home = () => {
  const [products, setProducts] = useState<ICardProps[]>([]);

  useEffect(() => {
    const productGetter = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    };

    productGetter();
  }, []);

  // {
  //     "id": 1,
  //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "price": 109.95,
  //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "rating": {
  //         "rate": 3.9,
  //         "count": 120
  //     }
  // }

  return (
    <div className="card-container">
      {products.map((product) => (
        <Card {...product} key={product.id} />
      ))}
    </div>
  );
};

export default Home;
