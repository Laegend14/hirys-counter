async function checkTweets() {
  const username = document.getElementById("username").value;
  const resultDiv = document.getElementById("result");

  if (!username) {
    resultDiv.innerHTML = "⚠️ Please enter a Twitter username.";
    return;
  }

  resultDiv.innerHTML = "⏳ Checking tweets...";

  try {
    const response = await fetch(`/api/fetchTweets?username=${username}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `❌ ${data.error}`;
    } else {
      resultDiv.innerHTML = `@${data.username} has tweeted "hirys" ${data.tweetCount} times and commented "hirys" ${data.replyCount} times.`;
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Error fetching data.";
    console.error(error);
  }
}
