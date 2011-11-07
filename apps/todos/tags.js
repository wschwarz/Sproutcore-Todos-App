sc_require('resources/library/jquery.blockUI.js');

Todos.TagsView = SC.TemplateView.extend({
	templateName: 'tags'
});

Todos.CreateTagView = SC.TextField.extend({
	tagsBinding: 'Todos.tagsController.',
	titleBinding: '.parentView.content.title',
	insertNewline: function() {
		var value = this.get('value');
		var title = this.get('title');
		
		if (value) {
			Todos.todoListController.createTag(title, value);
			this.set('value', '');
		}
	}
});

Todos.tagsController = SC.ObjectController.create({
	content: [],
	
	showTagsView: function() {
		$.blockUI({ 
			message: $('#tags')
		});
		/*$("#tag-button").click(function() {
			$('#tags').removeClass('hidden');
			
		});*/
	},
	
	// function for displaying tags on main todo view
	getTagsByTodo: function(title) {
		var todo = Todos.store.find(Todos.Todo).filterProperty('title', title).firstObject();
		var display = "";
		todo.get('tags').forEach( function(item) {
			display += item.get('name') + ", ";
		})
		return display.substring(0, display.length - 2);
	},
	
	//helper function for tagsController
	getChecked: function() { return Todos.store.find(Todos.Todo).filterProperty('isDone', true); },
	
	/*add
		need checked todo items
		if new add tag to tags and link checked items to new tag
		if none checked add tag to tags*/
	addATag: function(title) {
		var tag = Todos.store.createRecord(Todos.Tag, {name: title});
		//console.log(tag.get('name'));
		this.getChecked().forEach(function (item) {
			//console.log(item.get('title'));
			item.get('tags').pushObject(tag);
			//console.log(item.get('tags').length());
		});
	},
	
	/*
	tag clicked
		need checked todo items
		assign tag to checked items
		if none checked do nothing*/
	clickTag: function(tagClicked) {
		if (this.getChecked().length != 0) {
			this.getChecked().forEach(function (todoitem) {
				todoitem.get('tags').pushObject(tagClicked);
			});
		}
	},
	
	/*
	delete
		remove tag from tags and remove links 
	*/	
	deleteTag: function(tagNameToDelete) {
		var tagToDelete = Todos.store.find(Todos.Tag).filterProperty('name', tagNameToDelete);
		var todosLinkedWithTag = Todos.store.find(Todos.Todo);
		todosLinkedWithTag.forEach( function(todoitem) {
			todoitem.get('tags').removeObject(tagToDelete);
		});
		if (tagToDelete) tagToDelete.destroy();
	}
});