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
    <div className="flex items-start justify-between py-4 border-b border-[#eef3f3] last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="text-[#1f6f6b] text-[18px] mt-[2px]">{icon}</div>

        <div>
          <p className="font-medium text-[#0f2f33] leading-none">{label}</p>
          {note && (
            <p className="text-[13px] text-[#6b8a8f] mt-1 leading-snug">
              {note}
            </p>
          )}
        </div>
      </div>

      {available ? (
        <span className="flex items-center gap-1.5 text-[#1f6f6b] text-[13px] font-medium">
          <FaCheckCircle className="text-[12px]" /> Available
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-[#8aa3a6] text-[13px]">
          <FaTimesCircle className="text-[12px]" /> Not available
        </span>
      )}
    </div>
  );
};

const FacilitiesPanel = ({ facilities }) => {
  if (!facilities) {
    return (
      <div className="bg-white border border-[#e2e8ea] rounded-2xl p-6">
        <h3 className="text-[18px] font-semibold text-[#0f2f33] mb-2">
          Facilities & Infrastructure
        </h3>
        <p className="text-[14px] text-[#6b8a8f]">
          Facility information not available for this hospital.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e8ea] rounded-2xl">

      {/* Header */}
      <div className="p-6 border-b border-[#eef3f3]">
        <h3 className="text-[19px] font-semibold flex items-center gap-2 text-[#0f2f33]">
          <FaHospitalAlt className="text-[#1f6f6b]" />
          Facilities & Infrastructure
        </h3>
        <p className="text-[13px] text-[#6b8a8f] mt-1">
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

      {/* Footer */}
      <div className="px-6 py-4 text-[12px] text-[#7f9a9e] border-t border-[#eef3f3]">
        Facility data verified with hospital infrastructure records
      </div>
    </div>
  );
};

export default FacilitiesPanel;
