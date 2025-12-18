// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases, storage, ID } from "../appwrite";
import { useCart } from "../state/CartContext";

const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const productsCol = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
const customCol = import.meta.env.VITE_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID;
const bucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({
    size: "",
    color: "",
    design: "",
    custom_size: "",
    custom_color: "",
    custom_notes: "",
  });
  const [referenceFile, setReferenceFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    databases
      .getDocument(dbId, productsCol, id)
      .then((doc) => {
        setProduct(doc);
        setForm((f) => ({
          ...f,
          // no default size any more
          color: doc.available_colors?.[0] || "",
          design: doc.available_designs?.[0] || "",
        }));
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = async () => {
  if (!product) return;

  // Decide what to save as size
  const sizeToSave = form.size || form.custom_size;

  if (!sizeToSave) {
    alert("Please select a size or enter it in Custom Size.");
    return;
  }

  setSaving(true);
  try {
    let referenceImageId = null;
    if (referenceFile) {
      const uploaded = await storage.createFile(
        bucketId,
        ID.unique(),
        referenceFile
      );
      referenceImageId = uploaded.$id;
    }

    const customization = await databases.createDocument(
      dbId,
      customCol,
      ID.unique(),
      {
        product_id: product.$id,
        size: sizeToSave, // always non-empty here
        color: form.color,
        design: form.design,
        custom_size: form.custom_size || null,
        custom_color: form.custom_color || null,
        custom_notes: form.custom_notes || null,
        reference_image_id: referenceImageId,
        extra_price: 0,
        preview_image_id: null,
      }
    );

    const finalPrice = product.price + (customization.extra_price || 0);

    addToCart({
      product_id: product.$id,
      customization_id: customization.$id,
      name: product.name,
      price: finalPrice,
      quantity: qty,
      options: { ...form, reference_image_id: referenceImageId, size: sizeToSave },
      preview_url: product.image_url,
    });

    alert("Added to cart");
    setReferenceFile(null);
  } catch (err) {
    console.error(err);
    alert("Error adding to cart");
  } finally {
    setSaving(false);
  }
};


  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-300">Loading product…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Product details
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-50">
            {product.name}
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Left: image + description */}
          <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-4">
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-200">
                  Product
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-50">
                  {product.name}
                </p>
                <p className="mt-1 text-[11px] text-slate-200/90">
                  {form.size || "No size selected"} • {form.design || "Design"}
                  {form.custom_size && ` • ${form.custom_size}`}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{product.description}</p>
          </div>

          {/* Right: form */}
          <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-6 space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Customize
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                UGX {product.price}
              </p>
            </div>

            {/* Size selection */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {(product.available_sizes || []).length === 0 && (
                  <p className="text-xs text-slate-500">No sizes configured.</p>
                )}
                {(product.available_sizes || []).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      handleChange("size", form.size === s ? "" : s)
                    }
                    className={`px-3 py-1 rounded border text-sm ${
                      form.size === s
                        ? "bg-sky-400 text-slate-950 border-sky-400"
                        : "border-slate-600 text-slate-100 hover:border-sky-300 hover:text-sky-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom size */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Custom Size (optional)
              </label>
              <input
                type="text"
                value={form.custom_size}
                onChange={(e) => handleChange("custom_size", e.target.value)}
                className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder='e.g. "Chest 38\", Length 26\""'
              />
              <p className="mt-1 text-xs text-slate-500">
                You can leave standard size empty and only use this field if
                you prefer.
              </p>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {(product.available_colors || []).length === 0 && (
                  <p className="text-xs text-slate-500">No colors configured.</p>
                )}
                {(product.available_colors || []).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleChange("color", c)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      form.color === c ? "border-sky-300" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Custom color */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Custom Color (optional)
              </label>
              <input
                type="text"
                value={form.custom_color}
                onChange={(e) => handleChange("custom_color", e.target.value)}
                className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder='e.g. "Pastel blue with white stripes"'
              />
            </div>

            {/* Design */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Design
              </label>
              {(product.available_designs || []).length === 0 ? (
                <p className="text-xs text-slate-500">No designs configured.</p>
              ) : (
                <select
                  value={form.design}
                  onChange={(e) => handleChange("design", e.target.value)}
                  className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {(product.available_designs || []).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Design & other details
              </label>
              <textarea
                value={form.custom_notes}
                onChange={(e) => handleChange("custom_notes", e.target.value)}
                className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm text-slate-100 h-24 resize-y focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Describe neck style, sleeve length, pockets, embroidery, etc."
              />
            </div>

            {/* Reference image */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Reference image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setReferenceFile(file || null);
                }}
                className="block w-full text-sm text-slate-200
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-sky-500/10 file:text-sky-200
                           hover:file:bg-sky-500/20"
              />
              <p className="mt-1 text-xs text-slate-500">
                Upload a photo or sketch that shows the style you want.
              </p>
            </div>

            {/* Quantity + button */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div>
                <p className="block text-sm font-medium mb-1 text-slate-200">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-slate-600 rounded">
                  <button
                    type="button"
                    className="px-3 py-1 text-lg text-slate-100"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 text-sm">{qty}</span>
                  <button
                    type="button"
                    className="px-3 py-1 text-lg text-slate-100"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60 transition"
              >
                {saving ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
