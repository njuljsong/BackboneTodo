define([
	"underscore",
	"backbone",
	"collections/todos",
], function(_, Backbone, Todos){
	"use strict";

	var TodoView = Backbone.View.extend({
		tagName: "li",

		template: _.template($("#item-template").html()),

		events: {
			"dblclick .view": "edit",
			"keypress .edit": "updateOnEnter",
			"click .destroy": "clear",
			"click .toggle": "toggle"
		},

		initialize: function(){
			this.listenTo( this.model, "change", this.render);
			this.listenTo( this.model, "destroy", this.remove);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass("done", this.model.get("completed"));

			return this;
		},

		edit: function(){
			this.$el.addClass("editing");
			this.$(".edit").focus();
		},

		updateOnEnter: function(e){
			if( e.keyCode === 13 ) {
				this.close();
			}
		},

		close: function(){
			var val = this.$(".edit").val().trim();
			if( !val ) {
				this.clear();
			}else {
				this.model.save({title: val});
				this.$el.removeClass("editing");
			}
		},

		clear: function(){
			this.model.destroy();
		},

		toggle: function(){
			this.model.toggle();
		}

	});

	return TodoView;
});