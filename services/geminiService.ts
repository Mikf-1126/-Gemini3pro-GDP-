import { GoogleGenAI } from "@google/genai";
import { GDPData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeCountryEconomy = async (data: GDPData): Promise<string> => {
  if (!apiKey) {
    return "API Key 未配置。请检查环境变量。";
  }

  try {
    const prompt = `
      请分析 ${data.country} 在 2024 年的经济展望。
      背景数据:
      - 预计 GDP: $${data.gdp} 万亿美元
      - 全球排名: 第 ${data.rank} 名
      - 预计增长率: ${data.growth}

      请提供一份包含以下内容的 3 段式简要摘要：
      1. 关键经济驱动力和主要产业。
      2. 2024 年面临的主要挑战或风险。
      3. 全球重要性及未来展望。

      请保持语气专业、客观分析。使用 Markdown 格式，并用中文回答。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "你是一位专门研究全球 GDP 趋势和宏观经济的高级经济学家。请务必用中文回答。",
      }
    });

    return response.text || "暂无分析结果。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "暂时无法获取经济分析报告。请稍后再试。";
  }
};