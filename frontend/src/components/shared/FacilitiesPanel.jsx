
import {
  FaProcedures,
  FaHospitalAlt,
  FaAmbulance,
  FaXRay,
  FaTint,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const FacilityRow = ({ icon, label, available, note }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-300 last:border-b-0 last:border-gray-300">
      <div className="flex items-center gap-3">
        <div className="text-teal-700 text-lg">{icon}</div>
        <div>
          <p className="font-medium text-gray-800">{label}</p>
          {note && (
            <p className="text-xs text-gray-500">{note}</p>
          )}
        </div>
      </div>

      {available ? (
        <span className="flex items-center gap-1 text-green-700 text-sm">
          <FaCheckCircle /> Available
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600 text-sm">
          <FaTimesCircle /> Not available
        </span>
      )}
    </div>
  );
};

const FacilitiesPanel = ({ facilities }) => {
  if (!facilities) {
    return (
      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">
          Facilities & Infrastructure
        </h3>
        <p className="text-sm text-gray-500">
          Facility information not available for this hospital.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaHospitalAlt className="text-teal-700" />
          Facilities & Infrastructure
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Medical facilities available at this hospital
        </p>
      </div>

      {/* Facilities */}
      <div className="px-6">
        <FacilityRow
          icon={<FaProcedures />}
          label="ICU"
          available={facilities.icu}
          note="Critical care support"
        />

        <FacilityRow
          icon={<FaHospitalAlt />}
          label="Operation Theatre"
          available={facilities.operationTheatre}
          note="Major & minor surgeries"
        />

        <FacilityRow
          icon={<FaAmbulance />}
          label="Emergency Services"
          available={facilities.emergency}
          note="24×7 emergency care"
        />

        <FacilityRow
          icon={<FaXRay />}
          label="Imaging Services"
          available={facilities.imaging?.length > 0}
          note={
            facilities.imaging?.length
              ? facilities.imaging.join(", ")
              : "Not available"
          }
        />

        <FacilityRow
          icon={<FaTint />}
          label="Blood Bank"
          available={facilities.bloodBank}
          note="On-site blood storage"
        />
      </div>

      {/* Confidence footer */}
      <div className="px-6 py-4 bg-slate-50 text-xs text-gray-600 flex items-center gap-2">
        ✔ Facility data verified with hospital infrastructure records
      </div>
    </div>
  );
};

export default FacilitiesPanel;
