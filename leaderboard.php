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
            <th></th>
            <th>Username</th>
            <th>Score</th>
        </tr>
        <?php
            $conn = mysqli_connect("localhost", "root", "", "fetadb");

            $sql = "SELECT nickname, score from users";
            $result = $conn-> query($sql);

            if ($result-> num_rows > 0) {
                while ($row = $result-> fetch_assoc()) {
                    echo "<tr><td>". $row["nickname"] ."</td><td>". $row["score"] ."</td></tr>"; 
                }
                echo "</table>";
            }
            else {
                echo "0 result";
            }

            $conn-> close();
        ?>
      <a href="index.php"><button>back</button></a>
    </table>
</body>
</html>