// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.AdmobPlus = function(runtime) {
  this.runtime = runtime;
};

(function() {

  /////////////////////////////////////
  // *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
  //                            vvvvvvvv
  var pluginProto = cr.plugins_.AdmobPlus.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function(plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  var admobid = {
    banner: "",
    interstitial: "",
    rewardvideo: ""
  };
  var testMode = true;
  var self;

  // called on startup for each object type
  typeProto.onCreate = function() {};

  /////////////////////////////////////
  // Instance class
  pluginProto.Instance = function(type) {
    this.type = type;
    this.runtime = type.runtime;

    // any other properties you need, e.g...
    // this.myValue = 0;
  };
  var instanceProto = pluginProto.Instance.prototype;

  // called whenever an instance is created
  instanceProto.onCreate = function() {
    // note the object is sealed after this call; ensure any properties you'll ever need are set on the object
    // e.g...
    // this.myValue = 0;

    self = this;

    admobid = {
      banner: this.properties[0],
      interstitial: this.properties[1],
      rewardvideo: this.properties[2]
    };


    document.addEventListener('admob.banner.load', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onBannerAdLoad, self);
    });
    document.addEventListener('admob.banner.load_fail', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onBannerAdLoadFail, self);
    });
    document.addEventListener('admob.banner.open', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onBannerAdOpen, self);
    });
    document.addEventListener('admob.banner.exit_app', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onBannerAdExitApp, self);
    });
    document.addEventListener('admob.banner.close', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onBannerAdClose, self);
    });

    document.addEventListener('admob.interstitial.load', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onInterstitialAdLoad, self);
    });
    document.addEventListener('admob.interstitial.load_fail', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onInterstitialAdLoadFail, self);
    });
    document.addEventListener('admob.interstitial.open', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onInterstitialAdOpen, self);
    });
    document.addEventListener('admob.interstitial.exit_app', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onInterstitialAdExitApp, self);
    });
    document.addEventListener('admob.interstitial.close', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onInterstitialAdClose, self);
    });

    document.addEventListener('admob.reward_video.load', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdLoad, self);
    });
    document.addEventListener('admob.reward_video.load_fail', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdLoadFail, self);
    });
    document.addEventListener('admob.reward_video.open', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdOpen, self);
    });
    document.addEventListener('admob.reward_video.close', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdClose, self);
    });
    document.addEventListener('admob.reward_video.start', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdStart, self);
    });
    document.addEventListener('admob.reward_video.complete', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdComplete, self);
    });
    document.addEventListener('admob.reward_video.reward', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdReward, self);
    });
    document.addEventListener('admob.reward_video.exit_app', () => {
      self.runtime.trigger(cr.plugins_.AdmobPlus.prototype.cnds.onRewardVideoAdExitApp, self);
    });
  };

  function indexToPos(index) {

    switch (index) {
      case 0:
        return "CENTER";
      case 1:
        return "BOTTOM";
      case 2:
        return "TOP";
    }

  };
  //////////////////////////////////////
  // Conditions
  function Cnds() {};

  // Banners

  Cnds.prototype.onBannerAdLoad = function() {
    return true;
  };
  Cnds.prototype.onBannerAdLoadFail = function() {
    return true;
  };
  Cnds.prototype.onBannerAdOpen = function() {
    return true;
  };
  Cnds.prototype.onBannerAdExitApp = function() {
    return true;
  };
  Cnds.prototype.onBannerAdClose = function() {
    return true;
  };

  // Interstitials

  Cnds.prototype.onInterstitialAdLoad = function() {
    return true;
  };
  Cnds.prototype.onInterstitialAdLoadFail = function() {
    return true;
  };
  Cnds.prototype.onInterstitialAdOpen = function() {
    return true;
  };
  Cnds.prototype.onInterstitialAdClose = function() {
    return true;
  };
  Cnds.prototype.onInterstitialAdExitApp = function() {
    return true;
  };

  // Rewards

  Cnds.prototype.onRewardVideoAdLoad = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdLoadFail = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdOpen = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdClose = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdStart = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdComplete = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdReward = function() {
    return true;
  };
  Cnds.prototype.onRewardVideoAdExitApp = function() {
    return true;
  };

  pluginProto.cnds = new Cnds();

  //////////////////////////////////////
  // Actions
  function Acts() {};

  //Banners

  Acts.prototype.ShowLoadBanner = function(pos) {
    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].banner.show({
        id: {
          android: admobid.banner
        },
        position: indexToPos(pos)
      })
    }
  }

  Acts.prototype.hideBanner = function() {
    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].banner.hide({
        android: admobid.banner
      })
    }
  }
  // Interstitial
  Acts.prototype.LoadShowInterstitial = function() {

    if (typeof window['admob'] != 'undefined') {
      return;
    } else {
      window['admob'].interstitial.load({
        id: {
          android: admobid.interstitial
        }
      }).then(() => window['admob'].interstitial.show());
    }

  }

  Acts.prototype.LoadInterstitial = function() {

    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].interstitial.load({
        id: {
          android: admobid.interstitial
        }
      });
    };
  }

  Acts.prototype.ShowInterstitial = function() {

    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].interstitial.show();
    };
  }
  //Reward videos

  Acts.prototype.showLoadReward = function() {
    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].rewardVideo.load({
        id: {
          android: admobid.rewardvideo
        }
      }).then(() => window['admob'].rewardVideo.show());
    }
  }

  Acts.prototype.showReward = function() {
    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].rewardVideo.show();
    }
  }

  Acts.prototype.loadReward = function() {
    if (typeof window['admob'] == 'undefined') {
      return;
    } else {
      window['admob'].rewardVideo.load({
        id: {
          android: admobid.rewardvideo
        }
      });
    }
  }
  pluginProto.acts = new Acts();

  //////////////////////////////////////
  // Expressions
  function Exps() {};
  pluginProto.exps = new Exps();

}());