// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.fb4 = function(runtime) {
  this.runtime = runtime;
};

(function() {
  var pluginProto = cr.plugins_.fb4.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function(plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  var fbReady = false;
  var fbLoggedIn = false;
  var fbUserID = "";
  var fbFullName = "";
  var fbFirstName = "";
  var fbLastName = "";
  var fbProfilePic = "";

  var triggeredReady = false;

  function onFBLogin() {
    if (!fbLoggedIn) {
      if (typeof window['facebookConnectPlugin'] == 'undefined') {
        return;
      } else {
        window['facebookConnectPlugin'].api('/me?fields=name,email,first_name,last_name,picture.type(large)', ["email", "public_profile"], function(response) {
          fbFullName = response["name"];
          fbFirstName = response["first_name"];
          fbLastName = response["last_name"];
          fbProfilePic = response['picture']['data']['url'];
          fbLoggedIn = true;
        });
      }
    }
  };

  typeProto.onCreate = function() {};

  /////////////////////////////////////
  // Instance class
  pluginProto.Instance = function(type) {
    this.type = type;
    this.runtime = type.runtime;
  };

  var instanceProto = pluginProto.Instance.prototype;

  instanceProto.onCreate = function() {
    if (this.runtime.isDomFree) {
      cr.logexport("[Construct 2] Facebook plugin not supported on this platform - the object will not be created");
      return;
    }

    self = this;

  }

  //////////////////////////////////////
  // Conditions
  function Cnds() {};

  Cnds.prototype.OnLogIn = function() {
    return false;
  };

  Cnds.prototype.OnLogOut = function() {
    return false;
  };

  pluginProto.cnds = new Cnds();

  //////////////////////////////////////
  // Actions
  function Acts() {};

  Acts.prototype.logIn = function() {
    if (typeof window['facebookConnectPlugin'] == 'undefined') {
      return;
    } else {
      window['facebookConnectPlugin'].getLoginStatus(function onLoginStatus (status) {
        if(status['status'] != "connected"){
          window['facebookConnectPlugin'].login(["email", "public_profile"], function(result) {
            console.log(JSON.stringify(result));
            onFBLogin();
            self.runtime.trigger(cr.plugins_.fb4.prototype.cnds.OnLogIn, self);
          }, function(error) {
            console.log(JSON.stringify(error));
          })
	}
      })
    }
  }

  Acts.prototype.logOut = function() {
    if (typeof window['facebookConnectPlugin'] == 'undefined') {
      return;
    } else {
      window['facebookConnectPlugin'].logout(function(onSuccess) {
        self.runtime.trigger(cr.plugins_.fb4.prototype.cnds.OnLogOut, self);
      }, function(onFailed) {
        console.log(JSON.stringify(onFailed));
      })
    }
  }

  Acts.prototype.PromptWallPost = function() {

    if (typeof window['facebookConnectPlugin'] != 'undefined') {
      return;
    } else {
      window['facebookConnectPlugin'].showDialog({
        method: "share",
        href: ''
      }, function onShareSuccess(result) {
        console.log("Posted. ", result);
      });
    }

  }

  Acts.prototype.PublishLink = function(Message, URL, Name, Caption, Description, Picture) {

    if (typeof window['facebookConnectPlugin'] == 'undefined') {
      return;
    } else {
      window['facebookConnectPlugin'].showDialog({
        method: "share",
        picture: Picture,
        name: Name,
        message: Message,
        caption: Caption,
        description: Description,
        href: URL
      }, function(response) {
        console.log(response)
      }, function(response) {
        console.log(response)
      });
    }

  }

  pluginProto.acts = new Acts();

  //////////////////////////////////////
  // Expressions
  function Exps() {};
  Exps.prototype.FullName = function(ret) {
    ret.set_string(fbFullName);
  };

  Exps.prototype.FirstName = function(ret) {
    ret.set_string(fbFirstName);
  };

  Exps.prototype.LastName = function(ret) {
    ret.set_string(fbLastName);
  };
  Exps.prototype.profilePicture = function(ret) {
    ret.set_string(fbProfilePic);
  };
  pluginProto.exps = new Exps();

}());