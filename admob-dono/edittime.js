function GetPluginSettings() {
  return {
    "name": "AdmobPlus", // as appears in 'insert object' dialog, can be changed as long as "id" stays the same
    "id": "AdmobPlus", // this is used to identify this plugin and is saved to the project; never change it
    "version": "1.2", // (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
    "description": "Show adds calling Cordova-admob-plus by Donovan",
    "author": "Donovan",
    "help url": "http://getHelp.com",
    "category": "Plugins by Donovan", // Prefer to re-use existing categories, but you can set anything here
    "type": "object", // either "world" (appears in layout and is drawn), else "object"
    "rotatable": false, // only used when "type" is "world".  Enables an angle property on the object.
    "flags": pf_singleglobal
  };
};

// Banners

AddCondition(0, cf_none, "On banner ad loaded", "Banners", "On banner ad loaded",
  "Triggered when a banner ad is loaded.", "onBannerAdLoad");

AddCondition(1, cf_none, "On banner ad Failed to load", "Banners", "On banner ad load failed",
  "Triggered when a banner ad is failed to load.", "onBannerAdLoadFail");

AddCondition(2, cf_none, "On banner ad open", "Banners", "On banner ad open",
  "Triggered when a banner ad is opened.", "onBannerAdOpen");

AddCondition(3, cf_none, "On banner ad exit app", "Banners", "On banner ad exit app",
  "Triggered when a user exit the app when a banner ad is showed.", "onBannerAdExitApp");

AddCondition(4, cf_none, "On banner ad close", "Banners", "On banner ad closed",
  "Triggered when a banner ad is closed.", "onBannerAdClose");

// Interstitials

AddCondition(5, cf_none, "On interstitial ad is load", "Interstitials", "On interstitial ad loaded",
  "Triggered when a interstitial ad is loaded.", "onInterstitialAdLoad");

AddCondition(6, cf_none, "On interstitial ad Failed to load", "Interstitials", "On interstitial ad load failed",
  "Triggered when a interstitial ad is failed to load.", "onInterstitialAdLoadFail");

AddCondition(7, cf_none, "On interstitial ad is opened", "Interstitials", "On interstitial ad opened",
  "Triggered when an interstitial ad is open.", "onInterstitialAdOpen");

AddCondition(8, cf_none, "On interstitial ad is closed", "Interstitials", "On interstitial ad closed",
  "Triggered when an interstitial ad is closed.", "onInterstitialAdClose");

AddCondition(9, cf_none, "On interstitial ad exit app", "Banners", "On interstitial ad exit app",
  "Triggered when a user exit the app when a interstitial ad is showed.", "onInterstitialAdExitApp");

// Rewards

AddCondition(10, cf_none, "On rewardvideo ad is load", "RewardVideo", "On reward video ad loaded",
  "Triggered when a reward video ad is loaded.", "onRewardVideoAdLoad");

AddCondition(11, cf_none, "On reward video ad Failed to load", "RewardVideo", "On reward video ad load failed",
  "Triggered when a reward video ad is failed to load.", "onRewardVideoAdLoadFail");

AddCondition(12, cf_none, "On reward video ad is opened", "RewardVideo", "On reward video ad opened",
  "Triggered when an reward video ad is open.", "onRewardVideoAdOpen");

AddCondition(13, cf_none, "On reward video ad is closed", "RewardVideo", "On reward video ad closed",
  "Triggered when an reward video ad is closed.", "onRewardVideoAdClose");

AddCondition(14, cf_none, "On reward video ad is start", "RewardVideo", "On reward video ad started",
  "Triggered when an reward video ad is started.", "onRewardVideoAdStart");

AddCondition(15, cf_none, "On reward video ad is complete", "RewardVideo", "On reward video ad completed",
  "Triggered when an reward video ad is completed.", "onRewardVideoAdComplete");

AddCondition(16, cf_none, "On reward video ad is rewarded", "RewardVideo", "On reward video ad rewarded",
  "Triggered when an reward video ad is rewarded.", "onRewardVideoAdReward");

AddCondition(17, cf_none, "On reward video ad exit app", "RewardVideo", "On reward video ad exit app",
  "Triggered when a user exit the app when a reward video ad is showed.", "onRewardVideoAdExitApp");
//Banner
// Load and show

AddComboParamOption("CENTER");
AddComboParamOption("BOTTOM");
AddComboParamOption("TOP");
AddComboParam("Position", "Choose where the banner ad will appear.");
AddAction(0, cf_none, "Load and show banner", "Ads-Banner", "Load and show a banner ad", "Start loading a banner ad, and autoshow when ready.", "ShowLoadBanner");
AddAction(1, 0, "Hide banner ad", "Ads-Banner", "Hide banner ad", "Hide any currently showing banner ad.", "hideBanner");

AddAction(2, 0, "Load and show interstitial", "Ads-Interstitial", "Show interstitial", "Show a pre-loaded fullscreen ad once it's ready.", "LoadShowInterstitial");
AddAction(3, 0, "Load interstitial", "Ads-Interstitial", "Load interstitial", "Will only load the ads in background but not display it.", "LoadInterstitial");
AddAction(4, 0, "Show interstitial", "Ads-Interstitial", "Show interstitial", "Will only Show the ads in fullscreen if ads loaded.", "ShowInterstitial");

AddAction(5, 0, "Load and show Rewardvideo ad", "Ads-Rewardvideo", "Load and show Rewardvideo ad when ready", "Load a Rewardvideo ad.", "showLoadReward");
AddAction(6, 0, "show Rewardvideo ad", "Ads-Rewardvideo", "show Rewardvideo ad when loaded", "Show a Rewardvideo ad.", "showReward");
AddAction(7, 0, "Load Rewardvideo ad", "Ads-Rewardvideo", "Load Rewardvideo ad but not display", "Load a Rewardvideo ad.", "loadReward");

ACESDone();

// Property grid properties for this plugin
var property_list = [
  new cr.Property(ept_text, "Banner ID", "", "Ad unit ID from admob.com for the banner ad."),
  new cr.Property(ept_text, "Interstitial ID", "", "Ad unit ID from admob.com for the fullscreen ad."),
  new cr.Property(ept_text, "RewardVideo ID", "", "Ad unit ID from admob.com for the RewardVideo ad.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
  return new IDEObjectType();
};

// Class representing an object type in the IDE
function IDEObjectType() {
  assert2(this instanceof arguments.callee, "Constructor called as a function");
};

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance) {
  return new IDEInstance(instance);
};

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

  // Plugin-specific variables
  this.just_inserted = false;
};

IDEInstance.prototype.OnCreate = function() {};

IDEInstance.prototype.OnInserted = function() {};

IDEInstance.prototype.OnDoubleClicked = function() {};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name) {};

IDEInstance.prototype.OnRendererInit = function(renderer) {};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer) {};

IDEInstance.prototype.OnRendererReleased = function(renderer) {};