function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("errorMessage");

    // Send a POST request to register.php
    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error registering user');
            }
            // Registration successful, clear the form
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            errorMessage.textContent = "Registration successful";
        })
        .catch(error => {
            console.error('Error registering user:', error);
            errorMessage.textContent = "Error registering user Or Already exists";
        });
}


function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("errorMessage");

    // Fetch user credentials from the external file
    fetch('login/users.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data into an array of credentials
            var credentialsArray = data.trim().split('\n');
            
            let index = 0;
            for ( index = 0; index < credentialsArray.length; index++) {
                var [storedUsername, storedPassword] = credentialsArray[index].split(':');
/*
                if(index != credentialsArray.length-1)
                {
                    storedPassword = storedPassword.substring(0,storedPassword.length - 1);
                }
                */
                var isValidCredentials=( username === storedUsername &&  password === storedPassword);
                if (isValidCredentials) 
                    break;
            }

            if(index != credentialsArray.length)
                window.location.href = "/main";
            else
                errorMessage.textContent = "Invalid username or password";

        })
        .catch(error => console.error('Error fetching user credentials:', error));
}

// Add event listener for any key press in username or password fields
document.getElementById("username").addEventListener("input", function () {
    var errorMessage = document.getElementById("errorMessage");

    // Clear the error message when any key is pressed in the username field
    errorMessage.textContent = "";
});

document.getElementById("password").addEventListener("input", function () {
    var errorMessage = document.getElementById("errorMessage");

    // Clear the error message when any key is pressed in the password field
    errorMessage.textContent = "";
});

// Add event listener for "Enter" key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        login();
    }
});
