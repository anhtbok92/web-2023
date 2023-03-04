// Hàm asyn lấy thông tin user từ github
const fetchGithubInfo = async (url) => {
    // console.log(`Fetching ${url}`)
    // Sử dụng API call get thông tin user từ github url
    const githubInfo = await fetch(url).then(response => response.json());
    console.log(githubInfo);
    return {
        name: githubInfo.name,
        bio: githubInfo.bio,
        repos: githubInfo.public_repos
    }
}

// Loop tất cả user và trả về.
const fetchUserInfo = async (names) => {
    const requests = names.map((name) => {
        const url = `https://api.github.com/users/${name}`
        return fetchGithubInfo(url)
            .then((a) => {
                return a;
            })
    })
    return Promise.all(requests)
}


fetchUserInfo(['sindresorhus', 'yyx990803', 'gaearon'])
    .then(a => console.log(JSON.stringify(a)))