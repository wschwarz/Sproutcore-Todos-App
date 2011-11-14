// ==========================================================================
// Project:   Todos Unit Test (GetTodosTags views)
// ==========================================================================

var mockFunction, MockObject;
module("Todos.GetTodosTags", {
	setup: function () {
		mockFunction = Todos.todoListController.getTagsByTodo;
    	MockObject = CoreTest.stub('Todos.todoListController.getTagsByTodo', function() { return YES; });
    	Todos.todoListController.getTagsByTodo = MockObject;
	},
	teardown: function() {
		Todos.todoListController.getTagsByTodo = mockFunction;
	}
});

test("tags test", function() {
  	var view = Todos.GetTodosTags.create({title:"Build my first Sproutcore app"});
  	var tags = view.get('tags');
  	equals(MockObject.callCount, 1, " correct function fired");
});
