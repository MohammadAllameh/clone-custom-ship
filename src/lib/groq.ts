import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
});

export const reqGroqAI = async (origin: string, weight: number) => {
    const prompt = `
    You are in an artificial intelligence assistant in Farsi, which is used to calculate the shipping rate.
    I ask that the way you send the answer is like this, that's all I want
I just want the answer to these three
to answer
"
ground=Calculate the rate and put the number in their place based on how you want
sea=Calculate the rate and put the number in their place based on how you want
air=Calculate the rate and put the number in their place based on how you want
"


    مبدا: ${origin}
    مقصد: تبریز
    وزن: ${weight} گرم
    نرخ‌های حمل و نقل به این صورت هستند:
    1. حمل و نقل زمینی ارزان‌ترین است و با افزایش وزن افزایش پیدا می‌کند.
    2. حمل و نقل هوایی سریع‌ترین است اما گران‌ترین.
    3. حمل و نقل دریایی ارزان‌تر از هوایی است اما کندتر.
  `;
    const res = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.1-8b-instant",
        stream: false,
    });
    console.log(res.choices[0]?.message);
    return res;
};