import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";

// Shop opens 10am to 10pm (Lesson 5, Activity 7)
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

// Italian flag stripe, reused at the top and bottom of the page
function Flag() {
  return (
    <div className="flag">
      <div className="green"></div>
      <div className="white"></div>
      <div className="red"></div>
    </div>
  );
}

// Tagline only shows when the shop is open (&& operator, Lesson 4)
function Header() {
  return (
    <header className="header">
      <p className="hours">Daily 10am - 10pm</p>
      <div className="brand">
        <h1>Pizzeria Amore</h1>
        {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
      </div>
      {/* Open / closed badge (ternary operator, Lesson 4) */}
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

// Loop through the pizza array with map() and a key (Lesson 4)
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

// Reusable Pizza component, props destructured (Lesson 5)
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

// Extra feature 1: favourite heart (useState, Lesson 8)
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

// Extra feature 2: quantity from 0 to 10 (like the Step activity, Lesson 8)
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

// Reusable button: props.children + event handler as a prop (Lesson 6)
function Button(props) {
  return (
    <button className="qty-btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

// Open or closed message (ternary operator, Lesson 4)
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

// Order component taken out of Footer, with a default prop value (Lesson 6)
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
