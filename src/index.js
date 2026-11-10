import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";

// Shop opening hours: 10am to 10pm (Lesson 5, Activity 7)
const openHour = 10;
const closeHour = 22;
const hour = new Date().getHours();
const isOpen = hour >= openHour && hour < closeHour;

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Header banner. Tagline only shows when the shop is open (&& operator, Lesson 4)
function Header() {
  return (
    <header className="header">
      <div className="flag" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="welcome">Benvenuti a</p>
      <h1>Pizzeria Amore</h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
      {/* Easy-to-see open / closed badge (ternary, Lesson 4) */}
      <p className={isOpen ? "status open" : "status closed"}>
        {isOpen ? "● Open now" : "● Closed now"} · {openHour}am – {closeHour - 12}pm
      </p>
    </header>
  );
}

// Menu: loops through the pizza array with map() and a key (Lesson 4)
function Menu() {
  return (
    <main className="menu">
      <section className="menu-title">
        <h2>Il Nostro Menu</h2>
        <p>Our menu · Tap ♡ to like a pizza, use − and + to choose how many.</p>
      </section>

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

// Reusable Pizza component with destructured props (Lesson 5)
function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={soldOut ? "pizza sold-out" : "pizza"}>
      <img src={photoName} alt={name} />
      <div className="pizza-info">
        <div className="pizza-top">
          <h3>{name}</h3>
          <span className="price">{soldOut ? "Sold out" : "$" + price}</span>
        </div>
        <p>{ingredients}</p>
        <div className="pizza-bottom">
          {/* Quantity picker only shows if the pizza is not sold out (&&, Lesson 4) */}
          {!soldOut && <Quantity />}
          <FavButton />
        </div>
      </div>
    </li>
  );
}

// Extra feature 1: Favourite heart (state, Lesson 8)
function FavButton() {
  const [isFav, setIsFav] = useState(false);

  function handleClick() {
    setIsFav(!isFav);
  }

  return (
    <button
      className={isFav ? "fav-btn active" : "fav-btn"}
      onClick={handleClick}
      aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
    >
      {isFav ? "♥ Saved" : "♡ Favourite"}
    </button>
  );
}

// Extra feature 2: Quantity picker, 0 to 10 (like the Step activity, Lesson 8)
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
      <Button onClick={handleMinus} label="One less">−</Button>
      <span>{qty}</span>
      <Button onClick={handlePlus} label="One more">+</Button>
    </div>
  );
}

// Reusable button: props.children + event handler passed as a prop (Lesson 6)
function Button({ onClick, label, children }) {
  return (
    <button className="qty-btn" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

// Open / closed message with the ternary operator (Lesson 4)
function Footer() {
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          Sorry, we're closed. We open daily from {openHour}am to {closeHour - 12}pm.
        </p>
      )}
    </footer>
  );
}

// Order component extracted from Footer, with a default prop value (Lesson 6)
function Order({ closeHour = 22 }) {
  function handleOrder() {
    alert("Thanks for your order!");
  }

  return (
    <div className="order">
      <p>We're currently open until {closeHour - 12}pm.</p>
      <button className="btn" onClick={handleOrder}>
        Order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
