// discover.js

async function getUserNumber(email_address) {
  // get the user chocolate number from API Gateway

  const api_url = 'https://bh3f6qh1w2.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=' + email_address;
  const api_response = await fetch(api_url);
  const api_data = await(api_response).json();
  console.log(api_data);
  
  console.log(api_data);
  var chocolate = api_data['body'];
  return chocolate;
}

async function returnUserNumber(email_address) {
  //Passes user email to getUserNumber()
  var chocolate_number = await getUserNumber(email_address);
  console.log(typeof chocolate_number);
        
  //get the user info from API Gate

  const api_url = 'https://rf79scj6x0.execute-api.us-east-1.amazonaws.com/prod/update-number?user_email=' + email_address + '&chocolate_number=' + chocolate_number; 
  const api_response = await fetch(api_url);
  const api_data = await(api_response).json();
  console.log(api_data);
}

function add() {
  var data = {
    UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return;
      }
      //console.log('session validity: ' + session.isValid());

      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        // user email address
        
        //console.log(hi);
        //console.log(result[2].getValue());
        
        //Passes user email to returnUserNumber()
        returnUserNumber(result[2].getValue());
        
        document.getElementById("text").innerHTML = "Added";
      });

    });
  } else {
    console.log("User not logged in")
    document.getElementById("text").innerHTML = "Sign in to view your profile.";
  }
}