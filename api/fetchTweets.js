export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=from:${username}`,
      {
        headers: {
          "Authorization": `Bearer ${bearerToken}`
        }
      }
    );

    const data = await response.json();

    // Count "hirys" (case insensitive)
    let count = 0;
    if (data.data) {
      count = data.data.filter(tweet =>
        tweet.text.toLowerCase().includes("hirys")
      ).length;
    }

    res.status(200).json({ count });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
