githubUserSearch.controller('GitUserSearchController', function($scope, $resource) {

  var searchResource = $resource('https://api.github.com/search/users');
  var creds = {
      client_id: "d6dc6a59ba1cebdb9205",
      client_secret: 'eb1e63221b5d03abd382de7075d5622ddb94e2c0',
      per_page: '100'
    };

  $scope.doSearch = function() {
    $('.profile_container').hide();
    $('#search_message').hide();
    $('#repo_header').hide();
    $('.repo_container').hide();
    if ($scope.searchTerm != '') {
      $scope.searchResult = searchResource.get({
        q: $scope.searchTerm,
        client_id: "d6dc6a59ba1cebdb9205",
        client_secret: 'eb1e63221b5d03abd382de7075d5622ddb94e2c0',
        per_page: '100'
      });
      $('#search_message').show();
      $('.profile_container').show();
    }
  }

  $scope.viewRepos = function() {
    var repoResource = $resource('https://api.github.com/users/' + $scope.searchTerm + '/repos'); 
    repoResource.query(creds).$promise.then(reposHandler); 
  }

  var commitsReader = function(repo, commits) {
    repo.totalCommits = commits.length;
    repo.userCommits = 0;
    commits.forEach(function(commit) {
      if (commit.committer.login === $scope.searchTerm) {
        repo.userCommits = repo.userCommits + 1;
      }
    });
  }
  
  var reposHandler = function(repos) {
    repos.forEach(function(repo) {
      var selectedRepo = $resource('https://api.github.com/repos/' + $scope.searchTerm + '/' + repo.name + '/commits');
      selectedRepo.query(creds).$promise.then(function(commits) { commitsReader(repo, commits); });
    });
    $scope.repos = repos;
    $('#repo_header').show();
    $('.repo_container').show();
  }


});
