Todos.CreateTodoView = SC.TextField.extend({
	insertNewline: function() {
		var value = this.get('value');

    	if (value) {
			Todos.todoListController.createTodo(value);
			this.set('value', '');
		}
	}
});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('todos');