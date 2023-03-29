function generateExample() {

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const prompt = "请生成一段匹配正则表达式 " + req.body.regex + " 的示例文本：" + req.body.text + "\n";
  const maxTokens = 1024;
  const temperature = 0.5;
  const n = 1;
  const stop = "\n";
  const engine = "davinci-codex";

  const request = require("request");
  const options = {
    method: "POST",
    url: "https://api.openai.com/v1/engines/" + engine + "/completions",
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      max_tokens: maxTokens,
      temperature: temperature,
      n: n,
      stop: stop,
    }),
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(JSON.parse(body).choices[0].text);
  });
});
};
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
