// ==========================================================================
// Project:   Todos Unit Test (todoListController)
// ==========================================================================
/* Function List
 * addATag 
 * clickTag
 * deleteTag
 * showTagsView (jquery)
 * closeTagsView (jquery)
 */

module("Todos.tagsController", {
	setup: function () {
	},
	teardown: function () {
	}
});

test("addATag test", function() {
	var tagNameToAdd = "Groceries";
	Todos.tagsController.addATag(tagNameToAdd);
	//ensure tag was added
	var tags = Todos.store.find(Todos.Tag).filterProperty('name', tagNameToAdd);
	equals(tags.length, 1, "tag added to store");
	//ensure tag was properly assigned
	var tagfound = false;
	var todos = Todos.store.find(Todos.Todo).filterProperty('isDone', true);
	todos.forEach(function(todoitem) {
		todoitem.get('tags').forEach(function(tagitem) {
			if (tagitem.get('name') == tagNameToAdd) {
				tagfound = true;
			}
		});
	});
	equals(tagfound, true, "added tag properly linked");
});

test("clickTag test", function() {
	var tagNameToClick = "Projects";
	Todos.tagsController.clickTag(tagNameToClick);
	var todosChecked = Todos.store.find(Todos.Todo).filterProperty('isDone', true);
	var tagFound = false;
	todosChecked.forEach(function(todoitem) {
		todoitem.get('tags').forEach(function (tagitem){
			if (tagitem.get('name') == tagNameToClick) tagFound = true;
		});		
	});
	equals(tagFound, false, "tag linked on click");
});

test("deleteTag test", function () {
	var tagNameToDelete = "History";
	var tagDeleted = Todos.store.find(Todos.Tag).filterProperty('name', tagNameToDelete);
	Todos.tagsController.deleteTag(tagNameToDelete);
	var checkDeletedTag = Todos.store.find(Todos.Tag).filterProperty('name', tagNameToDelete);
	equals(checkDeletedTag.length, 0, "tag deleted");
	var todos = Todos.store.find(Todos.Todo);
	var success = true;
	todos.forEach( function (todoitem) {
		todoitem.get('tags').forEach(function(tagitem) {
			if (tagitem.get('name') == tagNameToDelete)
				success = false;
		});
	});
	equals(success, true, " no links to deleted tag found");
});