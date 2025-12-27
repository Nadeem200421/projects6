"use client";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ShopCard from "../components/shops/ShopCard";
import "../styles/shops-page.css";

export default function ShopsPage() {
  const shops = useSelector((state: RootState) => state.data.shops);

  return (
    <section className="shops-page">
      <div className="shops-container">
        <header className="shops-header">
          <h1>Local Shops</h1>
          <p>Discover trusted shops near you</p>
        </header>

        {shops.length === 0 ? (
          <div className="shops-empty">
            <p>No shops available at the moment.</p>
          </div>
        ) : (
          <div className="shops-grid">
            {shops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
