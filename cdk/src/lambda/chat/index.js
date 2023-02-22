const { Configuration, OpenAIApi } = require("openai");

export async function handler(event) {


  const configuration = new Configuration({
    basePath: process.env.basePath,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    prompt: "##" + event.queryStringParameters.ask,
    temperature: 0.7,
    max_tokens: parseInt(process.env.maxTokens),
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  }, {
    headers: {
      'api-key': process.env.apikey,
    },
    params: { "api-version": "2022-12-01" }
  });

  console.log(completion.data.choices[0].text);

  return {
    body: JSON.stringify({ message: completion.data.choices[0].text }),
    statusCode: 200,
  };
}
