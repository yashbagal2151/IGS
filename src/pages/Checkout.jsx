import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  updateQty,
  removeFromCart,
} from "../features/cart/cartSlice";
import addresses from "../data/addresses.json";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import AddressForm from "../components/AddressForm";

// Minimal brand/bank icons to match design theme
const VisaIcon = () => (
  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-[#1a1f71] border border-[#1a1f71] rounded">VISA</span>
);
const MastercardIcon = () => (
  <span className="inline-flex items-center">
    <span className="w-3 h-3 rounded-full bg-[#EB001B]"></span>
    <span className="w-3 h-3 -ml-1 rounded-full bg-[#F79E1B]"></span>
  </span>
);
const BankLogo = ({ code }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 text-[10px] font-semibold rounded-full bg-gray-100 border text-gray-700">{code}</span>
);

export default function Checkout() {
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );
  const delivery = items.length > 0 ? 40 : 0;
  const mrpTotal = useMemo(
    () => items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0),
    [items]
  );
  const discount = Math.max(0, mrpTotal - subtotal);
  const payable = subtotal + delivery;
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    address: true,
    payment: false,
    review: false,
  });
  const [addrList, setAddrList] = useState(addresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id
  );
  const selectedAddress = useMemo(
    () => addrList.find((a) => a.id === selectedAddressId),
    [selectedAddressId, addrList]
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  // Payment selection
  const [paymentType, setPaymentType] = useState(""); // 'upi' | 'card' | 'netbanking' | 'cod'

  // Cards
  const [cards, setCards] = useState([
    { id: "card_boi_0000", brand: "visa", mask: "0000", label: "Bank of India debit card ending with 0000" },
    { id: "card_hdfc_0000", brand: "mastercard", mask: "0000", label: "HDFC Bank credit card ending with 0000" },
  ]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const selectedCard = useMemo(() => cards.find((c) => c.id === selectedCardId), [cards, selectedCardId]);

  // Netbanking
  const [selectedBank, setSelectedBank] = useState("");

  // UPI
  const [upiApp, setUpiApp] = useState("phonepe"); // 'phonepe' | 'gpay' | 'other'
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);

  // Modals
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const currentStep = open.address ? 1 : open.payment ? 2 : 3;
  const ctaLabel = (() => {
    if (currentStep === 1) return "Deliver to this address";
    if (currentStep === 2) return "Use this payment method";
    if (paymentType === "card" && selectedCard)
      return `Pay with debit card **${selectedCard.mask}`;
    if (paymentType === "upi") return "Pay with UPI";
    if (paymentType === "netbanking") return "Pay via Netbanking";
    if (paymentType === "cod") return "Place order (COD)";
    return "Place order";
  })();

  const isValidUpiId = (id) => /^[a-zA-Z0-9_.-]{3,}@[a-zA-Z]{3,}$/.test(id);

  const isPaymentValid = React.useMemo(() => {
    if (currentStep !== 2) return true;
    switch (paymentType) {
      case "upi":
        return Boolean(upiApp) && isValidUpiId(upiId) && upiVerified;
      case "card":
        return Boolean(selectedCardId);
      case "netbanking":
        return Boolean(selectedBank);
      case "cod":
        return true;
      default:
        return false;
    }
  }, [currentStep, paymentType, upiApp, upiId, upiVerified, selectedCardId, selectedBank]);

  const handlePay = async () => {
    const order = {
      id: `ABC-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString(),
      address: selectedAddress,
      payment: {
        type: paymentType,
        label:
          paymentType === "card"
            ? `debit card **${selectedCard?.mask || "0000"}`
            : paymentType === "upi"
            ? `UPI ${upiId || "(ID verified)"}`
            : paymentType === "netbanking" && selectedBank
            ? `Netbanking ${selectedBank}`
            : paymentType,
      },
      totals: { mrpTotal, discount, delivery, payable, subtotal },
      items,
    };
    dispatch(clearCart());
    navigate("/order-success", { state: { order } });
  };

  const handlePrimaryAction = () => {
    if (currentStep === 1) {
      setOpen({ address: false, payment: true, review: false });
    } else if (currentStep === 2) {
      if (!isPaymentValid) return;
      setOpen({ address: false, payment: false, review: true });
    } else {
      handlePay();
    }
  };

  // If there are no addresses, prompt to add one immediately
  React.useEffect(() => {
    if (addrList.length === 0 && !isAddressModalOpen) {
      setIsAddressModalOpen(true);
    }
  }, [addrList.length, isAddressModalOpen]);

  const Section = ({ title, isOpen, onToggle, children, actionText }) => (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="text-sm text-purple-700">{actionText}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Steps */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Secure Checkout</h1>

          {/* Address */}
          <Section
            title="User Address Details"
            isOpen={open.address}
            onToggle={() => setOpen((p) => ({ ...p, address: !p.address }))}
            actionText="Add new address"
          >
            <div className="space-y-3">
              {addrList.map((addr) => (
                <label
                  key={addr.id}
                  className="flex gap-3 items-start p-3 border rounded-md"
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1 text-purple-700"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {addr.name}
                      {addr.tag && (
                        <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded border text-gray-600">
                          {addr.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600">{addr.addressLine}</div>
                    <div className="text-gray-600">Mobile: {addr.mobile}</div>
                    <div className="text-gray-600">Email: {addr.email}</div>
                    <button
                      type="button"
                      className="text-xs text-purple-700 mt-1"
                      onClick={() => {
                        setEditAddress(addr);
                        setIsAddressModalOpen(true);
                      }}
                    >
                      Edit address
                    </button>
                  </div>
                </label>
              ))}
              <div className="flex justify-between items-center">
                <button
                  className="text-sm text-purple-700"
                  onClick={() => setIsAddressModalOpen(true)}
                >
                  Add new address
                </button>
                <button
                  className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
                  disabled={!selectedAddress}
                  onClick={() =>
                    setOpen({ address: false, payment: true, review: false })
                  }
                >
                  Deliver to this address
                </button>
              </div>
            </div>
          </Section>

          {/* Payment Details */}
          <Section
            title="Payment Details"
            isOpen={open.payment}
            onToggle={() => setOpen((p) => ({ ...p, payment: !p.payment }))}
            actionText="Change"
          >
            {/* UPI */}
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">UPI</div>
              <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paytype"
                    checked={paymentType === "upi" && upiApp === "phonepe"}
                    onChange={() => { setPaymentType("upi"); setUpiApp("phonepe"); setUpiVerified(false); }}
                  />
                  PhonePe
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paytype"
                      checked={paymentType === "upi" && upiApp === "gpay"}
                      onChange={() => { setPaymentType("upi"); setUpiApp("gpay"); setUpiVerified(false); }}
                    />
                    GPay
                  </label>
                  {paymentType === "upi" && upiApp === "gpay" && (
                    <>
                      <input
                        className={`border px-2 py-1 rounded text-sm ${upiId && !isValidUpiId(upiId) ? 'border-red-500' : ''}`}
                        placeholder="Enter UPI ID"
                        value={upiId}
                        onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                      />
                      <button
                        type="button"
                        className={`text-purple-700 text-sm ${isValidUpiId(upiId) ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!isValidUpiId(upiId)}
                        onClick={() => setUpiVerified(true)}
                      >
                        {upiVerified ? 'Verified' : 'Verify ID'}
                      </button>
                    </>
                  )}
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paytype"
                    checked={paymentType === "upi" && upiApp === "other"}
                    onChange={() => { setPaymentType("upi"); setUpiApp("other"); setUpiVerified(false); }}
                  />
                  Other UPI App
                </label>
              </div>
              {paymentType === "upi" && upiApp !== "gpay" && (
                <div className="flex items-center gap-3 text-sm">
                  <input
                    className={`border px-2 py-1 rounded text-sm ${upiId && !isValidUpiId(upiId) ? 'border-red-500' : ''}`}
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                  />
                  <button
                    type="button"
                    className={`text-purple-700 text-sm ${isValidUpiId(upiId) ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isValidUpiId(upiId)}
                    onClick={() => setUpiVerified(true)}
                  >
                    {upiVerified ? 'Verified' : 'Verify ID'}
                  </button>
                </div>
              )}
            </div>

            {/* Cards */}
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">
                Credit or Debit Card
              </div>
              {cards.map((c) => (
                <label key={c.id} className="flex items-center gap-2 mb-2 text-sm">
                  <input
                    type="radio"
                    name="paytype_card"
                    checked={paymentType === "card" && selectedCardId === c.id}
                    onChange={() => { setPaymentType("card"); setSelectedCardId(c.id); }}
                  />
                  <span className="inline-flex items-center gap-2">
                    {c.brand === 'visa' ? <VisaIcon /> : <MastercardIcon />}
                    <span>{c.label}</span>
                  </span>
                </label>
              ))}
              <button
                type="button"
                className="text-purple-700 text-sm"
                onClick={() => { setPaymentType("card"); setIsCardModalOpen(true); }}
              >
                Add new card
              </button>
            </div>

            {/* Netbanking */}
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">Netbanking</div>
              <div className="flex items-center gap-2">
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedBank}
                  onChange={(e) => { setSelectedBank(e.target.value); setPaymentType("netbanking"); }}
                >
                  <option value="">Select your bank</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="ICICI">ICICI</option>
                  <option value="AXIS">AXIS</option>
                  <option value="KOTAK">KOTAK</option>
                </select>
                {selectedBank && <BankLogo code={selectedBank} />}
              </div>
            </div>

            {/* COD */}
            <div>
              <div className="text-sm font-semibold mb-2">Cash on Delivery</div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="paytype"
                  checked={paymentType === "cod"}
                  onChange={() => setPaymentType("cod")}
                />
                Cash on Delivery
              </label>
            </div>
          </Section>

          {/* Review Products */}
          <Section
            title="Review Products"
            isOpen={open.review}
            onToggle={() => setOpen((p) => ({ ...p, review: !p.review }))}
            actionText="Verify Items"
          >
            <div className="divide-y">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="py-4 flex items-center gap-4 text-sm"
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{i.title}</div>
                    <div className="text-gray-500">
                      Material: {i.material || "-"} &nbsp; Size: {i.size || "-"}
                    </div>
                    <div className="text-purple-700 font-semibold">
                      ₹{i.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      Estimated Delivery -{" "}
                      <span className="font-semibold">
                        Between 14 - 16 October, 8am - 10pm
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() =>
                        i.qty > 1
                          ? dispatch(updateQty({ id: i.id, qty: i.qty - 1 }))
                          : dispatch(removeFromCart(i.id))
                      }
                    >
                      -
                    </button>
                    <span>{i.qty}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() =>
                        dispatch(updateQty({ id: i.id, qty: i.qty + 1 }))
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right font-medium">
                    ₹{i.price * i.qty}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="py-6 text-gray-500">Your cart is empty.</div>
              )}
            </div>
          </Section>
        </div>

        {/* Right: Pricing Summary */}
        <div>
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold mb-3 text-gray-800">
              Pricing Details
            </h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>₹{mrpTotal}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Discount:</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fees:</span>
                <span>₹{delivery}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Payable Price:</span>
                <span>₹{payable}</span>
              </div>
            </div>
            <button
              onClick={handlePrimaryAction}
              className="w-full mt-4 px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
              disabled={items.length === 0 || (currentStep === 2 && !isPaymentValid)}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add new Address"
      >
        <AddressForm
          initial={editAddress || undefined}
          submitLabel={editAddress ? "Save address" : "Use this address"}
          onCancel={() => {
            setEditAddress(null);
            setIsAddressModalOpen(false);
          }}
          onSubmit={(newAddr) => {
            setAddrList((prev) => {
              let list = prev;
              if (editAddress) {
                list = prev.map((a) => (a.id === editAddress.id ? newAddr : a));
              } else {
                list = [...prev, newAddr];
              }
              if (newAddr.isDefault) {
                list = [
                  ...list.map((a) => ({
                    ...a,
                    isDefault: a.id === newAddr.id,
                  })),
                ];
              }
              return list;
            });
            setSelectedAddressId(newAddr.id);
            setEditAddress(null);
            setIsAddressModalOpen(false);
          }}
        />
      </Modal>
      {/* Add Card Modal */}
      <Modal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        title="Add new card"
      >
        {/* Inline minimal card form to avoid a new file */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.cardName.value.trim();
            const number = form.cardNumber.value.replace(/\D/g, "");
            const expiry = form.cardExpiry.value.trim();
            const cvv = form.cardCvv.value.replace(/\D/g, "");
            if (!name || number.length < 12 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) return;
            const mask = number.slice(-4);
            const card = {
              id: `card_new_${mask}`,
              brand: "card",
              mask,
              label: `New card ending with ${mask}`,
            };
            setCards((prev) => [...prev, card]);
            setSelectedCardId(card.id);
            setPaymentType("card");
            setIsCardModalOpen(false);
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-sm mb-1">Name on card</label>
            <input name="cardName" className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Card number</label>
            <input name="cardNumber" className="w-full border rounded px-3 py-2" inputMode="numeric" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Expiry (MM/YY)</label>
              <input name="cardExpiry" className="w-full border rounded px-3 py-2" placeholder="MM/YY" required />
            </div>
            <div>
              <label className="block text-sm mb-1">CVV</label>
              <input name="cardCvv" className="w-full border rounded px-3 py-2" inputMode="numeric" required />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsCardModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded">Save card</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
