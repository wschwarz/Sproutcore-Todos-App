// ==========================================================================
// Project:   Todos
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/* globals Todos */

sc_require('resources/library/jquery.blockUI.js');

Todos = SC.Application.create({
	store: SC.Store.create().from(SC.Record.fixtures)
});

Todos.Todo = SC.Record.extend({ 
	title: SC.Record.attr(String), 
	isDone: SC.Record.attr(Boolean, {defaultValue: NO}),
	tags: SC.Record.toMany('Todos.Tag', { isMaster: YES })
});

Todos.Tag = SC.Record.extend({ 
	name: SC.Record.attr(String)
});

Todos.Todo.FIXTURES = [
	{	"guid": "todo-1",
		"title": "Build my first Sproutcore app",
		"isDone": false	},
	{	"guid": "todo-2",
		"title": "Build a really awesome Sproutcore app",
		"isDone": false},
	{	"guid": "todo-3",
		"title": "Next, the world!",
		"isDone": true}
];

Todos.Tag.FIXTURES = [
	{	"guid": "tag-1",
		"name": "TestTag 1"}
];

Todos.MarkDoneView = SC.Checkbox.extend({
	titleBinding: '.parentView.content.title',
	valueBinding: '.parentView.content.isDone',
});

Todos.GetTodosTags = SC.TemplateView.extend({
	titleBinding: '.parentView.content.title',
	tags: function() {
		return Todos.tagsController.getTagsByTodo(this.get('title'));
	}.property('title')
});

Todos.StatsView = SC.TemplateView.extend({
	templateName: 'stats',
	remainingBinding: 'Todos.todoListController.remaining',
	
	displayRemaining: function() {
		var remaining = this.get('remaining');
		return remaining + (remaining === 1 ? " item" : " items");
	}.property('remaining')
});

Todos.CreateTodoView = SC.TextField.extend({
	insertNewline: function() {
		var value = this.get('value');

    	if (value) {
			Todos.todoListController.createTodo(value);
			this.set('value', '');
		}
	}
});

Todos.todoListController = SC.ArrayController.create({
	// Initialize the array controller with an empty array.
	content: [],
	  
	createTodo: function(title) {
		Todos.store.createRecord(Todos.Todo, {title: title});
	},
	
	createTag: function(title, tag) {
		this.filterProperty('title', title).forEach(function (item) {
			var previousTags = item.get('tags');
			if (previousTags) {
				previousTags.pushObject(tag);
				item.set('tags', previousTags);
			}
			else {
				item.set('tags', new Array(tag));
			}
		});
	},
	
	sortByTags: function() {
		query = SC.Query.local(Todos.Todo, { 
  			orderBy: 'tags'
		});
		var items = Todos.store.find(query);
		Todos.todoListController.set('content', items);
	},
	  
	remaining: function() {
		return this.filterProperty('isDone', false).get('length');  	
	}.property('@each.isDone'),
	  
	clearCompletedTodos: function() {
		this.filterProperty('isDone', true).forEach(function(item) {
	  		item.destroy();
		});
	},
	  
	allAreDone: function(key, value) {
		if (value !== undefined) {
			this.setEach('isDone', value);
			return value;
		} else {
			return this.get('length') && this.everyProperty('isDone', true);
		}
	}.property('@each.isDone')
});

SC.ready(function () {
	Todos.mainPane = SC.TemplatePane.append({
		layerId: 'todos',
		templateName: 'todos'
	});
	var todos = Todos.store.find(Todos.Todo);
	var tags = Todos.store.find(Todos.Tag);
	todos.firstObject().get('tags').pushObject(tags.firstObject());
	console.log(todos.firstObject().get('tags').length());
	Todos.todoListController.set('content', todos);
	Todos.tagsController.set('content', tags);
});

$(document).ready(function () {
	$("#tag-button").click(function() {
		$('#tags').removeClass('hidden');
		$.blockUI({ 
			message: $('#tags')
		});
	});
});

function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback

   // fire the loading
   head.appendChild(script);
}