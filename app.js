function generateExample() {
  var regex = document.getElementById("regex").value;
  var text = document.getElementById("text").value;
  var xhr = new XMLHttpRequest();
  const API_ENDPOINT = "https://vercel.com/jinkuili666/regex-ai/deployments"; 
  if (typeof process === "undefined") {
    var process = {
        env: { NODE_ENV: "production" }
    };
}
  const API_KEY = "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";
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var example = JSON.parse(this.responseText).choices[0].text;
      document.getElementById("example").innerHTML = example;
    }
  };
  xhr.open(
    "GET",
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer ${API_KEY}"); 
  xhr.send(
    JSON.stringify({
      prompt: "请生成一段匹配正则表达式 " + regex + " 的示例文本：" + text + "\n",
      max_tokens: 1024,
      temperature: 0.5,
      n: 1,
      stop: "\n",
    })
  );
}
