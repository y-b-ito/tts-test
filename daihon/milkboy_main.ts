import { GoogleGenAI, type SpeechConfig } from '@google/genai';
import * as wav from 'wav';

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const prompt = `TTS the following conversation between ツッコミ and ボケ.:
ツッコミ: どうもーどうも ミルクボーイですー
ボケ: お願いしますー　ありがとうございますー
ツッコミ: お願いしますー　ありがとうございますー
ツッコミ: あー ありがとうございますー　ねっ　今ベルマークをいただきましたけどもね
ツッコミ: ありがとうございますー
ツッコミ: こんなん　なんぼあっても良いですからね
ボケ: 一番良いですからね
ツッコミ: ねー 有り難いですよ　ほんとにね
ボケ: 入れておきましょう
ツッコミ: ゆーとりますけどもね
ボケ: いきなりですけどね　うちのオカンがね　好きな朝ごはんがあるらしいんやけど
ツッコミ: あっ　そーなんや
ボケ: その名前をちょっと忘れたらしくてね
ツッコミ: 朝ごはんの名前忘れてもうて　どうなってんねそれ
ボケ: でまあ色々聞くんやけどな　全然分からへんねんな
ツッコミ: 分からへんの？　いや　ほな俺がね　おかんの好きな朝ごはん　ちょっと一緒に考えてあげるから　どんな特徴ゆうてたかってのを教えてみてよ
ボケ: あのー甘くてカリカリしてて　で　牛乳とかかけて食べるやつやって言うねんな
ツッコミ: おー　コーンフレークやないかい　その特徴はもう完全にコーンフレークやがな
ボケ: コーンフレークなぁ
ツッコミ: すぐ分かったやん　こんなんもー
ボケ: でもこれちょっと分からへんのやな
ツッコミ: 何が分からへんのよー
ボケ: いや俺もコーンフレークと思うてんけどな
ツッコミ: いやそうやろ？
ボケ: オカンが言うには　死ぬ前の最後のご飯もそれで良いって言うねんな
ツッコミ: あー　ほなコーンフレークと違うかぁ　人生の最後がコーンフレークでええ訳ないもんね
ボケ: そやねん
ツッコミ: コーンフレークはね　まだ寿命に余裕があるから食べてられんのよあれ
ボケ: そやねんな
ツッコミ: な？　コーンフレーク側もね　最後のご飯に任命されたら荷が重いよあれ
ボケ: そやねんそやねん
ツッコミ: コーンフレークってそういうもんやから　ほなコーンフレークちゃうがなこれ
ボケ: そやねん
ツッコミ: あれほなもう一度詳しく教えてくれる？
ボケ: なんであんなに栄養バランスの五角形デカイんか分からんらしいねん
ツッコミ: コーンフレークやないかい　パッケージにかいてる五角形むちゃくちゃデカイんやからあれ　でも俺はね　あれは自分の得意な項目だけで勝負してるからやと睨んでんのよ　俺の目は騙されへんよ　俺騙したら大したもんや
ボケ: まあねー
ツッコミ: ほんであれよー見たらね　牛乳の栄養素を含んだ上での五角形になっとんねん　俺は何でもお見通しやねんから　コーンフレークやそんなもんは
ボケ: 分からへんねんでも
ツッコミ: 何が分からへんのこれで
ボケ: 俺もコーンフレークと思うてんけどな
ツッコミ: そうやろ
ボケ: オカンが言うには　晩ご飯で出てきても全然良いって言うねんな
ツッコミ: ほなコーンフレークちゃうやないかい　晩飯でコーンフレーク出てきたら　ちゃぶ台ひっくり返すもんね　コーンフレークはねー　まだ朝の寝ぼけてる時やから食べてられんのやで
ボケ: そやねんそやねん
ツッコミ: な？　それ食べてるうちにだんだん目が覚めてくるから　最後ちょっとだけ残してまうねんあれ
ボケ: そやねんそやねん
ツッコミ: そういうカラクリやからあれ
ボケ: そやねんな
ツッコミ: コーンフレークちゃうがな　ほな　もうちょっとなんか言ってなかった？
ボケ: 子どもの頃　何故かみんな憧れたらしいねん
ツッコミ: コーンフレークやないかい　コーンフレークとミロとフルーチェは憧れたんやから　あとトランシーバーも憧れましたよ　コーンフレークよそんなもん
ボケ: 分からへんねんだから
ツッコミ: なんで分からへんのこれで
ボケ: 俺もコーンフレークと思うてんけどな
ツッコミ: そうやろ
ボケ: オカンが言うには　お坊さんが修行のときも食べてるっていうねん
ツッコミ: ほなコーンフレークちゃうやないかい　精進料理にカタカナのメニューなんか出ぇへんのよ
ボケ: せやねん
ツッコミ: ありがとうございましたー
ボケ: ありがとうございましたー`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: prompt,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: 'ツッコミ',
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede',
                },
              },
            },
            {
              speaker: 'ボケ',
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Leda',
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
