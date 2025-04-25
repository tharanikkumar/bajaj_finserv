import React from 'react';
import { MapPin, Hospital } from 'lucide-react';

function DoctorList({ doctors }) {
  return (
    <div className="w-3/4 space-y-4">
      {doctors.map((doc) => (
        <div key={doc.id} className="bg-white rounded-xl shadow px-6 py-4 flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <img
              src={doc.photo}
              alt={doc.name}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
              <p className="text-xs text-gray-700">{doc.specialities?.map(s => s.name).join(', ')}</p>
              <p className="text-xs text-gray-500">{doc.experience}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Hospital size={14} className="mr-1" />
                {doc.clinic?.name}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin size={14} className="mr-1" />
                {doc.clinic?.address?.locality}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-800">{doc.fees}</p>
            <button className="mt-2 px-4 py-1 border border-blue-600 text-blue-600 text-xs rounded hover:bg-blue-50 transition">
              Book Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;
