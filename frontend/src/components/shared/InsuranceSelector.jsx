const InsuranceSelector = ({ options, onSelect }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
      <label className="block font-medium mb-2">
        Select Insurance
      </label>
      <select
        onChange={(e) => {
          const selected = options.find(
            (o) => o.name === e.target.value
          );
          onSelect(selected || null);
        }}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        <option value="">No Insurance</option>
        {options.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InsuranceSelector;
