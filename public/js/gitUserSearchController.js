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

  var reposHandler = function(result) {
    result.forEach(function(item) {
      var selectedRepo = $resource('https://api.github.com/repos/' + $scope.searchTerm + '/' + item.name + '/commits');
      selectedRepo.query(creds).$promise.then(function(result) {
        item.totalCommits = result.length;
        item.userCommits = 0;
        result.forEach(function(commit) {
          if (commit.committer.login === $scope.searchTerm) {
            item.userCommits = item.userCommits + 1;
          }
        })
      })
    });
    $scope.repos = result;
  }

  $scope.viewRepos = function() {
    var repoResource = $resource('https://api.github.com/users/' + $scope.searchTerm + '/repos'); 
    repoResource.query(creds).$promise.then(reposHandler)    
    $('#repo_header').show();
    $('.repo_container').show();
  }
});
