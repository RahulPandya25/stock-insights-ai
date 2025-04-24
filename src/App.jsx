import { useState } from "react";

function App() {
  const [ticker, setTicker] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const getStockInsights = async () => {
    if (!ticker) return;
    setLoading(true);
    setInsight("");

    const prompt = `Give a concise, friendly stock analysis for ${ticker.toUpperCase()} as of today. Include market sentiment, general trend, and any notable risk factors.`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // <- Replace this
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      console.log(data);
      
      setInsight(data.choices?.[0]?.message?.content || "No response received.");
    } catch (error) {
      setInsight("Error fetching insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">📈 Stock Insights AI</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Enter stock ticker (e.g. AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          onClick={getStockInsights}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get Insights"}
        </button>
      </div>
      {insight && (
        <div className="p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          {insight}
        </div>
      )}
    </div>
  );
}

export default App;
