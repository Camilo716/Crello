<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Board</title>
    <link rel="stylesheet" href="{{ asset('css/board.css') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,500;1,900&family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,500;1,900&family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>
<body>
    <nav>
        <ul class="boards">
            <li><h1>Your Board</h1></li>
        </ul>
    </nav>
    <div class='container'>
        <div class='listsContainer' id='listsContainer'>
            <!-- Lists will be dynamically added here -->
        </div>
        <div class='new-list'>
            <form action="POST">
                <input type="text" placeholder="Enter list title..."></input>
                <button id="addNewList" type="button">Add another list</button>
            </form>
        </div>
    </div>

    <script src='{{ asset('js/board.js') }}'></script>
</body>
</html>