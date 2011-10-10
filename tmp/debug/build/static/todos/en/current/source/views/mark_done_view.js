Todos.MarkDoneView = SC.Checkbox.extend({
	titleBinding: '.parentView.content.title',
	valueBinding: '.parentView.content.isDone'
});; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('todos');