function GetPluginSettings() {
  return {
    "name": "fb4", // as appears in 'insert object' dialog, can be changed as long as "id" stays the same
    "id": "fb4", // this is used to identify this plugin and is saved to the project; never change it
    "version": "1.0", // (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
    "description": "Calling cordova-plugin-facebook4 by Donovan",
    "author": "Donovan",
    "help url": "http://getHelp.com",
    "category": "Plugins by Donovan", // Prefer to re-use existing categories, but you can set anything here
    "type": "object", // either "world" (appears in layout and is drawn), else "object"
    "rotatable": false, // only used when "type" is "world".  Enables an angle property on the object.
    "flags": pf_singleglobal
  };
};

// Conditions
AddCondition(1, cf_trigger, "On user logged in", "Facebook", "On user logged in", "Triggered when the user successfully logs in.", "OnLogIn");
AddCondition(2, cf_trigger, "On user logged out", "Facebook", "On user logged out", "Triggered when the user logs out.", "OnLogOut");

//////////////////////////////////////////////////////////////
// Actions
AddAction(1, 0, "Log in", "Facebook", "Log in to facebook", "Log the user in to the application so their details can be accessed.", "logIn");

AddAction(2, 0, "Log out", "Facebook", "Log out", "Log the user out.", "logOut");

AddAction(3, 0, "Prompt wall post", "Prompt with permission", "Prompt wall post", "Bring up a dialog where the user can share some text on their wall or choose to cancel.", "PromptWallPost");

AddStringParam("Message", "The text to publish to the user's feed.  It is recommended to only do this when the user initiates the action.");
AddStringParam("URL", "The link to share.", "\"http://\"");
AddStringParam("Name", "The link text.");
AddStringParam("Caption", "The caption appearing beneath the link text.");
AddStringParam("Description", "The description appearing beneath the caption.");
AddStringParam("Picture URL (optional)", "The URL of an image on your server to use on the Share dialog.  Must include the http://");
AddAction(4, 0, "Publish link", "Publish to stream", "Publish link <b>{1}</b> (<i>{0}</i>, <i>{2}</i>, <i>{3}</i>, <i>{4}</i>, <i>{5}</i>)", "Publish a link to the user's wall.  The user should explicitly initiate this.", "PublishLink");

//////////////////////////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, "Get full name", "Facebook", "FullName", "Get the user's full name, if they are logged in.");
AddExpression(1, ef_return_string, "Get first name", "Facebook", "FirstName", "Get the user's first name, if they are logged in.");
AddExpression(2, ef_return_string, "Get last name", "Facebook", "LastName", "Get the user's last name, if they are logged in.");
AddExpression(3, ef_return_number, "Get profile picture", "Facebook", "profilePicture", "Get the user profile picture.");
//////////////////////////////////////////////////////////////
ACESDone();

// Property grid properties for this plugin
var property_list = [
  new cr.Property(ept_text, "App ID", "", "The App ID Facebook gives you after creating an app."),
  new cr.Property(ept_text, "App secret", "", "The App Secret Facebook gives you after creating an app.  Only necessary for submitting scores!")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
  assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance) {
  return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
  assert2(this instanceof arguments.callee, "Constructor called as a function");

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for (var i = 0; i < property_list.length; i++)
    this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function() {}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name) {}

// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer) {}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function() {}