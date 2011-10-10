// ==========================================================================
// Project:   Todos Unit Test (todoListController)
// ==========================================================================
/* globals Todos module test ok equals same stop start */

module("Todos.todoListController", {
	setup: function () {
		Todos.store.find(Todos.Todo).forEach( function(item) {
	  		item.destroy();
		});
		Todos.store = SC.Store.create().from(SC.Record.fixtures);
		var todos = Todos.store.find(Todos.Todo);
		Todos.todoListController.set('content', todos);
		console.log("setup completed");
	},
	teardown: function () {
		Todos.store.find(Todos.Todo).forEach( function(item) {
	  		item.destroy();
		});
		console.log("teardown completed");
	}
});

test("remaining test", function() { 	
	// 3 items loaded from fixtures when Todo namespace is created.
	var remaining = Todos.todoListController.remaining();
	var expected = 3;
	equals(remaining, expected, "remaining should equal expected");
});

test("createTodo test", function() {
	var testTitle = "Create Todo Test";
	Todos.todoListController.createTodo(testTitle);
	
	//find object in store to make sure it was created.
	todoitem = findByTitle(testTitle);
	
	if (todoitem.length())
		equals(todoitem.firstObject().get('title'), testTitle, "Item created and exists in the ArrayController");
	else
		equals (1, 0, "test failed, query return null");
});

test("clearCompletedTodos test", function() {
	var testTitle = "Item to Clear";
	Todos.store.createRecord(Todos.Todo, {title: testTitle, isDone: true });
	Todos.todoListController.clearCompletedTodos();
	//item should no longer exist in the store.
	var items = Todos.store.find(Todos.Todo);
	equals(findByTitle(testTitle).length(), 0, "should not exist");
});

test("allAreDone test", function() {
	var result = Todos.todoListController.get('allAreDone');
	equals (result, false, "allAreDone returns false");
	
	result = Todos.todoListController.set('allAreDone', true);
	result.forEach(function(item, index, self) {
  		equals (item.get('isDone'), true, "check each item to make sure value is set")
	});
	
	result = Todos.todoListController.get('allAreDone');
	equals (result, true, "allAreDone returns true");
});

function findByTitle(titleToFind) {
	var query = SC.Query.local(Todos.Todo, {
		conditions: 'title = {title}',
		title: titleToFind
	});
	return Todos.store.find(query);
}

