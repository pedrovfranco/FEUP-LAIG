:- consult('utilities.pl'), use_module(library(lists)).

initialBoard(	[[[], [], [], []],
				[[], [20,'w'], [20,'b'], []],
				[[], [], [], []]]).

% Returns if a point (X,Y) is withing the board
isWithinBounds(Board, X, Y) :-
	getBoardSize(Board, Width, Height),
	X >= 0, X < Width, Y >= 0, Y < Height.

% Returns the dimensions of the board
getBoardSize([H|T], X, Y):-
	length(H, X),
	length([H|T], Y).

% Executes a move on the board by subtracting the Height with N in the original piece and replacing the empty space with the new stack
move([], Board, _, Board).
move(Move, Board, N, X):-

	nth0(0, Move, Piece1),
	nth0(0, Piece1, X1),
	nth0(1, Piece1, Y1),
	nth0(1, Move, Piece2),
	nth0(0, Piece2, X2),
	nth0(1, Piece2, Y2),

	move(Board, X1, Y1, X2, Y2, N, X).

move(Board, X1, Y1, X2, Y2, N2, X):-
	isWithinBounds(Board, X1, Y1),
	isWithinBounds(Board, X2, Y2),
	
	getPiece(Board, X1, Y1, Piece),
	length(Piece, 2),
	getPiece(Board, X2, Y2, Piece2),
	length(Piece2, 0),

	nth0(0, Piece, N1),
	nth0(1, Piece, Colour),
	N is N1-N2,

	N > 0, N2 > 0,

	replaceByCoords(Board, X1, Y1, [N, Colour], List1),
	replaceByCoords(List1, X2, Y2, [N2, Colour], List2),

	increaseBoard(List2, X),!.


increaseBoard(Board, NewBoard):-
	getBoardSize(Board, W, H),
	increaseBoardY(Board, 0, W, H, NewBoard).

increaseBoardY(Board, H, _, H, Board).
increaseBoardY(Board, Y, W, H, NewBoard):-
	increaseBoardX(Board, 0, Y, W, H, Board2),

	Y1 is Y+1,
	increaseBoardY(Board2, Y1, W, H, NewBoard).

increaseBoardX(Board, W, _, W, _, Board).
increaseBoardX(Board, X, Y, W, H, NewBoard):-
	increaseBoard2(Board, X, Y, Board2),

	X1 is X+1,
	increaseBoardX(Board2, X1, Y, W, H, NewBoard).

increaseBoard2(Board, X, Y, NewBoard):-
	
	getPiece(Board, X, Y, Piece),
	getColour(Piece, Colour),

	X1 is X+1, Y1 is Y-2, %% Up-right
	X2 is X+2, Y2 is Y-1, %% Right-up
	X3 is X+2, Y3 is Y+1, %% Right-down
	X4 is X+1, Y4 is Y+2, %% Down-right
	X5 is X-1, Y5 is Y+2, %% Down-left
	X6 is X-2, Y6 is Y+1, %% Left-down
	X7 is X-2, Y7 is Y-1, %% Left-up
	X8 is X-1, Y8 is Y-2, %% Up-left
	
	increaseBoardAux(Board, X1, Y1, Colour, List1),
	increaseBoardAux(List1, X2, Y2, Colour, List2),
	increaseBoardAux(List2, X3, Y3, Colour, List3),
	increaseBoardAux(List3, X4, Y4, Colour, List4),
	increaseBoardAux(List4, X5, Y5, Colour, List5),
	increaseBoardAux(List5, X6, Y6, Colour, List6),
	increaseBoardAux(List6, X7, Y7, Colour, List7),
	increaseBoardAux(List7, X8, Y8, Colour, NewBoard).


increaseBoardAux(Board, X, Y, Colour, NewBoard):-
	checkAdjacent2(Board, X, Y, Colour),

	getBoardSize(Board, Width, Height),

	X1 is 0-X, X2 is X-Width+1, Y1 is 0-Y, Y2 is Y-Height+1,

	increaseBoardAux2(Board, X1, 0, List1),
	increaseBoardAux2(List1, X2, 1, List2),
	increaseBoardAux2(List2, Y1, 2, List3),
	increaseBoardAux2(List3, Y2, 3, NewBoard).

increaseBoardAux(Board, _, _, _, Board).

checkAdjacent2(Board, X, Y, Colour):-
	
	(getPiece(Board, X, Y, Piece),
	length(Piece, 0));
	(

	X1 is X, Y1 is Y-1, %% Up
	X2 is X+1, Y2 is Y-1, %% Up-right
	X3 is X+1, Y3 is Y, %% Right
	X4 is X+1, Y4 is Y+1, %% Down-right
	X5 is X, Y5 is Y+1, %% Down
	X6 is X-1, Y6 is Y+1, %% Down-left
	X7 is X-1, Y7 is Y, %% Left
	X8 is X-1, Y8 is Y-1, %% Up-left

	(checkPieceColour(Board, X1, Y1, Colour);
	checkPieceColour(Board, X2, Y2, Colour);
	checkPieceColour(Board, X3, Y3, Colour);
	checkPieceColour(Board, X4, Y4, Colour);
	checkPieceColour(Board, X5, Y5, Colour);
	checkPieceColour(Board, X6, Y6, Colour);
	checkPieceColour(Board, X7, Y7, Colour);
	checkPieceColour(Board, X8, Y8, Colour))).

	
increaseBoardAux2(Board, X, _, NewBoard):-
	X =< 0,
	NewBoard = Board.

increaseBoardAux2(Board, X, 0, NewBoard):-
	X > 0,
	addLineLeft(Board, Foobar),

	X1 is X-1,
	increaseBoardAux2(Foobar, X1, 0, NewBoard).


increaseBoardAux2(Board, X, 1, NewBoard):-
	X > 0,
	addLineRight(Board, Foobar),

	X1 is X-1,
	increaseBoardAux2(Foobar, X1, 1, NewBoard).

increaseBoardAux2(Board, X, 2, NewBoard):-
	X > 0,
	addLineTop(Board, Foobar),

	X1 is X-1,
	increaseBoardAux2(Foobar, X1, 2, NewBoard).

increaseBoardAux2(Board, X, 3, NewBoard):-
	X > 0,
	addLineBottom(Board, Foobar),

	X1 is X-1,
	increaseBoardAux2(Foobar, X1, 3, NewBoard).	

% Returns the piece at the (X,Y) position
getPiece([H|T], X, Y, Piece) :-
	nth0(Y, [H|T], Line),
	nth0(X, Line, Piece).


% Returns the Height of a piece
getHeight(_, Height, 0) :- Height = 0.
getHeight(Piece, Height, 2) :- nth0(0, Piece, Height).
getHeight(Piece, Height):-
	length(Piece, L),
	getHeight(Piece, Height, L).

% Returns the Colour of a piece
getColour(_, Colour, 0):- Colour = ''.
getColour(Piece, Colour, 2):- nth0(1, Piece, Colour).
getColour(Piece, Colour):-
	length(Piece, L),
	getColour(Piece, Colour, L).





% Gets the list of moves in [[[X1,Y1],[X2,Y2]]] form
valid_moves(Board, Colour, Moves):-
	EmptyList = [],
	getPieces(Board, Colour, Pieces),
	valid_moves(Board, Pieces, EmptyList, Moves), !.

valid_moves(_, [], OutList, OutList).
valid_moves(Board, [H|T], InList, OutList):-
	nth0(0, H, X),
	nth0(1, H, Y),
	getPieceMoves(Board, X, Y, Moves),
	valid_moves2(X, Y, Moves, InList, Foobar),
	valid_moves(Board, T, Foobar, OutList).

valid_moves2(_, _, [], OutList, OutList).
valid_moves2(X1, Y1, [H|T], InList, OutList):-
	nth0(0, H, X2),
	nth0(1, H, Y2),
	append(InList, [[[X1,Y1],[X2,Y2]]], Foobar),
	valid_moves2(X1, Y1, T, Foobar, OutList).

% Returns a list of the pieces that belong to a speific Player
getPieces(Board, Colour, Pieces):-
	EmptyPieces = [],
	getPiecesBoard(Board, Colour, 0, EmptyPieces, Pieces).

getPiecesBoard([], _, _, Pieces, Pieces).
getPiecesBoard([H|T], Colour, Y, EmptyPieces, Pieces):-
	getPiecesLine(H, Colour, 0, Y, EmptyPieces, NewPieces),
	Y1 is Y+1,
	getPiecesBoard(T, Colour, Y1, NewPieces, Pieces).

getPiecesLine([], _, _, _, Pieces, Pieces).
getPiecesLine([H|T], Colour, X, Y, Pieces, NewPieces):-
	getColour(H, PieceColour),
	getPiecesLine([H|T], Colour, PieceColour, X, Y, Pieces, Foobar),

	X1 is X+1,
	getPiecesLine(T, Colour, X1, Y, Foobar, NewPieces).

getPiecesLine(_, Colour, PieceColour, X, Y, Pieces, NewPieces):-
	Colour = PieceColour,
	append(Pieces, [[X,Y]], NewPieces).

getPiecesLine(_, Colour, PieceColour, _, _, Pieces, NewPieces):-
	Colour \= PieceColour,
	append([], Pieces, NewPieces).

% Returns the possible moves of a piece
getPieceMoves(Board, X, Y, Output):-

	getPiece(Board, X, Y, Piece),
	getColour(Piece, Colour),
	getHeight(Piece, Height),

	getPieceMoves(Board, X, Y, Height, Colour, Output), !.

getPieceMoves(_, _, _, 1, _, []).

getPieceMoves(Board, X, Y, Height, Colour, Output):-
	Foobar = [],

	Height > 1,
	X1 is X+1, Y1 is Y-2, %% Up-right
	checkPieceMove(Board, X1, Y1, Colour, Foobar, Foobar2),
	X2 is X+2, Y2 is Y-1, %% Right-up
	checkPieceMove(Board, X2, Y2, Colour, Foobar2, Foobar3),
	X3 is X+2, Y3 is Y+1, %% Right-down
	checkPieceMove(Board, X3, Y3, Colour, Foobar3, Foobar4),
	X4 is X+1, Y4 is Y+2, %% Down-right
	checkPieceMove(Board, X4, Y4, Colour, Foobar4, Foobar5),
	X5 is X-1, Y5 is Y+2, %% Down-left
	checkPieceMove(Board, X5, Y5, Colour, Foobar5, Foobar6),
	X6 is X-2, Y6 is Y+1, %% Left-down
	checkPieceMove(Board, X6, Y6, Colour, Foobar6, Foobar7),
	X7 is X-2, Y7 is Y-1, %% Left-up
	checkPieceMove(Board, X7, Y7, Colour, Foobar7, Foobar8),
	X8 is X-1, Y8 is Y-2, %% Up-left
	checkPieceMove(Board, X8, Y8, Colour, Foobar8, Output).
	
% If the point (X,Y) has a piece adjacent to it adds the move to the list
checkPieceMove(Board, X, Y, Colour, InputList, OutputList):-
	(checkAdjacent(Board, X, Y, Colour),
	append(InputList, [[X, Y]], OutputList));
	append(InputList, [], OutputList).

% Checks if the point (X,Y) has a piece adjacent to it
checkAdjacent(Board, X, Y, Colour):-
	
	getPiece(Board, X, Y, []),

	X1 is X, Y1 is Y-1, %% Up
	X2 is X+1, Y2 is Y-1, %% Up-right
	X3 is X+1, Y3 is Y, %% Right
	X4 is X+1, Y4 is Y+1, %% Down-right
	X5 is X, Y5 is Y+1, %% Down
	X6 is X-1, Y6 is Y+1, %% Down-left
	X7 is X-1, Y7 is Y, %% Left
	X8 is X-1, Y8 is Y-1, %% Up-left

	(checkPieceColour(Board, X1, Y1, Colour);
	checkPieceColour(Board, X2, Y2, Colour);
	checkPieceColour(Board, X3, Y3, Colour);
	checkPieceColour(Board, X4, Y4, Colour);
	checkPieceColour(Board, X5, Y5, Colour);
	checkPieceColour(Board, X6, Y6, Colour);
	checkPieceColour(Board, X7, Y7, Colour);
	checkPieceColour(Board, X8, Y8, Colour)).

% Checks if there is a piece at (X,Y)
checkPieceColour(Board, X, Y, _):-
	getPiece(Board, X, Y, Piece),
	nth0(1, Piece, _).

% Attributes the color of a piece to a number
colourToNumber('', 0).
colourToNumber('w', 1).
colourToNumber('b', 2).

% Returns the highest sequence of pieces of a player, similarly to game_over
value(Board, Player, Value):-
	getBoardSize(Board, Ll, Bl),

	Max = 0,

	valueVertical(Board, 0, Bl, Ll, Player, Max, Max2),
	valueHorizontal(Board, 0, Bl, Ll, Player, Max2, Max3),
	valueDownRight(Board, 0, Bl, Ll, Player, Max3, Max4),
	valueDownLeft(Board, 0, Bl, Ll, Player, Max4, Value).

% Calculates the 4 points of each direction all over the board
valueVertical(_, Bl, Bl, _, _, Max, Max).
valueVertical(Board, Y, Bl, Ll, Player, Max, NewMax):-

	Y1 is Y+1,
	valueVertical(Board, 0, Y, Bl, Ll, Player, Max, Max2),
	valueVertical(Board, Y1, Bl, Ll, Player, Max2, NewMax).

valueVertical(_, Ll, _, _, Ll, _, Max, Max).
valueVertical(Board, X, Y, Bl, Ll, Player, Max, NewMax):-

	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	valueCheckFour(Board, X, Y, X, Y1, X, Y2, X, Y3, Player, Max, Max2),
	valueVertical(Board, NewX, Y, Bl, Ll, Player, Max2, NewMax).

valueHorizontal(_, Bl, Bl, _, _, Max, Max).
valueHorizontal(Board, Y, Bl, Ll, Player, Max, NewMax):-

	Y1 is Y+1,
	valueHorizontal(Board, 0, Y, Bl, Ll, Player, Max, Max2),
	valueHorizontal(Board, Y1, Bl, Ll, Player, Max2, NewMax).

valueHorizontal(_, Ll, _, _, Ll, _, Max, Max).
valueHorizontal(Board, X, Y, Bl, Ll, Player, Max, NewMax):-

	X1 is X+1,
	X2 is X+2,
	X3 is X+3,

	NewX is X+1,
	valueCheckFour(Board, X, Y, X1, Y, X2, Y, X3, Y, Player, Max, Max2),
	valueHorizontal(Board, NewX, Y, Bl, Ll, Player, Max2, NewMax).

valueDownRight(_, Bl, Bl, _, _, Max, Max).
valueDownRight(Board, Y, Bl, Ll, Player, Max, NewMax):-

	Y1 is Y+1,
	valueDownRight(Board, 0, Y, Bl, Ll, Player, Max, Max2),
	valueDownRight(Board, Y1, Bl, Ll, Player, Max2, NewMax).

valueDownRight(_, Ll, _, _, Ll, _, Max, Max).
valueDownRight(Board, X, Y, Bl, Ll, Player, Max, NewMax):-

	X1 is X+1,
	X2 is X+2,
	X3 is X+3,
	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	valueCheckFour(Board, X, Y, X1, Y1, X2, Y2, X3, Y3, Player, Max, Max2),
	valueDownRight(Board, NewX, Y, Bl, Ll, Player, Max2, NewMax).

valueDownLeft(_, Bl, Bl, _, _, Max, Max).
valueDownLeft(Board, Y, Bl, Ll, Player, Max, NewMax):-

	Y1 is Y+1,
	valueDownLeft(Board, 0, Y, Bl, Ll, Player, Max, Max2),
	valueDownLeft(Board, Y1, Bl, Ll, Player, Max2, NewMax).

valueDownLeft(_, Ll, _, _, Ll, _, Max, Max).
valueDownLeft(Board, X, Y, Bl, Ll, Player, Max, NewMax):-

	X1 is X-1,
	X2 is X-2,
	X3 is X-3,
	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	valueCheckFour(Board, X, Y, X1, Y1, X2, Y2, X3, Y3, Player, Max, Max2),
	valueDownLeft(Board, NewX, Y, Bl, Ll, Player, Max2, NewMax).
	

valueCheckOne(Board, X, Y, Player, N, Max, NewMax):-
	(\+((colourToNumber(Player, C),
	getPiece(Board, X, Y, Piece),
	getColour(Piece, Colour),
	colourToNumber(Colour, C2),
	C2 = C))), maximum(Max, N, NewMax).

% Calculates the value of 4 pieces
valueCheckFour(Board, X1, Y1, X2, Y2, X3, Y3, X4, Y4, Player, Max, NewMax):-

	valueCheckOne(Board, X1, Y1, Player, 0, Max, NewMax);
	valueCheckOne(Board, X2, Y2, Player, 1, Max, NewMax);
	valueCheckOne(Board, X3, Y3, Player, 2, Max, NewMax);
	valueCheckOne(Board, X4, Y4, Player, 3, Max, NewMax);
	maximum(Max, 4, NewMax).

% Checks if there is a winner and returns it if there is
game_over(Board, Winner):-
	getBoardSize(Board, Ll, Bl),

	game_over(Board, Ll, Bl, Winner).
	

game_over(Board, Ll, Bl, Winner):-
	checkWinVertical(Board, 0, Bl, Ll, Winner);
	checkWinHorizontal(Board, 0, Bl, Ll, Winner);
	checkWinDownRight(Board, 0, Bl, Ll, Winner);
	checkWinDownLeft(Board, 0, Bl, Ll, Winner).

% Checks if there are no more moves. If true blacks win
game_over(Board, _, _, Winner):-
	valid_moves(Board, 'w', WMoves),
	valid_moves(Board, 'b', BMoves),

	WMoves = [],
	BMoves = [],

	Winner = 'b'.

% Calculates the 4 points of each direction all over the board 
checkWinVertical(Board, Y, Bl, Ll, Winner):-
	Bl2 is Bl-3,
	Y @< Bl2,

	Y1 is Y+1,
	(checkWinVertical(Board, 0, Y, Bl, Ll, Winner);
	checkWinVertical(Board, Y1, Bl, Ll, Winner)).

checkWinVertical(Board, X, Y, Bl, Ll, Winner):-
	X @< Ll,

	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	(checkFour(Board, X, Y, X, Y1, X, Y2, X, Y3, Winner);
	checkWinVertical(Board, NewX, Y, Bl, Ll, Winner)).

checkWinHorizontal(Board, Y, Bl, Ll, Winner):-
	Y @< Bl,

	Y1 is Y+1,
	(checkWinHorizontal(Board, 0, Y, Bl, Ll, Winner);
	checkWinHorizontal(Board, Y1, Bl, Ll, Winner)).

checkWinHorizontal(Board, X, Y, Bl, Ll, Winner):-
	Ll2 is Ll-3,
	X @< Ll2,

	X1 is X+1,
	X2 is X+2,
	X3 is X+3,

	NewX is X+1,
	(checkFour(Board, X, Y, X1, Y, X2, Y, X3, Y, Winner);
	checkWinHorizontal(Board, NewX, Y, Bl, Ll, Winner)).

checkWinDownRight(Board, Y, Bl, Ll, Winner):-
	Bl2 is Bl-3,
	Y @< Bl2,

	Y1 is Y+1,
	(checkWinDownRight(Board, 0, Y, Bl, Ll, Winner);
	checkWinDownRight(Board, Y1, Bl, Ll, Winner)).

checkWinDownRight(Board, X, Y, Bl, Ll, Winner):-
	Ll2 is Ll-3,
	X @< Ll2,

	X1 is X+1,
	X2 is X+2,
	X3 is X+3,
	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	(checkFour(Board, X, Y, X1, Y1, X2, Y2, X3, Y3, Winner);
	checkWinDownRight(Board, NewX, Y, Bl, Ll, Winner)).

checkWinDownLeft(Board, Y, Bl, Ll, Winner):-
	Bl2 is Bl-3,
	Y @< Bl2,

	Y1 is Y+1,
	(checkWinDownLeft(Board, 3, Y, Bl, Ll, Winner);
	checkWinDownLeft(Board, Y1, Bl, Ll, Winner)).

checkWinDownLeft(Board, X, Y, Bl, Ll, Winner):-
	X @< Ll,

	X1 is X-1,
	X2 is X-2,
	X3 is X-3,
	Y1 is Y+1,
	Y2 is Y+2,
	Y3 is Y+3,

	NewX is X+1,
	(checkFour(Board, X, Y, X1, Y1, X2, Y2, X3, Y3, Winner);
	checkWinDownLeft(Board, NewX, Y, Bl, Ll, Winner)).

checkFour(Board, X1, Y1, X2, Y2, X3, Y3, X4, Y4, Winner):-
	checkFour(Board, X1, Y1, X2, Y2, X3, Y3, X4, Y4, 'w', Winner);
	checkFour(Board, X1, Y1, X2, Y2, X3, Y3, X4, Y4, 'b', Winner).

% Checks if 4 points are of a specific player, if so returns Player as the Winner
checkFour(Board, X1, Y1, X2, Y2, X3, Y3, X4, Y4, Colour, Winner):-

	colourToNumber(Colour, C),

	getPiece(Board, X1, Y1, Piece1),
	getColour(Piece1, Colour1),
	colourToNumber(Colour1, C1),
	C1 = C,

	getPiece(Board, X2, Y2, Piece2),
	getColour(Piece2, Colour2),
	colourToNumber(Colour2, C2),
	C2 = C,
	
	getPiece(Board, X3, Y3, Piece3),
	getColour(Piece3, Colour3),
	colourToNumber(Colour3, C3),
	C3 = C,

	getPiece(Board, X4, Y4, Piece4),
	getColour(Piece4, Colour4),
	colourToNumber(Colour4, C4),
	C4 = C,

	Winner = Colour.