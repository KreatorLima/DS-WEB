<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página principal</title>
    <link rel="stylesheet" href="style.css">

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #4a3131;
            padding: 40px;
            text-align: center;
        }

        h1 {
            color: #ffffff;
            text-align: center;
        }

        a {
            color: #ffffff9c;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
        }

        a:hover {
            text-decoration: underline;
        }

        h1:hover{
            color: #cf6565;
        }
    </style>
</head>
<body>

    <?php
        echo "<h1>Pagina principal do meu servidor</h1>";
    ?>

    <a href="/POO/">Aula de POO</a><br>

</body>
</html>
