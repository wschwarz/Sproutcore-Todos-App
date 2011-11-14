SC.TEMPLATES["todos"] = SC.Handlebars.compile("<!-- tagging section: hidden by default -->\n<div id=\"boxes\">\n    <div id=\"dialog\" class=\"window\">\n    \t{{#view SC.Button class=\"sc-buttonclear\" classBinding=\"isActive\"\n\t\t\t\ttarget=\"Todos.tagsController\"\n\t\t\t\taction=\"closeTagsView\"}}\n\t\t\t\t<div id=\"closebutton\"> &nbsp; </div>\n\t\t{{/view}}\n    \t<h2>Tags</h2>\n        <br />\n        {{view Todos.TagsView id=\"tags\"}}\n       \n    </div>\n    <div id=\"mask\"></div>\n</div>\n<!-- end of tagging section -->\n<h1>Todos</h1>\n\n{{#view Todos.CreateTodoView}}\n\t<input id=\"new-todo\" type=\"text\" placeholder=\"What needs to be done?\" />\n{{/view}}\n\n{{view Todos.StatsView id=\"stats\"}}\n\n{{view SC.Checkbox class=\"left mark-all-done\" style=\"display:inline\"\n\t\ttitle=\"Mark All as Done\"\n\t\tvalueBinding=\"Todos.todoListController.allAreDone\"}}\n\t\t\n<div class=\"right tag-title\" style=\"display:inline\">\n\t{{#view SC.Button target=\"Todos.todoListController\" action=\"sortByTags\"}}Tags{{/view}}\n</div>\t\n<br />\n\t\n{{#collection SC.TemplateCollectionView contentBinding=\"Todos.todoListController\"\n\t\t\t\t\t\t\t\t\t\titemClassBinding=\"content.isDone\"}}\n  {{view Todos.MarkDoneView class=\"left\" }}\n  {{#view Todos.GetTodosTags}}\n  \t{{tags}}&nbsp;\n  {{/view}}\n{{/collection}}\n\n\n\n\n");