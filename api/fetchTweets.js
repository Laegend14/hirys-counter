export default async function handler(req, res) {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN; // safe storage
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // 1. Get the user ID from username
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    const userData = await userResponse.json();
    if (!userData.data) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = userData.data.id;

    // 2. Get tweets and replies from that user
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=100&tweet.fields=conversation_id`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    const tweetsData = await tweetsResponse.json();

    let tweetCount = 0;
    let replyCount = 0;

    if (tweetsData.data) {
      for (let tweet of tweetsData.data) {
        if (tweet.text.toLowerCase().includes("hirys")) {
          if (tweet.conversation_id === tweet.id) {
            tweetCount++; // original tweet
          } else {
            replyCount++; // reply
          }
        }
      }
    }

    res.status(200).json({
      username,
      tweetCount,
      replyCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
