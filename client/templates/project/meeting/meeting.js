
Template.meeting.helpers({
  singleEvent: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  }
});

Template.meeting.events({
  "click .event-completed button": function(e){
    var project = Projects.findOne();
    var projectId = Session.get("projectId")
    var events = project.events;
    var object = {};
    var index = Session.get("event_index");
    var completedMod = 'events.' + index + '.completed';

    if(events[Session.get("event_index")].completed){
      object[completedMod] = false
      Projects.update({_id: projectId}, {$set: object})
    } else {
      object[completedMod] = true
       Projects.update({_id: projectId}, {$set:  object})
    }
    //   Session.set("eventCompleted", !event.target.checked)
    console.log(object)
    console.log(this)
    console.log(Session.get("event_index"))   
  },
  "blur .single-event-details li": function(e){

    var currentProject = Projects.findOne()._id;
    // variables below grab changes to the event-details by the user
    // these are meant to be sent to mongo to update on server-side

    var title = document.getElementById("single-event-title").innerText;
    var location = document.getElementById("single-event-location").innerText;
    var date = document.getElementById("single-event-date").innerText;
    var notes = document.getElementById("single-event-notes").innerText;
		var index = Session.get("event_index");
		var obj = {};
		var titleMod = 'events.' + index + '.title';
		var dateMod = 'events.' + index + '.date';
		var notesMod = 'events.' + index + '.notes';
		var locationMod = 'events.' + index + '.location';
		obj[titleMod] = title;
		obj[dateMod] = date;
		obj[notesMod] = notes;
		obj[locationMod] = location;
    Projects.update({_id: currentProject},{$set: 
			obj
    }) 
  }
})
// helpers required for all changes to events page being reflected in the database


