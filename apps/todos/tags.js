Todos.TagsView = SC.TemplateView.extend({
	templateName: 'tags'
});

Todos.TagsListView = SC.TemplateView.extend({
	nameBinding: '.parentView.content.name',
	mouseDown: function(evt) {
		//initialize
		var tagname = this.get('name');
		//clear all selections
		Todos.store.find(Todos.Tag).filterProperty('selected', true).forEach(function(item) {item.set('selected', false);});
		$("li").removeClass('selected');
		//set selected tag to selected
		var selectedTag = Todos.store.find(Todos.Tag).filterProperty('name', tagname).firstObject();
		if (selectedTag) selectedTag.set('selected', true);
		$("li:contains('" + tagname +"')").addClass('selected');
		var selecteds = Todos.store.find(Todos.Tag).filterProperty('selected', true);
		Todos.tagsController.clickTag(this.get('name'));
	},
	keyDown: function(evt) {
		if (evt.which == 46)
		{
			evt.preventDefault();
		 	var selectedTag = Todos.store.find(Todos.Tag).filterProperty('selected', true).firstObject();
		 	if (selectedTag)
		 		Todos.tagsController.deleteTag(selectedTag.get('name'));
		 	else
		 		console.log("none selected");
		}
	}
});

Todos.CreateTagView = SC.TextField.extend({
	insertNewline: function() {
		var value = this.get('value');
		
		if (value) {
			Todos.tagsController.addATag(value);
			this.set('value', '');
		}
	}
});

Todos.DeleteTag = SC.TemplateView.extend({
	nameBinding: '.parentView.name',
	mouseDown: function(evt) {
		Todos.tagsController.deleteTag(this.get('name'));
	}
});

Todos.ClearControlView = SC.TemplateView.extend({
	mouseDown: function(evt) {
		$("#new-tag").val(''); 
	}
});

Todos.tagsController = SC.ArrayController.create({
	content: [],
	
	/* 	addATag function:
	*	requirements - 
	*	need checked todo items
	*	if new add tag to tags and link checked items to new tag
	*	if none checked add tag to tags
	*/
	addATag: function(title) {
		var guid = new Date();
		var tag = Todos.store.createRecord(Todos.Tag, {name: title, guid: guid.getMilliseconds()}); //crude randomizer
		Todos.todoListController.getChecked().forEach(function (item) {
			console.log("Adding " + tag.get('name') + " to " + item.get('title'));
			item.get('tags').pushObject(tag);
		});
		Todos.todoListController.refresh();
	},
	
	/*	clickTag function:
	*	need checked todo items
	*	assign tag to checked items
	*	if none checked do nothing
	*/
	clickTag: function(tagClicked) {
		var tagToLink = Todos.store.find(Todos.Tag).filterProperty('name', tagClicked).firstObject();
		console.log("Linking: " + tagToLink.get('name') + " to any checked todo items");
		Todos.todoListController.getChecked().forEach(function (todoitem) {
			if (todoitem.get('tags').indexOf(tagToLink) == -1)
				todoitem.get('tags').pushObject(tagToLink);
			else //toggle tags
				todoitem.get('tags').removeObject(tagToLink);
		});
		Todos.todoListController.refresh();
	},
	
	/*	deleteTag function:
	* 	remove tag from tags and remove links 
	*/	
	deleteTag: function(tagname) {
		var tagToDelete = Todos.store.find(Todos.Tag).filterProperty('name', tagname).firstObject();
		console.log("Begin deleting: " + tagToDelete.get('name'));
		var todosLinkedWithTag = Todos.store.find(Todos.Todo);
		todosLinkedWithTag.forEach( function(todoitem) {
			todoitem.get('tags').removeObject(tagToDelete);
		});
		if (tagToDelete && (tagToDelete.get('status') & SC.Record.READY)) {
			tagToDelete.destroy();
			console.log(tagToDelete.get('name') + " deleted");
		}
		Todos.todoListController.refresh();
	},
	
	showTagsView: function() {

        var id = $("#modal");
     
        //Get the screen height and width
        var maskHeight = $(document).height() - 100;
        var maskWidth = 300;
     
        //Set height and width to mask to fill up the whole screen
        		
		$('#mask').css({'left': '620px', 'top': '-25px'});
		$('#mask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect     
        $('#mask').fadeIn(1000);    
        $('#mask').fadeTo("slow",0.8);  
     
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
     
        //transition effect
        $("#dialog").fadeIn(2000); 
	},
	
	closeTagsView: function() {
		var tagleftover = $("#new-tag").val();
		if (tagleftover.length > 0)
			Todos.tagsController.addATag(tagleftover);
    	$('#mask, .window').hide();
	}
});