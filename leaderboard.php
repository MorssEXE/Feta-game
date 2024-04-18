<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feta | Leaderboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .leaderboard-container {
            width: 80%;
            max-width: 600px;
            text-align: center;
        }

        h1 {
            margin-top: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(odd) {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #ffffff;
        }

        button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ccc;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #ffd900;
        }

        a {
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="leaderboard-container">
        <h1>LEADERBOARD</h1>
        <table>
            <tr>
                <th>Position</th>
                <th>Username</th>
                <th>Score</th>
            </tr>
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $database = "fetadb";

            $conn = new mysqli($servername, $username, $password, $database);

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
        <a href="index.php"><button>Back</button></a>
    </div>
</body>

</html>