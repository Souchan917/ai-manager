const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 本番環境用の静的ファイル配信設定を追加
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// チャットAPIエンドポイント
app.post('/api/chat', async (req, res) => {
    const { message } = req.body; // ユーザーからのメッセージを受け取る
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // APIキーは.envで管理
          },
        }
      );
      // OpenAIからのレスポンスを返す
      res.json(response.data);
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: 'エラーが発生しました。' });
    }
  });
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));