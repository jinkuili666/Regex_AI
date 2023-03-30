function generateExample() {
import('axios').then(axios => {
  var regex = document.getElementById("regex").value;
  var text = document.getElementById("text").value;
  const openai_api_key = process.env.OPENAI_API_KEY;

  const data = {
    "prompt": "请生成一段匹配正则表达式 " + regex + " 的示例文本：" + text + "\n",
    "temperature": 0.7,
    "max_tokens": 60,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "stop": "\n"
  };

  // 创建 HTTP 请求对象并设置 OpenAI API Key
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openai_api_key}`
    }
  };

  // 发送 POST 请求
  axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', data, config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});
};
