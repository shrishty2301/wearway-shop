// src/pages/CartPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";
import { databases, ID } from "../appwrite";

const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const ordersCol = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;

export default function CartPage() {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect guests to login
  useEffect(() => {
    if (!user) {
      navigate("/login?next=/cart");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-300">
          Redirecting to login…
        </p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      // create an order document in Appwrite
      await databases.createDocument(dbId, ordersCol, ID.unique(), {
        user_id: user.$id,
        // Appwrite requires this exact attribute name:
        total_price: total,      // <-- key changed
        items: JSON.stringify(items),             
        status: "pending",
       
      });

      clearCart();
      alert("Order placed! You will be contacted soon.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-18 space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
            <p className="mt-1 text-sm text-slate-300/80">
              Review your customized pieces before checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs rounded-full border border-slate-700 px-3 py-1.5 text-slate-300 hover:border-rose-400 hover:text-rose-300 transition"
            >
              Clear all
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <p className="text-sm text-slate-400">
            Your cart is empty. Add a piece from the shop to see it here.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3"
                >
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img
                      src={item.preview_url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-50">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Size: {item.options.size || "—"} • Color:{" "}
                          {item.options.color ||
                            item.options.custom_color ||
                            "—"}
                        </p>
                        {item.options.custom_notes && (
                          <p className="mt-1 text-[11px] text-slate-300/80 line-clamp-2">
                            Notes: {item.options.custom_notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-semibold text-sky-300">
                          INR {item.price}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm">
              <p className="text-slate-300">Total</p>
              <p className="text-lg font-semibold text-sky-300">
                INR {total}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 hover:bg-sky-300 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
