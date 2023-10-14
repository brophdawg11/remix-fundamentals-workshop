const token = process.env.GH;
export async function fetchGitHub(path: string) {
  let headers = new Headers();
  if (token) {
    headers.append("Authorization", `token ${token}`);
  }

  let res = await fetch(`https://api.github.com${path}`, { headers });
  let json = await res.json();

  return json;
}

export async function fetchMarkdown({
  md,
  org,
  repo,
}: {
  md: string;
  org: string;
  repo: string;
}) {
  if (md.trim() === "") {
    return null;
  }

  let cacheKey = `${md}:${org}:${repo}`;

  let htmlRes = await fetch(`https://api.github.com/markdown`, {
    method: "post",
    body: JSON.stringify({
      text: md,
      mode: "gfm",
      context: `${org}/${repo}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  let html = await htmlRes.text();

  return html;
}
