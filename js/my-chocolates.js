// my-chocolates.js

async function getNumber(email_address) {
  // get the user chocolate number from API Gateway

  const api_url = 'https://bh3f6qh1w2.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=' + email_address;
  const api_response = await fetch(api_url);
  const api_data = await(api_response).json();
  console.log(api_data);

  const div_user_info = document.getElementById('number');
  div_user_info.innerHTML = api_data['body'];
}

function getChocolateNumber() {
  // Checks if the user is logged in. If yeah, then getNumber() runs
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
        console.log(result);
        //console.log(result[2].getValue());
        getNumber(result[2].getValue());
        
        //document.getElementById("text").innerHTML = "The chocolate number is:" + result[2].getValue();
      });

    });
  } else {
    console.log("User not logged in")
    document.getElementById("text").innerHTML = "Sign in to view your profile.";
  }
}