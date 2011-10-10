// ==========================================================================
// Project:   Todos Unit Test (stats views)
// ==========================================================================
/*globals Todos module test ok equals same stop start */

module("Todos.StatsView", {
	setup: function () {
	},
	teardown: function() {
	}
});

test("displayRemaining test", function() {
  	var view = Todos.StatsView.create({remaining: 10});
  	equals(view.get('displayRemaining'), "10 items", "created the view with remaining equal to 10");
});
