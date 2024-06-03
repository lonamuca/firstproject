const projectsConfig = {
  endpoint:
    "https://api-us-east-1.graphcms.com/v2/ckvn1wx1v1qee01xn8z3abjwl/master",
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzY3NDI4MTcsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2Nrdm4xd3gxdjFxZWUwMXhuOHozYWJqd2wvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYmFlYWY0YmYtNzI2NS00M2MzLWI4ODItNDg3YzhiZTY3YmM3IiwianRpIjoiY2t2d3Fld2pwMzhqMDAxeHc0amIyMmgzNCJ9.ZtIefKBQhTtAY43_-rDE2oUMJ-TimXnzPpGOcUfLrML06g0KHtWCRxofe_QKiyZhgDf-IfH_sQrwpnKvnei-B46_jfNYitnzXGgAfPz0qN9SSVGyxQGQ0C8KPBs2n0lRiLyZsV6gqS_CVeF_PcLuQvqYjrOlY2L-mwy_oQO50Ef1N6FC44-OSiKtquVWE7owi0JeMvZy02XRQJk8S5EBc7VCBwgo52_CdcDGC0IK_zyAfuPJszzlAwmKfCfXqzK-PQzAbMlW3SSKWgyVT3QW8CtFb9X2A17gRO4DFZQ4bdTJ0vDa2VaqAJ33U3V6WCj9GNBwW56IZsJgczaklgPqIitFk0zAFkzBBpvofPkQogwtBVZccE__FEIqXzHjxVzhVxh8t0BQ1X64os8z9gvdhmwdSmonJtgLE4PzJPJKyYtu3W51t5T6QVJ9P58raFofKHNrpgGZk1L1oF6awY6sZHlwklHG4Vv0FuwOGSPWMkmGNSaO6Bi08I5Jegsc_1FEQNydC_MRVSKjg4-xZnKZZZ8wdc8UD9pSVSM-h-OWJmOGtKwMQtpRTzP0OF6VvrBbCihTOuH_o9RbVC5_gRQs2Z7WpLyOswLbi1AHp_OmyEriS2ETup5sAQdE4NDfgATSTqIr5DXT4yMWSkFaZ3DpnUt9o52RhPabNndGnrnMwsU",
};

const init = () => {
  const smartTumbnail = document.getElementById("smart_thumbnail");
  const smartTumbnailIndicator = document.getElementById(
    "smart_thumbnail_indicator"
  );

  const checkSmartTumbnailClass = (classToCheck) => {
    return smartTumbnail.classList.contains(classToCheck);
  };

  const toggleSmartTumbnailClass = () => {
    const isSmartTumbnailSmall = checkSmartTumbnailClass("small");

    if (isSmartTumbnailSmall) {
      smartTumbnail.classList.remove("small");
      smartTumbnailIndicator.innerText =
        "Press the image above to make it smaller";
    } else {
      smartTumbnail.classList.add("small");
      smartTumbnailIndicator.innerText =
        "Press the image above to make it bigger";
    }
  };

  smartTumbnail &&
    smartTumbnail.addEventListener("click", toggleSmartTumbnailClass);
};

document.addEventListener("DOMContentLoaded", init);

const fetchGithubStatistics = async () => {
  const [reponseProfile, responseRepos] = await Promise.all([
    fetch("https://api.github.com/users/emri_juaj", {
      method: "GET",
    }),
    fetch("https://api.github.com/users/emri_juaj", {
      method: "GET",
    }),
  ]);

  const [profile, repos] = await Promise.all([
    reponseProfile.json(),
    responseRepos.json(),
  ]);

  return { ...profile, repos: [...repos] };
};

const renderGithubStatistics = async (elementId) => {
  const {
    name,
    login,
    avatar_url,
    location,
    public_gists,
    public_repos,
    followers,
    following,
    repos,
  } = await fetchGithubStatistics();

  const starsCount = repos.reduce((prev, current) => {
    return prev + current.stargazers_count;
  }, 0);

  const cardItems = [
    { title: "Username", value: login },
    { title: "Location", value: location },
    { title: "Following", value: following },
    { title: "Total stars", value: starsCount },
    { title: "Public Repos", value: public_repos },
    { title: "Public Gits", value: public_gists },
    { title: "Followers", value: followers },
  ];

  const repoContainer = document.createElement("div");
  repoContainer.classList.add("github-container");

  const repoProfileName = document.createElement("h5");
  repoProfileName.innerText = name;

  const repoAvatar = document.createElement("img");
  repoAvatar.classList.add("github-avatar");
  repoAvatar.src = avatar_url;

  {
    const container = document.createElement("div");
    container.classList.add("github-avatar-container");
    container.appendChild(repoAvatar);
    container.appendChild(repoProfileName);
    repoContainer.appendChild(container);
  }

  {
    const container = document.createElement("div");
    container.classList.add("github-statistics");

    cardItems.forEach((item) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("github-statistics-card");

      const cardTitle = document.createElement("h6");
      cardTitle.innerText = item.title;

      const cardValue = document.createElement("p");
      cardValue.innerText = item.value;

      cardContainer.appendChild(cardTitle);
      cardContainer.appendChild(cardValue);
      container.appendChild(cardContainer);
    });

    repoContainer.appendChild(container);
  }

  document.getElementById(elementId).appendChild(repoContainer);
};

const fetchProjects = async () => {
  const response = await fetch(projectsConfig.endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${projectsConfig.token}` },
    body: JSON.stringify({
      query: `{
        projects {
          id
          title
          description
          repository
          externalLink
        }
      }`,
    }),
  });

  const { data } = await response.json();

  return data ? [...data.projects] : [];
};

const renderProjects = async (elementId) => {
  const projects = await fetchProjects();

  projects.forEach((project) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects-container");

    const projectTitle = document.createElement("h3");
    projectTitle.innerText = project.title;

    const projectDescription = document.createElement("p");
    projectDescription.innerText = project.description;

    const projectLinkRepository = document.createElement("a");
    projectLinkRepository.innerText = "Repository";
    projectLinkRepository.target = "_blank";
    projectLinkRepository.href = project.repository;

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectLinkRepository);

    document.getElementById(elementId).appendChild(projectContainer);
  });
};

const renderTheLastTweet = (elementId) => {
  const tweets = [
    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It’s once in a lifetime that someone like <a href="https://twitter.com/taylorswift13?ref_src=twsrc%5Etfw">@taylorswift13</a> comes into this world. I am floored by your heart and your mind, and I am beyond honored to have been asked to help you with your journey 🥹 I love you so much. Thank you Tay 💕 <a href="https://t.co/jQt7WubjgN">pic.twitter.com/jQt7WubjgN</a></p>&mdash; Post Malone (@PostMalone) <a href="https://twitter.com/PostMalone/status/1781782230869660133?ref_src=twsrc%5Etfw">April 20, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ',
    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">think i’ll slip on down to the oasis:) <a href="https://twitter.com/garthbrooks?ref_src=twsrc%5Etfw">@garthbrooks</a> <a href="https://t.co/Pb9s1X1flO">pic.twitter.com/Pb9s1X1flO</a></p>&mdash; Post Malone (@PostMalone) <a href="https://twitter.com/PostMalone/status/1778852797351702916?ref_src=twsrc%5Etfw">April 12, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  ];

  const embeedTweets = tweets.join("");

  document.getElementById(elementId).innerHTML = embeedTweets;
};

const renderFollowTwitterButton = (elementId) => {
  const followTwitterButton =
    '<a href="https://twitter.com/emri_juaj?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @dianalami</a>';

  document.getElementById(elementId).innerHTML = followTwitterButton;
};

const renderShareOnFacebookButton = (elementId) => {
  const shareOnFacebookButton =
    '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ffacebook.com%2Fbecome.google.developer&layout=button&size=small&width=67&height=20&appId" width="67" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>';
  document.getElementById(elementId).innerHTML = shareOnFacebookButton;
};
