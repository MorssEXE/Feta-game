<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "fetadb";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$nickname = $_POST['nickname'];

$sql = "INSERT INTO users (nickname) VALUES ('$nickname')";

if ($conn->query($sql) === TRUE) {
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Main</title>
    <link rel="stylesheet" href="mainstyles.css">
</head>
</head>

<body>
    <div id="container">
        <h1>Feta</h1>
        <form id="nicknameForm" method="post">
            <input type="text" name="nickname" placeholder="Enter your nickname" required><br>
            <a href="index.html"><button type="submit">Eat FETA!</button></a>
        </form>
        <a href="leaderboard.html"><button>LEADERBOARD</button></a>
    </div>
</body>

</html>