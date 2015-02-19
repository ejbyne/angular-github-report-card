describe('GitUserSearchController', function() {
	beforeEach(module('GitUserSearch'));

	var scope, ctrl;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('GitUserSearchController', {
			$scope: scope
		});
	}));

	it('should initialise with an empty search result and term', function() {
		expect(scope.searchResult).toBeUndefined();
		expect(scope.searchTerm).toBeUndefined();
	});

	describe('when searching for a user', function() {

		var httpBackend;
		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend
			httpBackend
				.when("GET", "https://api.github.com/search/users?client_id=d6dc6a59ba1cebdb9205&client_secret=eb1e63221b5d03abd382de7075d5622ddb94e2c0&per_page=100&q=hello")
				.respond({
					items: items
				});
		}));
	
		var items = [{
			"login": "tansaku",
			"avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
			"html_url": "https://github.com/tansaku"
		}, {
			"login": "stephenlloyd",
			"avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
			"html_url": "https://github.com/stephenlloyd"
		}];

		it('should display search results', function() {
			scope.searchTerm = 'hello';
			scope.doSearch();
			httpBackend.flush();
			expect(scope.searchResult.items).toEqual(items);
		});
	});

	describe('when clicking view report', function() {

		var httpBackend;
		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend
			httpBackend
				.when("GET", "https://api.github.com/users/hello/repos?client_id=d6dc6a59ba1cebdb9205&client_secret=eb1e63221b5d03abd382de7075d5622ddb94e2c0&per_page=100")
				.respond(reposArray);
			httpBackend
				.when("GET", "https://api.github.com/repos/hello/test/commits?client_id=d6dc6a59ba1cebdb9205&client_secret=eb1e63221b5d03abd382de7075d5622ddb94e2c0&per_page=100")
				.respond(commitsArray);
		}));
	
		var reposArray = [ { name: 'test' } ];

		var commitsArray = [ { committer: {login: 'hello'} } ];

		var result = { name: 'test', totalCommits: 1, userCommits: 1 };

		it('should display repo information', function() {
			scope.searchTerm = 'hello';
			scope.viewRepos();
			httpBackend.flush();
			console.log('==================')
			console.log(scope.repos[0]);
			console.log(result);

			expect(scope.repos).toEqual(result);
		});
		
	});

});