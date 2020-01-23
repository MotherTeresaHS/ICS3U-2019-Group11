// sign-out.js

function signOut() {
  // sign-out function
  
  const data = {
    UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
  };
    
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());

        // sign out
        cognitoUser.signOut();
        console.log("Signed-out");
        document.getElementById("signout").innerHTML = "Successfully signed-out";
        
        // automatically redirect to home.html after logging out
        window.location.replace("./index.html");
    });
  } else {
    console.log("Already signed-out")
    document.getElementById("signout").innerHTML = "Already signed-out";
  
  }
}