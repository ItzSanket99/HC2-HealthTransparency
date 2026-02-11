const CostBreakdownTable = ({ data }) => {
  if (!data || !data.breakdown) return null;

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Cost Breakdown
      </h3>

      <div className="space-y-2">
        {Object.entries(data.breakdown).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between text-gray-700"
          >
            <span>{key}</span>
            <span>₹ {value.toLocaleString()}</span>
          </div>
        ))}

        <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold">
          <span>Total Bill</span>
          <span>₹ {data.totalBill.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Insurance Coverage</span>
          <span>₹ {data.coverageAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-red-600 text-lg font-bold">
          <span>Final Out-of-Pocket</span>
          <span>₹ {data.finalOOP.toLocaleString()}</span>
        </div>

        {data.notEligible && (
          <div className="text-red-500 mt-3">
            Not eligible for selected insurance
          </div>
        )}
      </div>
    </div>
  );
};

export default CostBreakdownTable;
