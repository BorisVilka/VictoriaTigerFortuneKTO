var integration = {}

integration.showBanner = function (){
    if(!integration.isads){
        try{
            Android.showAndroidBanner()
        }catch(e){
            console.log(e)
        }
    }else{
        console.log("App is Pro")
    }
}

integration.hideBanner = function (){
	try{
		Android.hideAndroidBanner()
	}catch(e){
		console.log(e)
	}
}

integration.showInterstitial = function (){
    if(!integration.isads){
        try{
            Android.showAd()
        }catch(e){
            console.log(e)
        }
    }else{
        console.log("App is Pro")
    }
}

integration.showRewardedAd = function(){
    if(!integration.isads){
        try{
            Android.showRewardedAd()
        }catch(e){
            console.log(e)
        }
    }else{
        console.log("App is Pro")
    }
}

integration.rewarded = function(){
    document.getElementById("currentrewards").innerHTML = "Got ad Reward!"
}

integration.landscape = function (){
	try{
		Android.landscape()
	}catch(e){
		console.log(e)
	}
}

integration.portrait = function (){
	try{
		Android.portrait()
	}catch(e){
		console.log(e)
	}
}

integration.alert = function(txt){
    try{
        Android.showAlert(txt)
    }catch(e){
        console.log(e)
    }
}

integration.rateThisApp = function(){
    try{
        Android.rateThisApp()
    }catch(e){
        console.log(e)
    }
}

integration.shareText = function(txt, title){
    try{
        Android.shareText(txt, title)
    }catch(e){
        console.log(e)
    }
}

integration.shareThisApp = function(txt, title){
    try{
        Android.shareThisApp(txt, title)
    }catch(e){
        console.log(e)
    }
}

integration.removeAds = function(){
    try{
        Android.removeAds()
    }catch(e){
        console.log(e)
    }
}

integration.isads = false
integration.itsads = function(n){
    if(n == 1){
        integration.hideBanner()
        integration.isads = true
    }else{
        integration.isads = false
    }
}