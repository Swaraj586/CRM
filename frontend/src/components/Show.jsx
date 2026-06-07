import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Show({
  selectedLead,
  setSelectedLead,
  isEditing,
  setIsEditing,
  editForm,
  setEditForm,
  handleDelete,
  handleCloseModal,
  handleOpenModal,
  setLeads,
  leads,
  handleSaveUpdate,
}) {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let localErrors = {};

    if (!editForm.name.trim()) localErrors.name = "Name is required";
    if (!editForm.company.trim()) localErrors.company = "Company is required";
    if (!editForm.status) localErrors.status = "Please select a status";
    if (!editForm.notes.trim()) localErrors.notes = "Notes are required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editForm.email.trim()) {
      localErrors.email = "Email is required";
    } else if (!emailRegex.test(editForm.email)) {
      localErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[0-9+\s-]{10}$/;
    if (!editForm.phone.trim()) {
      localErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(editForm.phone)) {
      localErrors.phone = "Please enter a valid phone number (digits only)";
    }

    setErrors(localErrors);

    return Object.keys(localErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    handleSaveUpdate();
  };
  return (
    <AnimatePresence>
      {selectedLead && (
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
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            {isEditing ? (
              <div>
                <div className="border-b pb-3 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Edit Lead Information
                  </h2>
                </div>
                <div className="space-y-3 my-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.name ? "border-red-500" : ""}`}
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
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.email ? "border-red-500" : ""}`}
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
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.phone ? "border-red-500" : ""}`}
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
                      value={editForm.company}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          company: e.target.value,
                        })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.company ? "border-red-500" : ""}`}
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
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          status: e.target.value,
                        })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.status ? "border-red-500" : "bg-white"} text-gray-700 outline-none focus:border-indigo-500`}
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
                      value={editForm.notes}
                      onChange={(e) =>
                        setEditForm({ ...editForm, notes: e.target.value })
                      }
                      className={`w-full border p-2 rounded-lg ${errors.notes ? "border-red-500" : ""}`}
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
                    onClick={() => setIsEditing(false)}
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
              </div>
            ) : (
              <div>
                <div className="border-b pb-3 mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Lead Details
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                    {selectedLead.Name}
                  </h2>
                </div>
                <div className="space-y-3 my-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> {selectedLead.Email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {selectedLead.Phone_Number || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Company Name:</strong>{" "}
                    {selectedLead.Company_Name || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Lead Status:</strong>{" "}
                    {selectedLead.Lead_Status || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Notes:</strong> {selectedLead.Notes || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    <strong>Created At:</strong>{" "}
                    {selectedLead.Created_Date
                      ? new Date(selectedLead.Created_Date).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 justify-end border-t pt-4 mt-6">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    onClick={() => handleOpenModal(selectedLead)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100"
                    onClick={() => handleDelete(selectedLead._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Show;
