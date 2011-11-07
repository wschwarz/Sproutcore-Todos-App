// ==========================================================================
// Project:   Todos Unit Test (todoListController)
// ==========================================================================
/* globals Todos module test ok equals same stop start */

module("Todos.tagsController", {
	setup: function () {
		
		var tagitem = Todos.store.find(Todos.Tag);
		if (!tagitem)
			Todos.store.createRecord(Todos.Tag, {name: 'TestTag'});
		/*
		var item = Todos.Tag.create({name: "Homework"});
		console.log(item.get('name'));
		
		var todo = Todos.store.find(Todos.Todo).firstObject();
		console.log(todo.get('title'));
		var tag = Todos.store.find(Todos.Tag).firstObject();
		console.log(tag.get('name'));
		*/
	},
	teardown: function () {
		
	}
});



test("getChecked test", function() { 	
	// 3 items loaded from fixtures when Todo namespace is created.
	var checkedTodos = Todos.tagsController.getChecked();
	//console.log(checkedTodos.firstObject().get('title'));
	//console.log("checkedTodos: " + checkedTodos.length);
	equals(checkedTodos.length, 1, "correct # of results");
	equals(checkedTodos.firstObject().get('title'), "Next, the world!");
});

test("addATag test", function() {
	//ensure tag was added
	Todos.tagsController.addATag("testTag");
	var tags = Todos.store.find(Todos.Tag);
	tags.forEach(function(item) {
		console.log(item.get('name'));
	});
	if (tags) {
		equals(tags.firstObject().get('name'), 'testTag', 'tag successfully added');
	}
	else { equals(0, 1, 'tag was not added'); }
	//ensure tag was properly assigned
	var tagfound = false;
	var todos = Todos.store.find(Todos.Todo).filterProperty('isDone', true);
	todos.forEach(function(todoitem) {
		if (todoitem.get('tags').length != 0 ){
			todoitem.get('tags').forEach(function(tagitem) {
				console.log(tagitem);
				if (tagitem.get('name') == "testTag") {
					equals(tagitem.get('name'), "testTag", "tag properly assigned");
					tagfound = true;
				}
			});
		}
	});
	if (tagfound) { equals(1,1, "tag assigned");}
	else { equals(0, 1, "tag was not assigned");}
});

test("clickTag test", function() {
	Todos.tagsController.clickTag("TestTag 1");
	var todosChecked = Todos.store.find(Todos.Todo).filterProperty('isDone', true);
	var tagFound = false;
	todosChecked.forEach(function(todoitem) {
		todoitem.get('tags').forEach(function (tagitem){
			if (tagitem.get('name') == "TestTag 1") {
				equals(tagitem.get('name'), "TestTag 1");
				tagFound = true;
			}
		});		
	});
	if (tagFound) equals( 1, 1, "tag found");
	else equals(1, 0, "tag not found");
});

test("deleteTag test", function () {
	Todos.tagsController.deleteTag("TestTag");
	var tagDeleted = Todos.store.find(Todos.Tag).filterProperty('name', "TestTag");
	equals(tagDeleted.length(), 0, "tag deleted");
});