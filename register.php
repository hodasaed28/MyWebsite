<?php

// Retrieve data from the POST request
$username = $_POST['username'];
$password = $_POST['password'];

// Path to the users.txt file
$filePath = './login/users.txt';

// Check if the user already exists
if (userExists($filePath, $username)) {
    http_response_code(400); // Bad Request
    echo 'Username already exists';
} else {
    // Append the new user and password to the file
    appendUser($filePath, $username, $password);
    echo 'Registration successful';
}

// Function to check if a user already exists
function userExists($filePath, $newUsername) {
    $users = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($users as $existingUser) {
        list($existingUsername, $existingPassword) = explode(':', $existingUser);
        if ($existingUsername === $newUsername) {
            return true; // User already exists
        }
    }
    return false; // User does not exist
}

// Function to append a new user to the file
function appendUser($filePath, $newUsername, $newPassword) {
    $file = fopen($filePath, 'a');
    if ($file) {
        $data = "\n$newUsername:$newPassword";
        fwrite($file, $data);
        fclose($file);
    } else {
        http_response_code(500); // Internal Server Error
        echo 'Error appending new user to file';
    }
}

?>
