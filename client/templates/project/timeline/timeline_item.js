Template.timelineItem.helpers({
  type: function() {
    var type = this.value.type;
    return type.charAt(0).toUpperCase() + type.slice(1);
  },
  details: function() {
    if (this.value.title) {
      var title = this.value.title;
      return "(" + title + ")";
    } else {
      var items = this.value.items;
      var total = _.reduce(items, function(sum, item){
        return sum + (item.qty * item.price);
      }, 0);
      return "($" + (total *  1.12).toFixed(2) + ")";
    }
  },
  index: function() {
    return this.index;
  },
  completed: function() {
    return this.value.completed;
  }
})

Template.timelineItem.events({
  "click .cd-timeline-content": function(e) {
    var template_type = e.currentTarget.parentElement.parentElement.dataset.template;
    var event_index = e.currentTarget.parentElement.parentElement.dataset.index;
    Session.set("template", template_type);
    Session.set("event_index", event_index);
  },
  'click .delete-timeline-item': function() {
    var events = Projects.findOne({'_id':Session.get('projectId')}).events;
    var newEvents = events.splice(Session.get('event_index'),1);
    Projects.update({'_id':Session.get('projectId')},
        {$set:{events: events}});
  },
  "click .cd-timeline-img": function(e) {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var projectId = Session.get("projectId");
    var events = project.events;
    var index = e.currentTarget.parentElement.parentElement.dataset.index;

    var obj = {};
    var completeMod = 'events.' + index + '.completed';

    if(events[index].completed){
      obj[completeMod] = false;
      Projects.update({_id: projectId}, {$set: obj });
    } else {
      obj[completeMod] = true;
      Projects.update({_id: projectId}, {$set: obj });
    }
    //   Session.set("eventCompleted", !event.target.checked)
    var project = Projects.findOne({_id: Session.get("projectId")});
    var projectId = project._id;
    var events = project.events;
  }
})