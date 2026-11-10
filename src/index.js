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
      <Hero />
      <Menu />
      <Footer />
    </div>
  );
}

// Top bar. Tagline only shows when the shop is open (&& operator, Lesson 4)
function Header() {
  return (
    <header className="header">
      <p className="hours">
        Daily {openHour}am – {closeHour - 12}pm
      </p>

      <div className="brand">
        <h1>Pizzeria Amore</h1>
        {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
      </div>

      {/* Open / closed badge (ternary, Lesson 4) */}
      <p className={isOpen ? "status open" : "status closed"}>
        {isOpen ? "● Open now" : "● Closed now"}
      </p>
    </header>
  );
}

// Big welcome section with a round pizza photo
function Hero() {
  return (
    <section className="hero">
      <h2>Fresh Italian pizza, made with love</h2>
      <p>Stone-baked in Naples style. Pick your favourite below.</p>
      <div className="flag" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </section>
  );
}

// Menu: loops through the pizza array with map() and a key (Lesson 4)
function Menu() {
  return (
    <main className="menu">
      <h2>Popular Pizzas</h2>
      <p className="menu-hint">
        Tap ♡ to save a favourite, use − and + to choose how many.
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

// Reusable Pizza component with destructured props (Lesson 5)
function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={soldOut ? "pizza sold-out" : "pizza"}>
      {/* Sold out badge (&&, Lesson 4) */}
      {soldOut && <span className="badge">Sold out</span>}
      <FavButton />

      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span className="price">{soldOut ? "Not available" : "$" + price}</span>

      {/* Quantity picker only shows if the pizza is not sold out (&&, Lesson 4) */}
      {!soldOut && <Quantity />}
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
      {isFav ? "♥" : "♡"}
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
      <Button onClick={handleMinus} label="One less">
        −
      </Button>
      <span>{qty}</span>
      <Button onClick={handlePlus} label="One more">
        +
      </Button>
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
        <p className="closed-msg">
          Sorry, we're closed. We open daily from {openHour}am to{" "}
          {closeHour - 12}pm.
        </p>
      )}
      <p className="copyright">Pizzeria Amore · Made with ♥ in React</p>
    </footer>
  );
}

// Order component extracted from Footer, with a default prop value (Lesson 6)
function Order({ closeHour = 22 }) {
  function handleOrder() {
    alert("Grazie! Thanks for your order!");
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
