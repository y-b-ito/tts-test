import { GoogleGenAI, type SpeechConfig } from '@google/genai';
import * as wav from 'wav';

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const prompt = `TTS the following conversation between Joe and Jane:
Joe: やあ、元気？
Jane: うん、元気だよ!
Joe: 今日は何をしているの？
Jane: 今日は友達と遊びに行く予定だよ。`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: prompt,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: 'Joe',
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Kore',
                },
              },
            },
            {
              speaker: 'Jane',
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Puck',
                },
              },
            },
          ],
        },
      } satisfies SpeechConfig,
    },
  });
  const audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (audio) {
    const audioBuffer = Buffer.from(audio, 'base64');
    await waveFile('output.wav', audioBuffer);
  }
}

const waveFile = async (
  filename: string,
  pcm: Buffer,
  channels = 1,
  sampleRate = 24000
) => {
  return new Promise<void>((resolve, reject) => {
    const wavWriter = new wav.FileWriter(filename, {
      channels,
      bitDepth: 16,
      sampleRate,
    });

    wavWriter.write(pcm);
    wavWriter.end();

    wavWriter.on('finish', () => {
      console.log(`Wrote ${filename}`);
      resolve();
    });

    wavWriter.on('error', (err) => {
      console.error(`Error writing ${filename}:`, err);
      reject(err);
    });
  });
};

main();
