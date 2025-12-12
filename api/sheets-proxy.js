module.exports = async function handler(req, res) {
  const url =
    "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgV8XZZBSqOtIoOeRIMvmZNxU6HBT98Rts56jcu_n0s7bu7iOqwTSQaIHLUmhwBB_gRbWB4bQqzOBwrHl-6Dv9gNayI6Yg18AKmVG-h_PaXpms3PB02jNK-pjfOwHrqcwPuP5jj3cmioWmnlBGr3grZ8ht4nYDVO7YsFiw8UJBD99uieF5aJFlavGE8UuK2R3HfZW9VJcuAHkhM-nMIe68m6eZTdNwtq6Fu5VOM91vsG8pIWVmShUU4jYIjGtVSyujH0rjHaii7qDRHxjTv_Uj9AKcEWVgRyUNKlNB2&lib=MOpXzqb5P6Q8Om1XOufDOhp3Z-ciZOyjE";

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
