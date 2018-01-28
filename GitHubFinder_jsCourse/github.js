class GitHub {
  constructor() {
    this.client_id = 'ceca876b985f6bc9f074';
    this.client_secret = '6659742681d49ca02f43ae301dbc6423a4f8da00';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return {
      profile,
      repos
    }
  }
}