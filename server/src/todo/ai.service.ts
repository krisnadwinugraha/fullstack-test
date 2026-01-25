import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    } else {
      console.warn(' No GEMINI_API_KEY found. AI Service initialized in MOCK mode.');
    }
  }

  async analyzeProblem(problem: string): Promise<string> {
    if (!this.model) {
      return this.mockResponse(problem);
    }

    try {
      console.log(`🤖 Asking Gemini: "${problem}"...`);
      const prompt = `
        You are a Technical Support Engineer.
        User Error: "${problem}".
        Provide a 1-sentence technical fix. Do not be conversational.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();

    } catch (error) {
      console.error('❌ AI Request Failed (Internet or Quota). Switching to Mock.', error);
      return this.mockResponse(problem);
    }
  }


  private async mockResponse(problem: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lower = problem.toLowerCase();
    if (lower.includes('database') || lower.includes('db')) return "Mock AI: Check Docker container status and verify .env credentials.";
    if (lower.includes('port')) return "Mock AI: Port conflict detected. Try killing the process using the port.";
    if (lower.includes('cors')) return "Mock AI: Enable CORS in main.ts configuration.";
    if (lower.includes('react')) return "Mock AI: Check for infinite loops in useEffect or missing dependency arrays.";
    
    return "Mock AI: Check application logs for stack traces and verify environment variables.";
  }
}