// ==========================================================================
// Project:   Todos Unit Test (TagsListView view)
// ==========================================================================

var mockFunction, MockObject;
module("Todos.TagsListView", {
	setup: function () {
		mockFunction = Todos.tagsController.clickTag;
    	MockObject = CoreTest.stub('Todos.tagsController.clickTag', function() { return YES; });
    	Todos.tagsController.clickTag = MockObject;
	},
	teardown: function() {
		Todos.tagsController.clickTag = mockFunction;
	}
});

test("tags test", function() {
  	var view = Todos.TagsListView.create({name:"Build my first Sproutcore app"});
  	view.mouseDown();
  	equals(MockObject.callCount, 1, " correct function fired");
});
