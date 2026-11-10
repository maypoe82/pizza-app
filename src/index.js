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

// Tagline only shows when the shop is open (&& operator, Lesson 4)
function Header() {
  return (
    <header className="header">
      <h1>Bella Napoli Pizza Co.</h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
    </header>
  );
}

// Menu: loops through the pizza array with map() and a key (Lesson 4)
// Extra feature: "Show favourites only" toggle using state (Lesson 8)
function Menu() {
  const [favourites, setFavourites] = useState([]);
  const [showFavOnly, setShowFavOnly] = useState(false);

  function handleToggleFav(name) {
    if (favourites.includes(name)) {
      setFavourites(favourites.filter((fav) => fav !== name));
    } else {
      setFavourites([...favourites, name]);
    }
  }

  function handleShowFavOnly() {
    setShowFavOnly(!showFavOnly);
  }

  const pizzasToShow = showFavOnly
    ? pizzaData.filter((pizza) => favourites.includes(pizza.name))
    : pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <p className="intro">
        Authentic Italian cuisine. {pizzaData.length} creative dishes to choose
        from. All from our stone oven, all organic, all delicious.
      </p>

      <section className="menu-tools" aria-label="Menu options">
        <span>♥ Favourites: {favourites.length}</span>
        <Button onClick={handleShowFavOnly}>
          {showFavOnly ? "Show all pizzas" : "Show favourites only"}
        </Button>
      </section>

      {pizzasToShow.length > 0 ? (
        <ul className="pizzas">
          {pizzasToShow.map((pizza) => (
            <Pizza
              key={pizza.name}
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              photoName={pizza.photoName}
              soldOut={pizza.soldOut}
              isFav={favourites.includes(pizza.name)}
              onToggleFav={handleToggleFav}
            />
          ))}
        </ul>
      ) : (
        <p className="empty">
          No favourites yet. Tap the heart on a pizza to add it!
        </p>
      )}
    </main>
  );
}

// Reusable Pizza component, props destructured (Lesson 5)
function Pizza({ name, ingredients, price, photoName, soldOut, isFav, onToggleFav }) {
  function handleClick() {
    onToggleFav(name);
  }

  return (
    <li className={soldOut ? "pizza sold-out" : "pizza"}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span className="price">{soldOut ? "SOLD OUT" : "$" + price}</span>
        <button
          className={isFav ? "fav-btn active" : "fav-btn"}
          onClick={handleClick}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          {isFav ? "♥ Favourite" : "♡ Add to favourites"}
        </button>
      </div>
    </li>
  );
}

// Reusable button: props.children + event handler passed as a prop (Lesson 6)
function Button({ onClick, children }) {
  return (
    <button className="btn btn-small" onClick={onClick}>
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
          Sorry, we're closed. We're happy to welcome you between {openHour}:00
          and {closeHour}:00.
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
      <p>We're currently open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn" onClick={handleOrder}>
        Order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
