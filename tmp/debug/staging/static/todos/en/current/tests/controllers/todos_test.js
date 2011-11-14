// ==========================================================================
// Project:   Todos Unit Test (todoListController)
// ==========================================================================
/* Function List
 * getChecked 
 * getTagsByTodo
 * remaining
 * sortByTags
 * refresh
 * createTodo
 * clearCompletedTodos
 * allAreDone
 */

module("Todos.todoListController", {
	setup: function () {
	},
	teardown: function () {
	}
});


test("getChecked test", function() { 	
	var checkedTodos = Todos.todoListController.getChecked();
	equals(checkedTodos.length, 1, "correct # of results");
	equals(checkedTodos.firstObject().get('title'), "Next, the world!");
});

test("getTagsByTodo test", function() {
	var todoTitleToGetTags = "Build my first Sproutcore app";
	var stringForDisplay = Todos.todoListController.getTagsByTodo(todoTitleToGetTags);
	console.log(stringForDisplay);
	equals(stringForDisplay, " Projects", "Correct display string received");
});

test("remaining test", function() { 	
	var remaining = Todos.todoListController.remaining();
	var expected = 2;
	equals(remaining, expected, "remaining should equal expected");
});

test("sortByTags test", function() {
	Todos.todoListController.sortByTags();
	var todos = Todos.store.find(Todos.Todo);
	todos.forEach(function (item) {
		if (item.get('title') == "Build my first Sproutcore app")
			equals(item.get('sortOrder'), 4, "sortOrder set correctly");
		if (item.get('title') == "Build a really awesome Sproutcore app")
			equals(item.get('sortOrder'), 2, "sortOrder set correctly");
		if (item.get('title') == "Next, the world!")
			equals(item.get('sortOrder'), 3, "sortOrder set correctly");
	});
});

test("refresh test", function() {
	Todos.todoListController.refresh();
	var todos = Todos.todoListController.get('content');
	var prevSortOrder = 0;
	var correct = true;
	todos.forEach(function(item) {
		if (item.get('sortOrder') >= prevSortOrder) {
			prevSortOrder = item.get('sortOrder');
		}
		else correct = false;
	});
	equals(correct, true, "correct order");
});

test("createTodo test", function() {
	var testTitle = "Create Todo Test";
	Todos.todoListController.createTodo(testTitle);
	
	//find object in store to make sure it was created.
	var query = SC.Query.local(Todos.Todo, {
		conditions: 'title = {Title}',
		Title: testTitle
	});
	todoitem = Todos.store.find(query);
	
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
	var items = Todos.store.find(Todos.Todo).filterProperty('name', testTitle);
	equals(items.length, 0, "should not exist");
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