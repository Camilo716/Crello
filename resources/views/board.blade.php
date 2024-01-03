<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Board</title>
    <link rel="stylesheet" href="{{ asset('css/board.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" crossorigin="anonymous">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,500;1,900&family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,500;1,900&family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>
<body>
    <nav>
        <div class='boardsContainer' id='boardsContainer'>
            <!-- Boards will be dynamically added here -->
        </div>
    </nav>
    <div class='container'>
        <div class='listsContainer' id='listsContainer'>
            <!-- Lists and their cards will be dynamically added here -->
        </div>
        <div class='newListContainer'>
            <form action="POST" class="newListForm">
                @csrf
                <input type="text" required placeholder="Enter list title..." id="title"></input>
                <button id="addNewList" class="addNewList" type="button">Add list</button>
            </form>
        </div>
    </div>

    <script src='{{ asset('js/main.js') }}'></script>
</body>
</html>