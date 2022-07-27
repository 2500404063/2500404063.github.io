# Pipe Design Thinking

## All Parallel
Do not perceive pipes as a data stream.
It ain't and would never be.
**All pipes are running at the same time.**
**When pipes should be working depends the rules.**

Pipes split works originally in one cycle into multi-cycle, which seems getting slower.
But because pipes only need to do a little thing in a cycle, a cycle can be shorter.
**This is the main thinking of Pipeline.**

This includes two designing concepts on Pipe Design.
1. Pipe's data flow.
2. Pipe's rule control.
That rhymes right? Let us see why.

## Data-flow
For the pipes' behaviors, the first pipe may use the data from the third pipe.
That is the reason why you should not regard pipes as a data stream, because it not always a single direction.

**All pipes are just a sequential circuit, or can be a state machine.**

What a pipe gets from other pipes is the processed data from other pipes, or the last data from self.
```text
     ____      ____      ____
____/    \____/    \____/
    A         B
```
Every pipe, gets the processed result at A, and starts to process after A till B(not included).
Every pipe does the same thing at B.

## Rule control
While designing a pipeline, you will meet a case that sometimes, not all pipes are working, sometimes a pipe has to wait for other pipes.

How to solve that? Surely we can make some mechanisms to constrain them.
1. Overlapped State Machine: This contains IDLE state and DONE state, which means it can go back to initial state. This is a very great mechanism to control. **Overlapped means that you can split a cycle into more cycles.**
2. Global State Manager: This is a global state that every pipe can change self's or others'.