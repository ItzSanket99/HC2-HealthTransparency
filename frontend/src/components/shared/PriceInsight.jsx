import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PriceInsight = ({ min, max, midpoint, procedure }) => {
  const data = [
    { price: min, value: 12 },
    { price: min * 1.2, value: 45 },
    { price: min * 1.5, value: 35 },
    { price: midpoint * 0.9, value: 28 },
    { price: midpoint, value: 55 },  // Peak at midpoint for realism
    { price: midpoint * 1.15, value: 18 },
    { price: max * 0.9, value: 8 },
    { price: max, value: 3 },
  ];

  return (
    <div className=" mt-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 shadow-l hover:shadow-2xl transition-all duration-300 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT TEXT - Prominent pricing like Turquoise */}
        <div className="space-y-3">
          <h2 className="text-2xl lg:text-4xl font-black text-slate-800 leading-tight">
            ₹{midpoint.toLocaleString()}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Typical price range for <span className="font-semibold text-teal-700">{procedure}</span> in your area.
          </p>
          <div className="flex justify-between items-center text-base text-slate-500 bg-slate-100/50 p-4 rounded-xl">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" /> Min: ₹{min.toLocaleString()}
            </span>
            <span className="flex items-center gap-2">
              Max: ₹{max.toLocaleString()} <div className="w-3 h-3 bg-red-400 rounded-full" />
            </span>
          </div>
        </div>

        {/* RIGHT CHART - Enhanced distribution */}
        <div className="h-38 lg:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="price"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={false}
                />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                formatter={(value, name, props) => [value, 'Frequency']}
                labelFormatter={(label) => `Price: ₹${label.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#priceFill)"
              />
              <ReferenceLine
                x={midpoint}
                stroke="#10b981"
                strokeWidth={3}
                label={{
                  value: `Most Common\n₹${midpoint.toLocaleString()}`,
                  position: "top",
                  fill: "#ffffff",
                  fontSize: 13,
                  fontWeight: "bold",
                  backgroundColor: "#10b981",
                  borderRadius: "6px",
                  padding: "8px 12px",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceInsight;
