import { FaUserMd, FaStar } from "react-icons/fa";

const DoctorsPanel = ({ doctors = [] }) => {
  if (!doctors.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-1">Doctors & Specialists</h3>
        <p className="text-sm text-gray-500">
          Doctor information not available for this hospital.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-300 ">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <FaUserMd className="text-teal-600" />
          Doctors & Specialists
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Specialists available at this hospital
        </p>
      </div>

      {/* DOCTOR CARDS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-300 rounded-xl p-5 hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex items-center gap-4">
              {/* AVATAR */}
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                {doc.name.charAt(0)}
              </div>

              <div>
                <h4 className="font-bold">{doc.name}</h4>
                <p className="text-sm text-gray-600">
                  {doc.specialization}
                </p>
              </div>
            </div>

            {/* META */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <span className="text-gray-600">
                {doc.experience}+ yrs experience
              </span>

              <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded">
                <FaStar />
                {doc.rating}
              </span>
            </div>

            {/* SUCCESS RATE */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Surgery success rate</span>
                <span className="font-medium">{doc.successRate}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full"
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
