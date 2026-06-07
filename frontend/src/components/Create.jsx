import React from "react";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Create() {
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "",
    notes: "",
  });
  const handleOpenModal = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "",
      notes: "",
    });
  };
  const validateForm = () => {
    let localErrors = {};

    if (!formData.name.trim()) localErrors.name = "Name is required";
    if (!formData.company.trim()) localErrors.company = "Company is required";
    if (!formData.status) localErrors.status = "Please select a status";
    if (!formData.notes.trim()) localErrors.notes = "Notes are required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      localErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[0-9+\s-]{10}$/;
    if (!formData.phone.trim()) {
      localErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      localErrors.phone = "Please enter a valid phone number (digits only)";
    }

    setErrors(localErrors);

    return Object.keys(localErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    const response = await axios.post(
      `/api/data/api/addleads`,
      formData,
    );
    setIsCreating(false);
    window.location.reload();
  };
  return (
    <>
      <AnimatePresence>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-sm hover:bg-green-700"
          onClick={() => handleOpenModal()}
        >
          + Create Lead
        </button>

        {isCreating ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative z-10"
            >
              <div className="border-b pb-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Create Lead</h2>
              </div>
              <div className="space-y-3 my-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg ${errors.name ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg ${errors.email ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg ${errors.phone ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                  />
                  {errors.phone && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg ${errors.company ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                  />
                  {errors.company && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg bg-white text-gray-700 outline-none focus:border-indigo-500 ${errors.status ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>
                  {errors.status && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.status}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className={`w-full border p-2 rounded-lg ${errors.notes ? "border-rose-500 focus:ring-1 focus:ring-rose-200" : "border-gray-200"}`}
                    rows="2"
                  />
                  {errors.notes && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">
                      {errors.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 justify-end border-t pt-4 mt-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-sm hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Create;
