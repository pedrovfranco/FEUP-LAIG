:- consult('utilities.pl'), use_module(library(lists)).

%%%%%%%%%%%
% Console %
%%%%%%%%%%%

% Helper to clear console 
clear_console :- 
	clear_console(40), !.

clear_console(0).

clear_console(N) :-
	nl, N1 is N - 1, clear_console(N1).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Game Rows and columns index %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%Helpers to display the Board
% displayBar - displays bar in index
% displayX - displays X index on board
% printColumnNumber - displays Y index on board
displayBar(Board):-
	getBoardSize(Board, W, _),
	I is 1,
	write('   ___'),
	displayBar(Board, W, I).

displayBar(Board, Width, N) :-
	write('|___'),
	(N1 is N + 1,
	N1 @< Width,
	displayBar(Board, Width, N1);
	true).

displayX(Board):-
	getBoardSize(Board, W, _),
	I is 1,
	write('    0 '),
	displayX(Board, W, I).

displayX(Board, Width, N) :-
	write('| '), write(N), write(' '),
	(N1 is N + 1, 
	N1 @< Width,
	displayX(Board, Width, N1);
	true).

printColumnNumber(N):- 
	N < 10,
	write(N),
	write(' |').

 printColumnNumber(N):- 
	N >= 10,
	write(N),
	write('|').
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

alphabet([' A ', ' B ', ' C ', ' D ', ' E ', ' F ', ' G ', ' H ']).


draw_piece_aux([H|T]):-
	nth0(1, [H|T], Colour),
	printPieceColour(H, Colour).
draw_piece_aux([H|[]]):- write(H).

draw_piece([]):- write(' _ ').
draw_piece([H|T]):-
	draw_piece_aux([H|T]).


%Prints piece and colour
printPieceColourAux(N, Colour):- 
	N < 10,
	write(N),
	write(' '),
	write(Colour).

 printPieceColourAux(N, Colour):- 
	N >= 10,
	write(N),
	write(Colour).

 printPieceColour(N, Colour):-
 	printPieceColourAux(N,Colour).

print_line_aux([]):-
	write('|'),nl.
print_line_aux([_|_]):-
	write('|').

print_line([]).
print_line([H|T]):-
	T \= [],
	draw_piece(H),
	print_line_aux(T),
	print_line(T).

print_line([H|T]):-
	T = [],
	draw_piece(H),
	print_line_aux(T),
	print_line(T).

printBoard([], _).
printBoard([H|T], I) :-
	printColumnNumber(I),
	print_line(H),

	I1 is I+1,
	printBoard(T, I1).

printBoard(Board):-
	I is 0,
	nl,displayX(Board),nl,
	displayBar(Board),nl,
	printBoard(Board, I).


printInitial :-
	initialBoard(Tabuleiro),
	printBoard(Tabuleiro).


showMoves(Board, Moves, Output):-
	alphabet(Alphabet),
	showMoves(Board, Moves, Alphabet, Output).

showMoves(Board, [], _, Board).
showMoves(Board, [H|T], [H2|T2], Output):-
	nth0(0, H, X),
	nth0(1, H, Y),
	replaceByCoords(Board, X, Y, [H2], Foobar),
	showMoves(Foobar, T, T2, Output).
