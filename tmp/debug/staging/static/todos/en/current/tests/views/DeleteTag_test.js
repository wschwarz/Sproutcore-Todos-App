// ==========================================================================
// Project:   Todos Unit Test (DeleteTag view)
// ==========================================================================

var mockFunction, MockObject;
module("Todos.DeleteTag", {
	setup: function () {
		mockFunction = Todos.tagsController.deleteTag;
    	MockObject = CoreTest.stub('Todos.tagsController.deleteTag', function() { return YES; });
    	Todos.tagsController.deleteTag = MockObject;
	},
	teardown: function() {
		Todos.tagsController.deleteTag = mockFunction;
	}
});

test("tags test", function() {
  	var view = Todos.DeleteTag.create({name:"Groceries"});
  	view.mouseDown();
  	equals(MockObject.callCount, 1, " correct function fired");
});
