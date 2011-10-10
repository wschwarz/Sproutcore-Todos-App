// ==========================================================================
// Project:   Todos Unit Test
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos module test ok equals same stop start */
var items, checkboxes, view;
module("Todos.MarkDoneView", {
	setup: function() {
		checkboxes = $(".sc-checkbox");
		items = Todos.store.find(Todos.Todo);
		view = Todos.mainPane.childViews;
	},
	teardown: function() {
		view = items = checkboxes = null;
	}
});

// TODO: Replace with real unit test
test("titleBinding test", function() {
  var titles = extractTitle();
  var testItem = "Next, the world!";
  equals($.inArray(testItem, titles), 3, "title not changed test");
  //change titles
  items.forEach(function (item) {
  	item.set('title', item.get('title') + "!!");
  });
  // NOTE: the bindings aren't updating for the test and I couldn't figure out why
  // thats why these assertions are failing
  checkboxes = $(".sc-checkbox");
  titles = extractTitle();
  equals($.inArray(testItem, titles), -1, "title changed test");
});

test("isDoneBinding test", function() {
  var isDones = extractisDone();
  var testIndex = 2;
  equals(isDones[testIndex], "false", "is Done binding not changed test");
  // set them all to done
  items.forEach(function (item) {
  	item.set('isDone', true);
  });
  // NOTE: the bindings aren't updating for the test and I couldn't figure out why
  // thats why these assertions are failing
  checkboxes = $(".sc-checkbox");
  titles = extractTitle();
  equals(isDones[testIndex], "true", "isDone changed test");
});

function extractTitle() {
	var objArray = new Array();
	checkboxes.children().each(function (index){
		objArray.push($(this).text());
	});
	return objArray;
}

function extractisDone() {
	var objArray = new Array();
	checkboxes.children().each(function (index){
		objArray.push($(this).checked ? "true":"false");
	});
	return objArray;
}