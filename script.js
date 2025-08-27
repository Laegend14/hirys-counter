async function getCount() {
  const username = document.getElementById("username").value.trim();
  const result = document.getElementById("result");

  if (!username) {
    result.textContent = "❌ Please enter a username";
    return;
  }

  result.textContent = "Fetching tweets...";

  try {
    // Call our backend API (we’ll make this in Vercel)
    const res = await fetch(`/api/count?username=${username}`);
    const data = await res.json();

    result.textContent = `${username} has mentioned "hirys" ${data.count} times in tweets/comments.`;

  } catch (err) {
    console.error(err);
    result.textContent = "⚠️ Error fetching tweets.";
  }
}
