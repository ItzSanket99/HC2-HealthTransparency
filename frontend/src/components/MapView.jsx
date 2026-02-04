import { FaMapMarkerAlt } from "react-icons/fa";

const MapView = ({ hospitals }) => {
  return (
    <div className="sticky top-6 bg-white rounded-xl border h-[500px] p-4">
      <h3 className="font-semibold mb-2">Hospitals Nearby</h3>

      {/* Placeholder Map */}
      <div className="bg-gray-100 h-full rounded-lg flex items-center justify-center text-gray-500">
        <div className="text-center">
          <FaMapMarkerAlt className="text-3xl text-teal-600 mx-auto mb-2" />
          <p>Map View</p>
          <p className="text-xs">(Google Maps / Mapbox)</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
