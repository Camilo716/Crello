<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Board</title>
    <link rel="stylesheet" href="{{ asset('css/board.css') }}">
</head>
<body>
    <h1>Board</h1>
    <h2>Prueba</h2>
    <div class='container'>
        <div class='lists-container'>
            <!-- Lists will be dynamically added here -->
        </div>
        <div class='new-list'>

        </div>
    </div>

    <script src='{{ asset('js/board.js') }}'></script>
</body>
</html>