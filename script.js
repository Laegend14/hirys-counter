async function getTweetCount() {
  const username = document.getElementById("username").value;

  if (!username) {
    document.getElementById("result").innerText = "Please enter a username!";
    return;
  }

  document.getElementById("result").innerText = "Checking...";

  try {
    const res = await fetch(`/api/tweets?username=${username}`);
    const data = await res.json();

    if (data.error) {
      document.getElementById("result").innerText = "Error: " + data.error;
    } else {
      document.getElementById("result").innerText =
        `@${username} has tweeted "hirys" ${data.count} times.`;
    }
  } catch (err) {
    document.getElementById("result").innerText = "Something went wrong!";
  }
}
