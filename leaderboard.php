<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Leaderboard</title>
    <style type ="text/css">
        table{
            border-collapse: collapse;
            width: 100%;
            font-size: 25px;
            text-align: left;
        }    
    </style>
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
            $conn = mysqli_connect("localhost", "root", "", "fetadb");

            $sql = "SELECT nickname, score from users";
            $result = $conn-> query($sql);

                while ($row = $result-> fetch_assoc()) {
                    echo "<tr><td>"."position" ."</td><td>". $row["nickname"] ."</td><td>". $row["score"] ."</td></tr>"; 
                }
            $conn-> close();
        ?>
    </table>
    <a href="index.php"><button>back</button></a>
</body>
</html>