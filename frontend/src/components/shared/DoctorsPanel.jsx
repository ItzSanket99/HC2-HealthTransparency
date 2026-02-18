import { FaUserMd, FaStar } from "react-icons/fa";

const DoctorsPanel = ({ doctors = [] }) => {
if (!doctors.length) {
return ( <div className="bg-white border border-[#e2e8ea] rounded-2xl p-7 shadow-sm"> <h3 className="text-xl font-semibold text-[#0f2f33]">
Doctors & Specialists </h3> <p className="text-sm text-[#5f7a7f] mt-2">
Doctor information not available for this hospital. </p> </div>
);
}

return ( <div className="bg-white border border-[#e2e8ea] rounded-2xl shadow-sm">
  {/* HEADER */}
  <div className="p-7 border-b border-[#e2e8ea]">
    <h3 className="text-2xl font-semibold flex items-center gap-3 text-[#0f2f33]">
      <FaUserMd className="text-[#1f6f6b]" />
      Doctors & Specialists
    </h3>
    <p className="text-sm text-[#5f7a7f] mt-1">
      Experienced specialists available at this hospital
    </p>
  </div>

  {/* DOCTOR CARDS */}
  <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
    {doctors.map((doc) => (
      <div
        key={doc.id}
        className="border border-[#e2e8ea] rounded-2xl p-5 hover:shadow-md transition bg-[#fcfefe]"
      >
        {/* TOP */}
        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="w-14 h-14 rounded-full bg-[#e7f6f4] text-[#1f6f6b] flex items-center justify-center font-bold text-lg">
            {doc.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-[#0f2f33]">
              {doc.name}
            </h4>
            <p className="text-sm text-[#5f7a7f]">
              {doc.specialization}
            </p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 bg-[#f4fbfa] text-[#1f6f6b] px-2 py-0.5 rounded-full text-xs font-medium">
                <FaStar className="text-yellow-500" />
                {doc.rating}
              </span>

              <span className="text-xs text-[#5f7a7f]">
                {doc.experience}+ yrs experience
              </span>
            </div>
          </div>
        </div>

        {/* SUCCESS RATE */}
        <div className="mt-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#5f7a7f]">Surgery success rate</span>
            <span className="font-semibold text-[#0f2f33]">
              {doc.successRate}%
            </span>
          </div>

          <div className="w-full bg-[#e7f1f0] rounded-full h-2">
            <div
              className="bg-[#1f6f6b] h-2 rounded-full transition-all"
              style={{ width: `${doc.successRate}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);
};

export default DoctorsPanel;
