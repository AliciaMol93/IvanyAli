module.exports = async function handler(req, res) {
  const url =
    "https://script.google.com/macros/s/AKfycbxBMor6mLcPhsHiDjE8bot7vb52MpMKJkef_mXSHeOefMoecOzMqJdsnmEZVQBWRgGBJQ/exec";

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json(data);

  } catch (err) {
    console.error("❌ Error en proxy:", err);

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(500).json({
      success: false,
      error: err?.toString(),
      message: "Error comunicando con Google Apps Script",
    });
  }
};
