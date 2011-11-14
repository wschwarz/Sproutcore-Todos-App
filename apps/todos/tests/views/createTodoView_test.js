// ==========================================================================
// Project:   Todos Unit Test
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/* globals Todos module test ok equals same stop start */
var mockedCreateFunction, createMockObject;
module("Todos.createTodoView", {
	setup: function () {
		mockedCreateFunction = Todos.todoListController.createTodo;
    	createMockObject = CoreTest.stub('Todos.todoListController.createTodo', function() { return YES; });
    	Todos.todoListController.createTodo = createMockObject;
	},
	teardown: function() {
		Todos.todoListController.createTodo = mockedCreateFunction;
	}
});

// TODO: Replace with real unit test
test("insertNewLine test", function() {
  var view = Todos.CreateTodoView.create({value: "test"});
  view.insertNewline();
  equals(createMockObject.callCount, 1, "View should fire controller.create on submit event.");
});

