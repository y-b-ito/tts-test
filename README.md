
# Google Gemini Multi-Speaker TTS Example

このリポジトリは、Google Gemini Generative AI API を使用して、複数話者でのテキスト音声合成（TTS）を行う方法を示します。指定された会話テキストから、それぞれの話者に異なる声色を割り当てて一つの WAV ファイルとして出力します。

## 🚀 特徴

* Google Gemini API (`gemini-2.5-flash-preview-tts` モデル) を利用したテキスト音声合成。
* **複数話者対応**: 会話内の異なる話者（例: Joe, Jane）に、それぞれ異なる声色（例: Kore, Puck）を割り当てて音声を生成。
* 生成された音声は `output.wav` ファイルとして保存されます。
* TypeScript で記述。
* パッケージ管理には pnpm を使用。

## 📋 前提条件

* Node.js (v18.0.0 以降)
* pnpm
* Google Cloud Project と Generative AI API の有効化
  * Google Cloud Console で新しいプロジェクトを作成または既存のプロジェクトを選択します。
  * 「Generative Language API」を有効にします。
  * API キーを作成し、安全な場所に保管します。

## 🛠️ インストール

1. このリポジトリをクローンします。

    ```bash
    git clone https://github.com/your-username/tts-test.git # 必要に応じてリポジトリURLを更新
    cd tts-test
    ```

2. 依存関係をインストールします。

    ```bash
    pnpm install
    ```

3. API キーを設定するための `.env` ファイルを作成します。

    ```
    # .env
    GOOGLE_GENERATIVE_AI_API_KEY=YOUR_API_KEY_HERE
    ```

    `YOUR_API_KEY_HERE` を、Google Cloud で取得した実際の API キーに置き換えてください。

## 🚀 使い方

プロジェクトを実行するには、以下のコマンドを使用します。

```bash
pnpm start
```

コマンドを実行すると、`main.ts` スクリプトが実行され、指定された会話が音声合成されて `output.wav` ファイルが生成されます。

## 📂 生成された音声の例

`pnpm start` を実行すると、以下の会話が音声合成された `output.wav` ファイルが作成されます。

**会話テキスト:**

```
Joe: やあ、元気？
Jane: うん、元気だよ!
Joe: 今日は何をしているの？
Jane: 今日は友達と遊びに行く予定だよ。
```

**音声ファイル:**

[output.wav](https://raw.githubusercontent.com/coji/tts-test/main/output.wav)
(上記リンクをクリックすると、GitHub上の音声ファイルを直接再生できます。)

## ⚙️ カスタマイズ

`main.ts` ファイルを編集することで、音声合成のプロンプトや話者を変更できます。

* **会話の内容を変更する:**
    `main.ts` の `prompt` 定数を編集します。

    ```typescript
    const prompt = `TTS the following conversation between Joe and Jane:

Joe: 新しい会話の始まり。
Jane: 別の会話の応答。
Joe: 続けて、ジョーのセリフ。
Jane: ジェーンのセリフ。`;
    ```

* **話者と声色を変更する:**
    `speechConfig.multiSpeakerVoiceConfig.speakerVoiceConfigs` 配列を編集します。`speaker` フィールドはプロンプト内の話者名と一致させる必要があります。`voiceName` には、Gemini API がサポートする[プリビルド音声](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1beta/models/generateContent#prebuiltvoiceconfig)のいずれかを指定できます（例: `Kore`, `Puck`, `Ferry`, `Nova` など）。

    ```typescript
    speechConfig: {
        multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
                {
                    speaker: 'Joe', // プロンプト内の話者名
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: 'Kore', // 割り当てる声色
                        },
                    },
                },
                {
                    speaker: 'Jane', // プロンプト内の話者名
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: 'Puck', // 割り当てる声色
                        },
                    },
                },
            ],
        },
    }
    ```
