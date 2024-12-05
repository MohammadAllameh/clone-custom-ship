// "use client";
// import { SetStateAction, useState } from "react";

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [aiResponse, setAiResponse] = useState("");
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();
//     try {
//       setIsLoading(true);
//       console.log(inputValue.toString())
//       const res = await fetch("/api/groq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: inputValue.toString() }),
//       });
//       const data = await res.json();
//       setAiResponse(data.content);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//       setInputValue("");
//     }
//   };
//   const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//     setInputValue(event.target.value);
//   }

//   return (
//     <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
//       <h1 className="text-2xl font-semibold text-red-400">
//         <span className="font-normal text-sm text-gray-700">chat with</span>{" "}
//         Groq AI
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="mt-4 p-2 sm:p-4 bg-white rounded-lg shadow-lg space-x-2"
//       >
//         <input
//           type="text"
//           // id="content"
//           // value={ }
//           value={inputValue}
//           onChange={handleChange}
//           placeholder="Ask me something..."
//           className="border border-gray-300 rounded-lg p-2 max-w-[200px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-red-400"
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`${isLoading
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-red-400 hover:bg-red-500"
//             } text-white px-4 py-2 rounded-lg focus:outline-none text-sm sm:text-base`}
//         >
//           {isLoading ? "Loading..." : "Submit"}
//         </button>
//       </form>
//       {aiResponse && (
//         <div className="mt-4 p-4 bg-white rounded-lg shadow-lg max-w-[400px]">
//           <h2 className="text-lg font-semibold text-red-400">AI Response</h2>
//           <p className="text-gray-600 max-h-80 overflow-y-auto  ">
//             {aiResponse}
//           </p>
//         </div>
//       )}
//     </main>
//   );
// }


"use client";

import { useState } from "react";

export default function Home() {
  const [origin, setOrigin] = useState("تهران");
  const [weight, setWeight] = useState(100); // وزن پیش‌فرض 100 گرم
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!weight || weight <= 0) return alert("وزن معتبر وارد کنید.");

    setIsLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, weight }),
      });

      const data = await res.json();
      console.log(data.content)
      setAiResponse(data.content || {});
    } catch (error) {
      console.error("Error:", error);
      alert("مشکلی پیش آمده است.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">محاسبه نرخ حمل و نقل</h1>
      <div className="bg-white shadow-lg rounded p-6 w-full max-w-lg">
        {/* اطلاعات محصول */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">محصول: لپ‌تاپ</h2>
          <p className="text-gray-700">وزن پایه: 100 گرم</p>
          <p className="text-gray-700">مقصد: تبریز</p>
        </div>

        {/* انتخاب مبدا */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">مبدا</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="تهران">تهران</option>
            <option value="مشهد">مشهد</option>
            <option value="اصفهان">اصفهان</option>
          </select>
        </div>

        {/* وارد کردن وزن */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">وزن (گرم)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="وزن را وارد کنید"
          />
        </div>

        {/* دکمه ارسال */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "در حال محاسبه..." : "محاسبه نرخ"}
        </button>

        {/* نمایش نتیجه */}
        {aiResponse ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">نتایج:</h3>
            <div>
              {aiResponse}
            </div>
            {/* <div className="space-y-2">
              <p>هزینه حمل و نقل زمینی: {aiResponse.ground} تومان</p>
              <p>هزینه حمل و نقل دریایی: {aiResponse.sea} تومان</p>
              <p>هزینه حمل و نقل هوایی: {aiResponse.air} تومان</p>
            </div> */}
          </div>
        ) : <></>}
      </div>
    </div>
  );
}
