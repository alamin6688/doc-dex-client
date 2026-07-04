/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pill,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  User,
} from "lucide-react";

// Mock medicine catalog list
const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol (Napa Extend)",
    dose: "665mg",
    type: "Tablet",
    company: "Beximco Pharma",
    price: 15, // BDT per strip
    description: "Effective relief from fever and mild to moderate pain.",
  },
  {
    id: 2,
    name: "Cetirizine (Alatrol)",
    dose: "10mg",
    type: "Tablet",
    company: "Square Pharmaceuticals",
    price: 30,
    description: "Non-sedating antihistamine for allergy symptoms.",
  },
  {
    id: 3,
    name: "Esomeprazole (Maxpro)",
    dose: "20mg",
    type: "Tablet",
    company: "Renata Limited",
    price: 70,
    description: "Proton pump inhibitor for acid reflux and heartburn.",
  },
  {
    id: 4,
    name: "Montelukast (Monas)",
    dose: "10mg",
    type: "Tablet",
    company: "Acme Laboratories",
    price: 160,
    description:
      "Leukotriene receptor antagonist for asthma and allergic rhinitis.",
  },
  {
    id: 5,
    name: "Fexofenadine (Fexo)",
    dose: "120mg",
    type: "Tablet",
    company: "Incepta Pharma",
    price: 90,
    description:
      "Provides 24-hour fast non-drowsy relief for seasonal allergies.",
  },
  {
    id: 6,
    name: "Azithromycin (Zithrox)",
    dose: "500mg",
    type: "Tablet",
    company: "Aristopharma",
    price: 140,
    description:
      "Broad-spectrum macrolide antibiotic for bacterial infections.",
  },
  {
    id: 7,
    name: "Metformin (Glucomin)",
    dose: "500mg",
    type: "Tablet",
    company: "Beximco Pharma",
    price: 45,
    description: "Oral anti-diabetic drug for Type-2 Diabetes management.",
  },
  {
    id: 8,
    name: "Atorvastatin (Anvas)",
    dose: "10mg",
    type: "Tablet",
    company: "Square Pharmaceuticals",
    price: 120,
    description:
      "Statin medication for high cholesterol and cardiac risk prevention.",
  },
  {
    id: 9,
    name: "ORS (Oral Rehydration Salts)",
    dose: "Sachet",
    type: "Powder",
    company: "SMC Enterprise",
    price: 6,
    description:
      "Rehydration formula for fluid restoration during dehydration.",
  },
];

// Fibonacci Spiral SVG representation for Golden Ratio visual detail
const FibonacciSpiralSVG = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <svg viewBox="0 0 300 200" className="w-full h-32 z-10">
        {/* Golden Ratio Squares */}
        <rect
          x="0"
          y="0"
          width="162"
          height="162"
          stroke="#E2E8F0"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="162"
          y="0"
          width="100"
          height="100"
          stroke="#E2E8F0"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="162"
          y="100"
          width="62"
          height="62"
          stroke="#E2E8F0"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="224"
          y="62"
          width="38"
          height="38"
          stroke="#E2E8F0"
          strokeWidth="1"
          fill="none"
        />

        {/* Fibonacci Spiral Line */}
        <motion.path
          d="M 0 162 A 162 162 0 0 1 162 0 A 100 100 0 0 1 262 100 A 62 62 0 0 1 200 162 A 38 38 0 0 1 162 124"
          stroke="url(#golden-grad)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <defs>
          <linearGradient id="golden-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="162"
          cy="124"
          r="4"
          fill="#D946EF"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

const MedicinePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);

  // Delivery details form state
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const [checkoutPass, setCheckoutPass] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter catalog list based on input search
  const filteredCatalog = useMemo(() => {
    return mockMedicines.filter((med) => {
      return (
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Cart operations
  const addToCart = (med: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === med.id);
      if (existing) {
        return prev.map((item) =>
          item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...med, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const nextQty = item.quantity + delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean) as any[],
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Financial calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const shipping = subtotal > 0 ? 60 : 0; // Flat BDT 60 delivery fee
  const total = subtotal + tax + shipping;

  // Checkout submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !userName || !userPhone || !userAddress) return;

    const orderId = `DEX-MED-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryEta = new Date(
      Date.now() + 2 * 60 * 60 * 1000,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCheckoutPass({
      orderId,
      customerName: userName,
      phone: userPhone,
      address: userAddress,
      eta: deliveryEta,
      totalAmount: `BDT ${total}`,
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCart([]);
    setUserName("");
    setUserPhone("");
    setUserAddress("");
    setCheckoutPass(null);
    setIsSubmitted(false);
  };

  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  } as const;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 font-sans py-12 relative overflow-hidden">
      {/* Light background decorative ring */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 max-w-7xl relative z-10"
      >
        {/* Page Header */}
        <motion.div
          variants={itemVariants}
          className="border-b border-slate-200/80 pb-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              Online Medicine Store
            </h1>
            <p className="text-slate-505 text-sm mt-1.5">
              Order authentic prescription medications with same-day home
              shipping and digital receipt dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold py-1.5 px-3 rounded-full text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 animate-pulse" /> Vetted
              Pharmacies
            </Badge>
          </div>
        </motion.div>

        {/* Golden Ratio Split Screen Layout (61.8% to 38.2%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 items-start">
          {/* Left Column (61.8% space) - Catalog & Visual Info */}
          <div className="space-y-8">
            {/* Catalogue Workspace Area */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[32px] border border-slate-200/80 p-8 shadow-xs space-y-6"
            >
              {/* Catalog Search & Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 text-left">
                  <Pill className="h-5 w-5 text-[#4F46E5]" /> Medical Catalogue
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50/80 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl py-4 h-10"
                  />
                </div>
              </div>

              {/* Medicine Grid (Left Column) */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCatalog.length > 0 ? (
                    filteredCatalog.map((med) => (
                      <motion.div
                        key={med.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ y: -3 }}
                        className="p-5 rounded-2xl bg-white border border-slate-150 hover:border-slate-250 transition-all text-left flex flex-col justify-between min-h-[170px]"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <Badge className="bg-indigo-50 text-[#4F46E5] font-bold text-[9px] uppercase rounded-md border-none px-2">
                              {med.type}
                            </Badge>
                            <span className="text-xs font-bold text-slate-450 truncate max-w-[120px]">
                              {med.company}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">
                              {med.name}{" "}
                              <span className="text-[10px] text-slate-450 font-normal">
                                ({med.dose})
                              </span>
                            </h4>
                            <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 mt-1">
                              {med.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100/60">
                          <span className="text-sm font-bold text-slate-900">
                            BDT {med.price}
                          </span>
                          <Button
                            onClick={() => addToCart(med)}
                            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-lg py-2 px-3 h-8 text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Add
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <Pill className="h-8 w-8 text-slate-350 mx-auto mb-2 animate-pulse" />
                      <h4 className="text-xs font-bold text-slate-650">
                        No medicines match your search
                      </h4>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column (38.2% space) - Order Checkout Panel & confirmed receipt pass */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="checkout-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[32px] border border-slate-200/80 p-8 shadow-sm space-y-6 text-left"
                >
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#4F46E5]" /> Order
                    Summary
                  </h3>

                  {/* Cart items list */}
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 p-3 bg-slate-50/50 border border-slate-100 rounded-xl"
                        >
                          <div className="min-w-0">
                            <h4 className="text-xs font-extrabold text-slate-900 truncate">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold">
                              BDT {item.price} each
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-slate-200 rounded-md text-slate-500 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800 min-w-[12px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-slate-200 rounded-md text-slate-500 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 hover:bg-rose-50 text-rose-500 rounded-md cursor-pointer ml-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                        <Package className="h-8 w-8 text-slate-350 mx-auto mb-2 animate-bounce" />
                        <p className="text-xs text-slate-450 font-bold">
                          Your shopping cart is empty
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Financial calculation breakdown */}
                  {cart.length > 0 && (
                    <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-650">
                      <div className="flex justify-between">
                        <span className="text-slate-450">Subtotal</span>
                        <span>BDT {subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-450">Govt. Tax (5%)</span>
                        <span>BDT {tax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-450">Shipping Fee</span>
                        <span>BDT {shipping}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-bold text-slate-900">
                        <span>Total Price</span>
                        <span>BDT {total}</span>
                      </div>
                    </div>
                  )}

                  {/* Delivery details form */}
                  {cart.length > 0 && (
                    <form
                      onSubmit={handleOrderSubmit}
                      className="space-y-4 pt-4 border-t border-slate-100"
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                        Shipping Delivery details
                      </span>
                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <Input
                            required
                            placeholder="Recipient Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="pl-9 bg-slate-50/80 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <Input
                            required
                            type="tel"
                            placeholder="Phone Number"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="pl-9 bg-slate-50/80 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl"
                          />
                        </div>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <Input
                            required
                            placeholder="Delivery Address"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            className="pl-9 bg-slate-50/80 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-5 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer text-xs"
                      >
                        Confirm order
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="receipt-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[32px] border border-slate-200/80 p-8 shadow-sm space-y-6 text-center"
                >
                  <div className="mx-auto w-14 h-14 bg-[#ECEEFD] rounded-full flex items-center justify-center animate-bounce">
                    <ShieldCheck className="h-7 w-7 text-[#4F46E5]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      Order Confirmed
                    </h3>
                    <p className="text-slate-500 text-xs">
                      Your prescription order is prepared and routed for
                      shipping.
                    </p>
                  </div>

                  {/* Confirmed Delivery Slip Receipt Pass */}
                  <div className="p-6 rounded-[24px] bg-[#F8F9FE] border border-slate-100 text-slate-800 shadow-xs relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50/50 rounded-bl-full pointer-events-none" />

                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-3.5 mb-3.5">
                      <div>
                        <h4 className="text-[9px] uppercase tracking-widest text-[#4F46E5] font-extrabold">
                          Doc Dex Delivery Slip
                        </h4>
                        <p className="text-base font-bold tracking-tight text-slate-900 mt-0.5">
                          Pharmacy Order
                        </p>
                      </div>
                      <Pill className="h-5 w-5 text-[#4F46E5] shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[8px]">
                          Order ID
                        </span>
                        <span className="text-sm font-bold text-[#4F46E5] font-mono">
                          {checkoutPass?.orderId}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[8px]">
                          Recipient
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate block">
                          {checkoutPass?.customerName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[8px]">
                          Estimated ETA
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-indigo-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          Today @ {checkoutPass?.eta}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[8px]">
                          Amount Paid
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {checkoutPass?.totalAmount}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[8px]">
                          Shipping Address
                        </span>
                        <span className="text-[11px] text-slate-650 font-bold block truncate">
                          {checkoutPass?.address}
                        </span>
                      </div>
                    </div>

                    {/* Barcode representation */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col items-center">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                        Shipping Barcode
                      </span>
                      <div className="flex justify-center items-center gap-0.5 py-3 bg-white rounded-lg border border-slate-100 w-full max-w-[200px]">
                        {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1].map(
                          (w, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-900 h-6"
                              style={{ width: `${w}px` }}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    {/* Cutout circles for ticket effect */}
                    <div className="absolute -left-3 top-[42%] -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-slate-100" />
                    <div className="absolute -right-3 top-[42%] -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-slate-100" />
                  </div>

                  <div>
                    <Button
                      onClick={handleReset}
                      className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-5 flex items-center justify-center cursor-pointer shadow-md shadow-indigo-500/10 text-xs"
                    >
                      Place New Order
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicinePage;
