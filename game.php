<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['nickname'])) {
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

    $checkQuery = "SELECT highScore FROM users WHERE nickname = '$nickname'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        $row = $checkResult->fetch_assoc();
        $existingHighScore = $row["highScore"];

        if ($highScore > $existingHighScore) {
            $updateQuery = "UPDATE users SET highScore = $highScore WHERE nickname = '$nickname'";
            if ($conn->query($updateQuery) === TRUE) {
                echo "Record updated successfully";
            } else {
                echo "Error updating record: " . $conn->error;
            }
        } else {
            echo "Score not higher than existing score, not updated";
        }
    } else {
        $insertQuery = "INSERT INTO users (nickname, highScore) VALUES ('$nickname', '$highScore')";
        if ($conn->query($insertQuery) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }

    $conn->close();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Game</title>
    <link rel="icon" href="src/feta.png" type="image/png">
    <link rel="stylesheet" href="styles.css" type="text/css">
</head>

<body>
    <div class="name" data-name><?php echo isset($_SESSION['nickname']) ? $_SESSION['nickname'] : "Name" ?></div>
    <div class="world" data-world>
        <div class="score" data-score>0</div>
        <div class="start-screen" data-start-screen>Press LMB to start</div>
        <img src="src/ground.png" class="ground" data-ground>
        <img src="src/ground.png" class="ground" data-ground>
        <img src="src/mis-idle.png" class="mis" data-mis>
    </div>
    <script src="script.js" type="module"></script>
</body>

</html>