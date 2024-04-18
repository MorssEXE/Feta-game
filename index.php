<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['nickname'])) {
    $nickname = $_POST['nickname'];
    $_SESSION['nickname'] = $nickname; // pouzivame session, protoze to bylo jedine co jsem nasel a fungovalo
    header("Location: game.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Main</title>
    <link rel="stylesheet" href="mainscreen.css">
</head>

<body>
    <div id="container">
        <h1>Feta</h1>
        <form id="nicknameForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <input type="text" name="nickname" placeholder="Enter your nickname" required><br>
            <button type="submit">Play!</button>
        </form>
        <a href="leaderboard.php"><button>LEADERBOARD</button></a>
    </div>
</body>

</html>