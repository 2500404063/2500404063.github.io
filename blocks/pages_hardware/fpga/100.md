# FPGA Design Trick
This essay will talk about sequential circuit and combinatorial circuit.
**The conclusion is "Use sequential circuit to control, use combinatorial circuit to compute"**

## Packeting Thinking
If a module is complex(the time sequence), we should extract it in a single module(what we call Behavior Module). The top module should be used for managing the behavior modules and the outter input.

For example, SRAM and AXI.
In SRAM_MODULE, we should pack sram operations in a single module, and pull out control wires to AXI.
In SRAM_AXI, we should instantiate SRAM_MODULE, and manage it.

## Communication Between Modules
It is necessary to communicate with other modules.
We have serval mechanisms to ensure the right cooperation.

### Handshake
Hand One: the source, waiting for hand two.
Hand Two: the destination, rise up after or before hand one.
When both two hands rise up, they shake hands and reset states.

### Enable and Done
Enable: To enable a module globally.
Done: To tell the master the work has been done.

Master:
When Done dected, the master should set Enable Low.
Resume: Enable again.

```verilog
always @(*) begin
    if(done) enable = 1'b0;
end

always @(posedge clk) begin
    if(clk) begin
        enable <= 1'b1;
    end
end
```

Slaver:
When Enable is set to Low, the slaver should set Done low.
```verilog
always @(*) begin
    if(!enable) done = 1'b0;
end
```


## State Machine
When designing a time sequence circuit, state machine is essential.

State Machine has three types.

### Time Sequence Characteristic
Before we talk about the state machine, we have to catch the most important point in **Time Sequence Design**.
1. Write first: should write the data at the first Posedge
2. Read second: should read the data at he second Posedge

```text
          ____      ____      ____      ____
Clk _____/    \____/    \____/    \____/    \____
    IDLE w    S0  w/r   S1  w/r   S2  w\r
```
By the time sequence, we can get a characteristic of **Time Sequence Design**, that `End Valid`.
We cannot detect the start of a state. Everytime when we know what state it is at, it is at the end of the state, shifting to the next state.

Now we can put it another way:
State shifting happens at the end of a state.
At the moment turning to the next state, we should:
1. Write data for the next state.
2. Read data for the current state.

### One Stage
**Attention: This is highly not recommanded.**
**State shifting happens at the end of a state.**

Because it is not easy to maintain.
```verilog
module FSM(
    input clk,
    input rst_n,
    input en,
    output reg done
);

reg         useless_reg;
reg         v1;
reg[2:0]    state;
//If you have comprehended the characteristic of Time Sequence,
//You should know why a IDLE state is needed.
//Gray Code
localparam  STATE_IDLE     = 3'b000;
localparam  STATE_S1       = 3'b001;
localparam  STATE_S2       = 3'b011;

//This is used for
//1. State shifting  (Sequential Logic)
//2. State judging   (Sequential Logic)
//3. Output          (Sequential Logic)
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        //Initial State
        state <= STATE_IDLE;
    end else begin
        //Global enable
        if(en) begin
            case(state)
                STATE_IDLE: begin
                    //for the next state
                    if(xxx) v1     <= 1'b1;
                    //just output 
                    if(xxx) out1   <= 1'b0;
                    //read date and shift.
                    if(xxx) state  <= STATE_S1;
                end
                STATE_S1: begin
                    if(v1) out1    <= 1'b0;
                    if(xxx) state  <= STATE_S2;
                end
                STATE_S2: begin
                    if(xxx) out1   <= 1'b0;
                    if(xxx) begin 
                        state      <= STATE_IDLE;
                        done       <= 1'b1;
                    end
                end
                //use default to avoid latch
                default: useless_reg <= 1'b0;
            endcase
        end
    end
end

endmodule
```

### Two Stages
This is not recommanded, but can be used.
The output is combinatorial logic, so that some **sharp peak** may appear while state shifting.
**State shifting happens at the end of a state.**
**Using combianatorial logic, the next state will be assigned at the start of a state or within a state.**
```verilog
module FSM(
    input clk,
    input rst_n,
    input en,
    output reg done
);

reg         useless_reg;
reg         v1;
reg[2:0]    cur_state;
reg[2:0]    nxt_state;
//Gray Code
localparam  STATE_IDLE     = 3'b000;
localparam  STATE_S1       = 3'b001;
localparam  STATE_S2       = 3'b011;

//This is used for
//1. State shifting     (Sequential Logic)
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        cur_state <= STATE_IDLE;
    end else begin
        if(en) begin
            cur_state <= nxt_state;
        end
    end
end

//This is used for
//1. State judging      (Combinatorial Logic)
//2. Output             (Combinatorial Logic)
always @(*) begin
    if(en) begin
        case(cur_state)
            STATE_IDLE: begin
                //for the next state
                if(xxx) v1          = 1'b1;
                //just output 
                if(xxx) out1        = 1'b0;
                //read date and shift.
                if(xxx) nxt_state   = STATE_S1;
            end
            STATE_S1: begin
                if(v1) out1         = 1'b0;
                if(xxx) nxt_state   = STATE_S2;
            end
            STATE_S2: begin
                if(xxx) out1        = 1'b0;
                if(xxx) begin 
                    done            = 1'b1;
                    nxt_state       = STATE_IDLE;
                end
            end
            //use default to avoid latch
            default: useless_reg <= 1'b0;
        endcase
    end
end

endmodule
```

### Three Stages
This is recomanded.
**State shifting happens at the end of a state.**
**Using combianatorial logic, the next state will be assigned at the start of a state or within a state.**
```verilog
module FSM(
    input clk,
    input rst_n,
    input en,
    output reg done
);

reg         useless_reg;
reg         v1;
reg[2:0]    cur_state;
reg[2:0]    nxt_state;
//Gray Code
localparam  STATE_IDLE     = 3'b000;
localparam  STATE_S1       = 3'b001;
localparam  STATE_S2       = 3'b011;

//This is used for
//1. State shifting     (Sequential Logic)
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        cur_state <= STATE_IDLE;
    end else begin
        if(en) begin
            cur_state <= nxt_state;
        end
    end
end

//This is used for
//1. State judging      (Combinatorial Logic)
always @(*) begin
    if(en) begin
        case(cur_state)
            STATE_IDLE: begin
                //read date and shift.
                if(xxx) nxt_state   = STATE_S1;
            end
            STATE_S1: begin
                if(xxx) nxt_state   = STATE_S2;
            end
            STATE_S2: begin
                if(xxx) begin 
                    nxt_state       = STATE_IDLE;
                end
            end
            //use default to avoid latch
            default: useless_reg = 1'b0;
        endcase
    end
end

//This is used for
//1. Output (Sequential Logic)
always @(posedge clk) begin
    if(en) begin
        case(cur_state)
            STATE_IDLE: begin
                //for the next state
                if(xxx) v1          <= 1'b1;
                //just output
                if(xxx) out1        <= 1'b0;
            end
            STATE_S1: begin
                if(v1) out1         <= 1'b0;
            end
            STATE_S2: begin
                if(xxx) out1        <= 1'b0;
                if(xxx) begin 
                    done            <= 1'b1;
                end
            end
            default: useless_reg <= 1'b0;
        endcase
    end
end

endmodule
```

### Delay In State Machine
If you want to wait for a certain cycle, you can use counter to delay in any state.
example:
```verilog
module FSM(
    input clk,
    input rst_n,
    input en,
    output reg done
);

reg[2:0]    delay_counter;
reg         useless_reg;
reg         v1;
reg[2:0]    cur_state;
reg[2:0]    nxt_state;
//Gray Code
localparam  STATE_IDLE     = 3'b000;
localparam  STATE_S1       = 3'b001;
localparam  STATE_S2       = 3'b011;

//This is used for
//1. State shifting     (Sequential Logic)
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        cur_state <= STATE_IDLE;
    end else begin
        if(en) begin
            cur_state <= nxt_state;
        end
    end
end

//This is used for
//1. State judging      (Combinatorial Logic)
always @(*) begin
    if(en) begin
        case(cur_state)
            STATE_IDLE: begin
                //read date and shift.
                if(xxx) nxt_state   = STATE_S1;
            end
            STATE_S1: begin
                //S1 keeps for 5 cycles(0 1 2 3 4)
                if(delay_counter == 3'd4) nxt_state = STATE_S2;
            end
            STATE_S2: begin
                if(xxx) begin 
                    nxt_state       = STATE_IDLE;
                end
            end
            //use default to avoid latch
            default: useless_reg = 1'b0;
        endcase
    end
end

//This is used for
//1. Output (Sequential Logic)
always @(posedge clk) begin
    if(en) begin
        case(cur_state)
            STATE_IDLE: begin
                //for the next state
                if(xxx) v1          <= 1'b1;
                //just output
                if(xxx) out1        <= 1'b0;
                //Init counter for S1
                delay_counter       <= 1'b0;
            end
            STATE_S1: begin
                //Count
                delay_counter       <= delay_counter + 1'b1;
                if(v1) out1         <= 1'b0;
            end
            STATE_S2: begin
                if(xxx) out1        <= 1'b0;
                if(xxx) begin 
                    done            <= 1'b1;
                end
            end
            default: useless_reg <= 1'b0;
        endcase
    end
end

endmodule
```

To master State Machine, you need to know what is taking, at the start of a state and at the end of a state.
Pay attention to the Sequential Logic and Combianatorial Logic.

**The conclusion is "Use sequential circuit to control, use combinatorial circuit to compute"**