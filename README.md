

# Gestures

Settle your friendly disputes with a good old Rock Paper Scissors , with new weapons : Lizard and Spock.

## Overview

[Tutorial](https://www.loom.com/share/f34d1042b1f7478ea77a6f20b3d1b0f3?sid=17fb7588-f797-4b7a-b9f6-fcf49750f089)

[Game Contract](https://github.com/clesaege/RPS/blob/master/RPS.sol)

<img src="https://i.imgur.com/WhOet7A.png" alt="Mainscreen" width="50%"/>


------------------------------------------------------------------

## Challenges

Here are some brief overview of the challenges I faced while developing this and the solutions I came up with.


### How to handle salt?


While deploying the Game Contract, we have to pass in a hash of Player 1's move,
now we generate the hash using this function in server side.
The function generates a random salt, hashes the move with it.

https://github.com/Harman-singh-waraich/Gestures/blob/9f993240ddd7e81fdf2b93dabdd44e793bfd9083/src/app/_utils/secureHash.ts#L6-L16

Then we encrypt the salt and send it back on client side with the hashed move.
The encrypted salt is saved in local storage for now, which is used later in game when revealing Player 1's move.


> Note :- I could also have used a password from user side which will encrypt the salt, but I didn't since it would not be good for UX , and the user will have to remember the password at the time of reveal.



### How to show game ended to Player 2?


Since the contract does not emit any event when the game ends, it becomes hard to detect the end.
<br/>

=> Luckily , when the **solve** function is called in smart contract, it resets the **stake** variable,
So in frontend, I listen to changes in **stake** variable, once the variable resets, We immediately notice the *BlockNumber*.
<br/>
That *block* will contain the txn that set the **stake** to zero.
So now we just find that txn and decode the input to get the **c1** move and update it on Player 2's. Hence ending the game.


<br/>

> Here ,I assume that stake is never zero. In case we want to handle the zero case too, we would have to deploy a listener that checks every block after Player 2 makes his move to listen to the **solve** txn. Here I didn't since it would eat up lots of resources.


<br/> 

> We can put an event in **solve** function, and also **J1Timeout** and **J2Timeout** too, makes it easier to detect end.

<br/>
here's the code snippet that finds the **solve** txn.
https://github.com/Harman-singh-waraich/Gestures/blob/a3aa291843b492a3b20a476fa7b5c005d5b1b6c9/src/app/_hooks/useContract.ts#L98-L124

<br/>


------------------------------------------------------------------

<br/>

## Questions to wonder

<br/>

### Why not send the encrypted salt to Player 2 through url and decrypt it server side from the app ,to reveal the move at game end?

Lets say we do send it, but in case Player 2 is the site deployer's close friend, he could bribe the deployer into revealing the secret key used to encrypt the salt, thus winning every game.

<br/>


<br/>

### Why not encrypt c1 too and store it in local storage or pass around?

If we do that, we jeopardise the game, as the number of moves are limited (5 in this case), one can easily create a Hash table and exploit it.



------------------------

## Mixed Nash Equilibra of this game

So wats Mixed Nash equilibria of a game? . From what I learned, finding the mixed Nash equilibrium involves determining how players should probabilistically choose their actions in order to achieve a stable outcome where no player has an incentive to change their strategy given the strategies of the others.
Basically, Player 1 can play any move randomly and would have the same probability of winning or loosing each time.
There is no Move that Player 1 can make that gives more probablity of winning, likewise for Player 2.

Since this game is symmetric, each move has 20% probablity of winning.
Each move takes down 2 other moves.
So there is a pure equilibrium.

If lets say one move out of the 5 moves, took down 3 moves, then it would not be equilibrium, since then the players would be inclined to play that move.

<img src="https://i.imgur.com/BXskxmL.png" alt="equilobria" width="50%"/>

