Todos.Todo = SC.Record.extend({ 
	title: SC.Record.attr(String), 
	isDone: SC.Record.attr(Boolean, {defaultValue: NO}),
	tags: SC.Record.attr(Array, {isRequired: NO})
});

Todos.Todo.FIXTURES = [
	{	"guid": "todo-1",
		"title": "Build my first Sproutcore app",
		"isDone": false,
		"tags": new Array("app", "sproutcore")},
	{	"guid": "todo-2",
		"title": "Build a really awesome Sproutcore app",
		"isDone": false,
		"tags": new Array("todo")},
	{	"guid": "todo-3",
		"title": "Next, the world!",
		"isDone": false }
];; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('todos');