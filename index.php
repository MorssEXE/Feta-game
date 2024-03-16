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
$highScore = $_POST['highScore'];

$sql = "INSERT INTO users (nickname,highScore) VALUES ('$nickname','$highScore')";

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
            <a href="index.html"><button type="submit">Submit!</button></a>
        </form>
        <a href="game.html"><button>Eat FETA</button></a>
        <a href="leaderboard.php"><button>LEADERBOARD</button></a>
    </div>
</body>

</html>