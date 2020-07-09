class GitHub {
    constructor() {
        this.client_id = 'd9ccb98e72d4ef587cc9';
        this.client_secret = '400bccf8a266b4fdce3c4418fae31ea15f09273e';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            // profile : profile ---- if it is like this, we can use just profile like show below
            profile,
            repos
        }
    }
}