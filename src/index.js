import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";
const hour = new Date().getHours();
const isOpen = hour >= 10 && hour < 22;

function App() {
  return (
    <div className="container">
      <Flag />
      <Header />
      <Hero />
      <Menu />
      <Footer />
      <Flag />
    </div>
  );
}
function Flag() {
  return (
    <div className="flag">
      <div className="green"></div>
      <div className="white"></div>
      <div className="red"></div>
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <p className="hours">Daily 10am - 10pm</p>
      <div className="brand">
        <h1>Pizzeria Amore</h1>
        {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
      </div>
      <p className={isOpen ? "status open" : "status closed"}>
        {isOpen ? "Open now" : "Closed now"}
      </p>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h2>Fresh Italian pizza, made with love</h2>
      <p>Stone-baked in Naples style. Pick your favourite below.</p>
    </section>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Popular Pizzas</h2>
      <p className="menu-hint">
        Tap the heart to save a favourite. Use - and + to choose how many.
      </p>

      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
            soldOut={pizza.soldOut}
          />
        ))}
      </ul>
    </main>
  );
}
function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={soldOut ? "pizza sold-out" : "pizza"}>
      {soldOut && <span className="badge">Sold out</span>}
      <FavButton />
      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span className="price">{soldOut ? "Not available" : "$" + price}</span>
      {!soldOut && <Quantity />}
    </li>
  );
}
function FavButton() {
  const [isFav, setIsFav] = useState(false);

  function handleClick() {
    setIsFav(!isFav);
  }

  return (
    <button className={isFav ? "fav-btn active" : "fav-btn"} onClick={handleClick}>
      {isFav ? "♥" : "♡"}
    </button>
  );
}
function Quantity() {
  const [qty, setQty] = useState(0);

  function handleMinus() {
    if (qty > 0) setQty(qty - 1);
  }

  function handlePlus() {
    if (qty < 10) setQty(qty + 1);
  }

  return (
    <div className="qty">
      <Button onClick={handleMinus}>-</Button>
      <span>{qty}</span>
      <Button onClick={handlePlus}>+</Button>
    </div>
  );
}
function Button(props) {
  return (
    <button className="qty-btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
function Footer() {
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={10} />
      ) : (
        <p className="closed-msg">Sorry, we're closed. We open daily from 10am.</p>
      )}
      <p className="copyright">Pizzeria Amore - Made with love in React</p>
    </footer>
  );
}
function Order({ closeHour = 10 }) {
  function handleOrder() {
    alert("Thanks for your order!");
  }

  return (
    <div className="order">
      <p>We're currently open until {closeHour}pm.</p>
      <button className="btn" onClick={handleOrder}>
        Order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
