<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "fetadb";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Leaderboard</title>
</head>
<body>
    <table>
        <h1>LEADERBOARD</h1>
        <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Score</th>
        </tr>
        <?php
         if ($conn->connect_error) { 
            die("Connection failed: " . $conn->connect_error); 
        } 
         
        $sql = "SELECT nickname, highScore FROM users ORDER BY highScore DESC LIMIT 10"; 
        $result = $conn->query($sql); 
         
        $position = 1; 
        if ($result->num_rows > 0) { 
            while ($row = $result->fetch_assoc()) { 
                echo "<tr><td>$position</td><td>" . htmlspecialchars($row["nickname"]) . "</td><td>" . htmlspecialchars($row["highScore"]) . "</td></tr>"; 
                $position++; 
            } 
        } else { 
            echo "<tr><td colspan='3'>No data available</td></tr>"; 
        } 
         
        $conn->close(); 
        ?>
    </table>
    <a href="index.php"><button>back</button></a>
</body>
</html>