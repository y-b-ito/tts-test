import { GoogleGenAI, type SpeechConfig } from '@google/genai';
import * as wav from 'wav';

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const prompt = `TTS the following conversation between michi and manatchi:
michi: みなさん、おはようございます。しっかり者ネコのミチです。今日も会議の前に、ちょこっとアイスブレイクのお時間ですよ〜。
manatchi: おはようございますぴょん♪ ふわふわマナッチで〜す！あのねミチ、最近すっごいの！AIって、ホントに何でもできちゃうのよ〜！
michi: うん、すごいよね。で、今朝も"AIに服を選んでもらった"って言ってたけど、上下ピンクなのに靴が黄色だったよ…？
manatchi: AIが"ポップで春らしい色使いです"って言ってくれたもん！あと、朝の挨拶もAIボイスで流してるんだ〜。"おはようマナッチ、今日もいいね！"って♪
michi: 自己肯定感ブーストされてる（笑）AIから褒められて元気になるって…ちょっと依存しすぎじゃない？
manatchi: 昨日なんか、"晩ごはん何がいい？"ってAIに聞いたら、"あなたが食べたいものが一番です"って…泣いたよね…
michi: それAIに慰められてるやつ！しかもそれ、選んでくれてないからね！人間の判断力、どこいった！
manatchi: だってAIって、どんどん気が利くようになってるじゃん？お仕事のメールも下書きしてくれるし、スケジュールも整えてくれるし…
michi: うん、便利だよね。でも最近、"冷蔵庫の中身"見て、"レシピ"出してくれて、"調理手順"も教えてくれるのに…なぜか私が料理してるのは、どういうことかな？
manatchi: 最終的に"手を動かすのは人間"ってことだね！あと、最近ちょっと危ないことに気づいたの…
michi: 何？
manatchi: "あれ？この前何食べたっけ？"って思ってAIに聞いたら、"それはあなたの記憶です"って…返されたの。
michi: そりゃそうでしょ！（笑）記憶まで頼っちゃダメでしょ！
manatchi: だからね〜、最近わたし、AIに頼らない脳トレはじめたの！
michi: お、えらい！何してるの？
manatchi: 自分で夕飯決める！あと、今日のスケジュールを"5分だけ"頭で考えてみる！……で、結局AIで確認する♡
michi: 意味ないわっ！（笑）でもまぁ、AIに任せすぎず、自分の脳もたまには動かすって大事かもね。
manatchi: でしょ〜？"使うけど、頼りきらない"がいいのよ〜。バランス、バランス♪
michi: では、今日もそのバランス感覚で、会議も頑張りましょう！"思考停止しない"が合言葉！
manatchi: うん！AIに"頑張って"って言われる前に、自分でスイッチオンぴょん♪`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: prompt,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: 'michi',
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede',
                },
              },
            },
            {
              speaker: 'manatchi',
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
