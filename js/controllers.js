MCCalorieCounterApp.controller('DefaultCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$location','$timeout',
  function ($scope, $rootScope, $http, $routeParams, $location, $timeout) {
	  
	var active_section = "view_"+$location.path().replace(/\//g,"");
	active_section = active_section.replace($routeParams.day,"");
	document.body.removeClass(active_section);
	document.body.className = document.body.className.replace(/(view_\S+)/g, "");
	document.body.className = document.body.className.replace(/(day_\S+)/g, "");
	document.body.addClass(active_section);
	document.body.addClass("day_"+$routeParams.day);
	document.body.className = document.body.className.replace(/  /g, " ");
	$(".clearWeek").unbind();
	$(".clearWeek").click(function(e){
		console.log($scope.week.Mon.breakfast);
		var newWeek = resetWeek();
		for (var day in $scope.week){
			for (var prop in $scope.week[day]){
				$scope.week[day][prop] = newWeek[day][prop];	
			}
		}
		//$scope.week = JSON.parse(JSON.stringify(newWeek));
		updateTotals();
		$scope.$apply();
		window.location = ('#/count/'+$routeParams.day);
	});
	
	$(".clearDay").unbind();
	$(".clearDay").click(function(e){
		var newWeek = resetWeek();
		for (var prop in $scope.week[$routeParams.day]){
			$scope.week[$routeParams.day][prop] = newWeek[$routeParams.day][prop];	
		}
		updateTotals();
		$scope.$apply();
		window.location = ('#/count/'+$routeParams.day);
	});
	
	if (!window.localStorage.getItem("config")){
		$scope.config = {sex:"female"};
	}else{
		$scope.config = JSON.parse(window.localStorage.getItem("config"));
	}
	if (!window.localStorage.getItem("personal")){
		$scope.personal = {
			start:{weight:'', waist:''},
			end:{weight:'', waist:''}
		};
	}else{
		$scope.personal = JSON.parse(window.localStorage.getItem("personal"));
	}

	if (!window.localStorage.getItem("week")){
		$scope.week = resetWeek();
	}else{
		$scope.week = JSON.parse(window.localStorage.getItem("week"));
	}
	
	$scope.target = setTarget();
	$scope.today = $scope.week[$routeParams.day];
	
	
	$("header nav ul li").removeClass("active");
	$("header nav ul li."+$routeParams.day).addClass("active");
	$scope.weekly = {
		calories: 0,
		targetCalories: 0,
		activity: 0,
		targetActivity: 0
	};
	
	updateTotals();
	
	function updateTotals(){
		var totalCalories = 0;
		var totalActivity = 0;
		for (var prop in $scope.week){
			totalCalories += Number($scope.week[prop].breakfast) + Number($scope.week[prop].lunch) + Number($scope.week[prop].dinner) + Number($scope.week[prop].other);
			totalActivity += $scope.week[prop].activity;
		}
		
		$scope.weekly.calories = totalCalories;
		$scope.weekly.targetCalories = ($scope.target.breakfast + $scope.target.lunch + $scope.target.dinner + $scope.target.other)*7;
		$scope.weekly.activity = totalActivity;
		$scope.weekly.targetActivity = $scope.target.activity*7;
		
		window.localStorage.setItem("week", JSON.stringify($scope.week));
		window.localStorage.setItem("config", JSON.stringify($scope.config));
		window.localStorage.setItem("personal", JSON.stringify($scope.personal));
		setTarget();
		
	}
	$scope.updateTotals = updateTotals;
	$scope.updateTotals();
	function setTarget(){
		var target;
		if ($scope.config.sex == "male"){	
			target = {
				breakfast:380, 
				lunch:570, 
				dinner:570, 
				other:380,
				water:"5-8",
				fibre:18,
				activity:25
			};
		}else{
			target = {
				breakfast:280, 
				lunch:420, 
				dinner:420, 
				other:280,
				water:"5-8",
				fibre:18,
				activity:25
			};
		}
		return target;
	}
	function resetWeek(){
		return {
			Mon:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Tues:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Wed:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Thurs:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Fri:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Sat:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]},
			Sun:{breakfast:0, lunch:0, dinner:0, other:0, water:0, fibre:0, activity:0, fruitVeg:[false, false, false, false, false]}
		};	
	}
}]);
/*

$timeout(function(){
				socket.emit('AMEXmessage_scannedReceipt', {"receiptId":Math.floor(Math.random()*$scope.receipts.length),"udid":udid});
				var r = confirm("Scan another?");
				if (r == true) {
					scanBarcode();
				} else {
					claimPrize();
				}
				
			}, 500);
			
*/