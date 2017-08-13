var friendData = require('../data/friends.js');


module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	})


	app.post('/api/friends', function(req, res){
		var newFriend = req.body;

		for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 Strongly Disagree") {
				newFriend.scores[i] = 1;
			} else if(newFriend.scores[i] == "5 Strongly Agree") {
				newFriend.scores[i] = 5;
			} else {
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendData.length; i++) {

			var comparedFriend = friendData[i];
			var totalDifference = 0;
			
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var bestFriendNum = differencesArray[0];
		var bestFriendIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendNum) {
				bestFriendNum = differencesArray[i];
				bestFriendIndex = i;
			}
		}

		friendData.push(newFriend);

		res.json(friendData[bestFriendIndex]);
	})
}


// var friendData = require("../data/friends.js");
// var path = require("path");


// // var totalDifference = 0;

// module.exports = function(app){
// 	app.get('/api/friends', function(req, res){
// 		res.json(friendData);
// 	});

// //API POST Request-handles when user submits a form & thus submits data to the server.
// // In each of the below cases, when a user submits form data (a JSON object)
// // ...the JSON is pushed to the appropriate Javascript array


// 	app.post('/api/friends', function(req, res){

// 		var newFriend = req.body;

// 		for (var i = 0; i < newFriend.scores.length; i ++){
// 			if(newFriend.scores[i] == "1 Strongly Disagree") {
// 				newFriend.scores[i] = 1;
// 			} else if(newFriend.scores[i] == "5 Strongly Agree") {
// 				newFriend.scores[i] = 5;
// 			} else {
// 				newFriend.scores[i] = parseInt(newFriend.scores[i]);
// 			}
// 		}

// 		var differences = []

// 		for (var i = 0; friendData.length; i++){
// 			var comparedFriend = friendData[i];
// 			var totalDifference = 0;

// 			for(var k = 0; k < comparedFriend.scores.length; k++){
// 				var differenceScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
// 				totalDifference += differenceScore;
// 			}	
// 			differences[i] = totalDifference
// 		}

// 		var bf = differences[0];
// 		var bfIndex = 0;

// 		for(var i = 1; i < differences.length; i++){
// 			if(differences[i] < bf){
// 				bf = differences[i];
// 				bfIndex = i;
// 			}
// 		}
// 		friendData.push(newFriend);

// 		res.json(friendData[bfIndex]);

// 	});
// }

// 		var greatMatch = {
// 			name: "",
// 			image: "",
// 			matchDifference: 1000
// 		};
// 		var usrData 	= req.body;
// 		var usrName 	= usrData.name;
// 		var usrImage 	= usrData.image;
// 		var usrScores 	= usrData.scores;

// 		var totalDifference = 0;

// 		//loop through the friends data array of objects to get each friends scores
// 		for(var i = 0; i < [friends].length-1; i++){
// 			console.log(friends[i].name);
// 			totalDifference = 0;

// 			//loop through that friends score and the users score and calculate the 
// 			// absolute difference between the two and push that to the total difference variable set above
// 			for(var j = 0; j < 10; j++){
// 				// We calculate the difference between the scores and sum them into the totalDifference
// 				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
// 				// If the sum of differences is less then the differences of the current "best match"
// 				if (totalDifference <= greatMatch.friendDifference){

// 					// Reset the bestMatch to be the new friend. 
// 					greatMatch.name = friends[i].name;
// 					greatMatch.photo = friends[i].photo;
// 					greatMatch.matchDifference = totalDifference;
// 				}
// 			}
// 		}

// 		friends.push(usrData);
 
// 		res.json(greatMatch);
// 	});
// };
