# C - Hello World

## Code

The simple hello world code should look like:

    #include <stdlib.h>

    int main(){
        printf("Hello World!\n");

        return 0;
    }

## Running

Save a file named like `main.go`, put the code above in it and run

    gcc main.go -o bin

Which will compile `main.go` using `gcc` and save the executable file nameed as `bin`

To run the executable, run:

    ./bin
