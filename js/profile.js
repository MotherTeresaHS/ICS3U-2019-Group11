// profile.js

async function getUser(email_address) {
  // get the user info from API Gate

  const api_url = 'https://gonvpjbyuf.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=jane.smith@gmail.com';
  const api_response = await fetch(api_url);
  const api_data = await(api_response).json();
  console.log(api_data);

  const div_user_info = document.getElementById('profile');
  div_user_info.innerHTML = api_data['body'];
}

function getUserAttributes() {
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
        console.log(result[2].getValue());
        console.log(result);
        //getUser(result[2].getValue())
        document.getElementById("profile").innerHTML = "You are logged in as: " + result[2].getValue();
        document.getElementById("sign-out").innerHTML = "Sign out";
      });

    });
  } else {
    console.log("User not logged in")
    document.getElementById("profile").innerHTML = "Sign in to view your profile.";
  }
}