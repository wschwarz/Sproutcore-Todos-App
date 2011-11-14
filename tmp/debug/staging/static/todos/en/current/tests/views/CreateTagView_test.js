// ==========================================================================
// Project:   Todos Unit Test (CreateTagView views)
// ==========================================================================

var mockFunction, MockObject;
module("Todos.CreateTagView", {
	setup: function () {
		mockFunction = Todos.tagsController.addATag;
    	MockObject = CoreTest.stub('Todos.tagsController.addATag', function() { return YES; });
    	Todos.tagsController.addATag = MockObject;
	},
	teardown: function() {
		Todos.tagsController.addATag = mockFunction;
	}
});

test("tags test", function() {
  	var view = Todos.CreateTagView.create({value:"Groceries"});
  	view.insertNewline();
  	equals(MockObject.callCount, 1, " correct function fired");
});
