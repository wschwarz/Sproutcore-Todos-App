// ==========================================================================
// Project:   Todos Unit Test (stats views)
// ==========================================================================
/*globals Todos module test ok equals same stop start */

module("Todos.StatsView", {
	setup: function () {
		//SC.RunLoop.begin();
	},
 
	teardown: function() {
	    /*
		SC.RunLoop.begin();
	    Todos.getPath('mainPage.mainPane').remove();
	    Todos.store.reset();
	    SC.RunLoop.end(); */
	}
});

test("displayRemaining test", function() {
  	var view = Todos.StatsView.create({remaining: 10});
  	equals(view.get('displayRemaining'), "10 items", "created the view with remaining equal to 10");
});
