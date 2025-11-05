import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CheckoutProps {
  cartItems: any[];
  onClose: () => void;
  isMobile?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: "e-money" | "cash";
  emoneyNumber: string;
  emoneyPin: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onClose, isMobile }) => {
  const createOrder = useMutation(api.orders.createOrder);
  const clearCart = useMutation(api.cart.clearCart);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    paymentMethod: "e-money",
    emoneyNumber: "",
    emoneyPin: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const vat = subtotal * 0.2;
  const grandTotal = subtotal + shipping;

  // Real-time validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
      case "phone":
        return !/^\+?[\d\s\-()]+$/.test(value) || value.length < 10
          ? "Invalid phone number"
          : "";
      case "address":
        return value.trim().length < 5 ? "Address is too short" : "";
      case "city":
        return value.trim().length < 2 ? "City name is required" : "";
      case "state":
        return value.trim().length < 2 ? "State is required" : "";
      case "zip":
        return !/^\d{5}(-\d{4})?$/.test(value) ? "Invalid ZIP code (e.g., 10001)" : "";
      case "country":
        return value.trim().length < 2 ? "Country is required" : "";
      case "emoneyNumber":
        return formData.paymentMethod === "e-money" && value.trim().length < 5
          ? "e-Money number is required"
          : "";
      case "emoneyPin":
        return formData.paymentMethod === "e-money" && !/^\d{4}$/.test(value)
          ? "PIN must be 4 digits"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePaymentMethodChange = (method: "e-money" | "cash") => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    if (method === "cash") {
      setErrors((prev) => {
        const { emoneyNumber, emoneyPin, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (key === "emoneyNumber" || key === "emoneyPin") {
        if (formData.paymentMethod === "e-money") {
          const error = validateField(key, formData[key as keyof FormData] as string);
          if (error) newErrors[key] = error;
        }
      } else if (key !== "paymentMethod") {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totals: {
          subtotal,
          shipping,
          grandTotal,
        },
      });

      await clearCart();
      alert("Order placed successfully!");
      onClose();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white text-black rounded-lg shadow-2xl ${
        isMobile ? "w-full mt-4" : "w-[500px] ml-4"
      } max-h-[80vh] overflow-y-auto`}
    >
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
        <h2 className="text-2xl font-bold uppercase">Checkout</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Billing Details */}
        <div>
          <h3 className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
            Billing Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Alexei Ward"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-accent/20"
                }`}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="alexei@mail.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-accent/20"
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1202-555-0136"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone && touched.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-accent/20"
                }`}
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
            Shipping Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1137 Williams Avenue"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address && touched.address
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-accent/20"
                }`}
              />
              {errors.address && touched.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="10001"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.zip && touched.zip
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/20"
                  }`}
                />
                {errors.zip && touched.zip && (
                  <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="New York"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.city && touched.city
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/20"
                  }`}
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="NY"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.state && touched.state
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/20"
                  }`}
                />
                {errors.state && touched.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="United States"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.country && touched.country
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/20"
                  }`}
                />
                {errors.country && touched.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h3 className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
            Payment Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2">Payment Method</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange("e-money")}
                  className={`w-full px-4 py-3 border rounded-lg text-left flex items-center ${
                    formData.paymentMethod === "e-money"
                      ? "border-accent bg-accent/5"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.paymentMethod === "e-money"
                        ? "border-accent"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.paymentMethod === "e-money" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    )}
                  </span>
                  e-Money
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange("cash")}
                  className={`w-full px-4 py-3 border rounded-lg text-left flex items-center ${
                    formData.paymentMethod === "cash"
                      ? "border-accent bg-accent/5"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.paymentMethod === "cash"
                        ? "border-accent"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.paymentMethod === "cash" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    )}
                  </span>
                  Cash on Delivery
                </button>
              </div>
            </div>

            {formData.paymentMethod === "e-money" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">e-Money Number</label>
                  <input
                    type="text"
                    name="emoneyNumber"
                    value={formData.emoneyNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="238521993"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.emoneyNumber && touched.emoneyNumber
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-accent/20"
                    }`}
                  />
                  {errors.emoneyNumber && touched.emoneyNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.emoneyNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2">e-Money PIN</label>
                  <input
                    type="text"
                    name="emoneyPin"
                    value={formData.emoneyPin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="6891"
                    maxLength={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.emoneyPin && touched.emoneyPin
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-accent/20"
                    }`}
                  />
                  {errors.emoneyPin && touched.emoneyPin && (
                    <p className="text-red-500 text-xs mt-1">{errors.emoneyPin}</p>
                  )}
                </div>
              </div>
            )}

            {formData.paymentMethod === "cash" && (
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <svg className="w-12 h-12 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                <p className="text-sm text-gray-600">
                  The 'Cash on Delivery' option enables you to pay in cash when our delivery
                  courier arrives at your residence. Just make sure your address is correct so
                  that your order will not be cancelled.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg uppercase tracking-wider mb-4">Summary</h3>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">${item.price.toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-gray-500 font-bold">x{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 uppercase">Total</span>
              <span className="font-bold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 uppercase">Shipping</span>
              <span className="font-bold">${shipping}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 uppercase">VAT (Included)</span>
              <span className="font-bold">${vat.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-lg pt-4">
              <span className="text-gray-500 uppercase">Grand Total</span>
              <span className="font-bold text-accent">${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-white py-4 rounded-md uppercase tracking-widest font-bold hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Continue & Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;