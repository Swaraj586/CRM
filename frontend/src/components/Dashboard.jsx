import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Show from "./Show";
import Search from "./Search";
import Create from "./Create";
import FilterSort from "./FilterSort";
function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "",
    notes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateSort, setDateSort] = useState("desc");
  const statusColors = {
    New: "bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-800",
    Contacted:
      "bg-amber-50 border-amber-200 hover:border-amber-400 text-amber-800",
    Qualified:
      "bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-800",
    Converted:
      "bg-green-50 border-green-200 hover:border-green-400 text-green-800",
    Lost: "bg-rose-50 border-rose-200 hover:border-rose-400 text-rose-800",
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/deleads/${id}`);
        window.location.reload();
        setLeads(leads.filter((lead) => lead._id !== id));

        setSelectedLead(null);
      } catch (error) {
        console.error("Failed to delete lead:", error);
        alert("Something went wrong while deleting.");
      }
    }
  };
  const handleOpenModal = (lead) => {
    setSelectedLead(lead);
    setEditForm({
      name: lead.Name,
      email: lead.Email,
      phone: lead.Phone_Number,
      company: lead.Company_Name,
      status: lead.Lead_Status,
      notes: lead.Notes,
    });
    setIsEditing(true);
  };
  const handleSaveUpdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/upleads/${selectedLead._id}`,
        editForm,
      );
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update lead:", error);
      alert("Something went wrong while updating.");
    }
  };
  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/getleads`,
        );
        setLeads(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = leads
    .filter((lead) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        lead.Name?.toLowerCase().includes(searchLower) ||
        lead.Company_Name?.toLowerCase().includes(searchLower) ||
        lead.Email?.toLowerCase().includes(searchLower)
      );
    })
    .filter((lead) => {
      if (statusFilter === "All") return true;
      return lead.Lead_Status === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.Created_Date || a.createdAt || 0);
      const dateB = new Date(b.Created_Date || b.createdAt || 0);

      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
        <div className="flex items-center justify-between mb-6">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by name, company, or email..."
          />
          <Create />
        </div>
        <FilterSort
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateSort={dateSort}
          setDateSort={setDateSort}
        />
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredLeads?.length > 0 ? (
            filteredLeads?.map((lead) => (
              <div
                key={lead._id}
                onClick={() => setSelectedLead(lead)}
                className={`p-6 rounded-xl shadow-md w-full md:w-1/2 lg:w-1/3 border hover:shadow-lg cursor-pointer transition-all ${statusColors[lead.Lead_Status]}`}
              >
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {lead.Name}
                </h2>
                <p className="text-gray-600">{lead.Company_Name}</p>
                <p className="text-gray-500 text-sm">Click to view details</p>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">
                No leads found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
        <Show
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          handleDelete={handleDelete}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          setLeads={setLeads}
          leads={leads}
          handleSaveUpdate={handleSaveUpdate}
        />
      </div>
    </>
  );
}

export default Dashboard;
