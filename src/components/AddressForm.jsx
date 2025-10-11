import React, { useState } from "react";

export default function AddressForm({ onSubmit, onCancel, initial, submitLabel = "Use this address" }) {
  const [name, setName] = useState(initial?.name || "");
  const [mobile, setMobile] = useState(initial?.mobile || "");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [makeDefault, setMakeDefault] = useState(initial?.isDefault || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!/^[0-9]{6}$/.test(pincode)) return;

    const addressLine = [
      flat,
      area,
      landmark ? `Near ${landmark}` : "",
      city,
      state,
      pincode ? `- ${pincode}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const newAddress = {
      id: initial?.id || `addr_${Date.now()}`,
      name: name.trim(),
      tag: "Home",
      addressLine,
      mobile: mobile.trim(),
      email: "",
      isDefault: makeDefault,
    };
    onSubmit?.(newAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <input
          type="tel"
          className="w-full border rounded px-3 py-2"
          placeholder="000 000 0000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Flat, House no., Building, Company, Apartment</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Area, Street, Sector, Village</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Near by Landmark</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Eg: Near Famous chowk"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Pincode *</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="6 digits [0-9]"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select your state</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Gujarat</option>
            <option>Delhi</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={makeDefault}
          onChange={(e) => setMakeDefault(e.target.checked)}
        />
        Make this my default address
      </label>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
