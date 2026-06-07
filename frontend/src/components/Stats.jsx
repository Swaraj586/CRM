import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Stats() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `/api/data/api/getleads`,
        );
        setLeads(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeads();
  }, []);

  const totalLeads = leads.length;

  const countByStatus = (status) =>
    leads.filter((lead) => lead.Lead_Status === status).length;

  const newLeads = countByStatus("New");
  const contactedLeads = countByStatus("Contacted");
  const qualifiedLeads = countByStatus("Qualified");
  const convertedLeads = countByStatus("Converted");
  const lostLeads = countByStatus("Lost");
  return (
    <div className="p-6 bg-gray-50 ">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Total Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {totalLeads}
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            New Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {newLeads}
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Contacted Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {contactedLeads}
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Qualified Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {qualifiedLeads}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Converted Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {convertedLeads}
          </p>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl shadow-xs border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Lost Leads
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">
            {lostLeads}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
