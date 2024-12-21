// Declare global variables
var array = [];
var size = 0;

// Function to generate the array
function generateArray() {

    // Obtain the size value from the slider
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the slider
    console.log(size);

    // Inserting values for 
    for(let i = 0; i < size; i++) {
        array[i] = Math.random() * (size - i);
    }

    // Displaying bars
    showBars();
}

// Function to sort the array
function sort() {

    const copy = [...array];
    const swaps = bubbleSort(copy); 

    animate(swaps);
}


function animate(swaps, callback) {
    if (swaps.length == 0) {
        if (callback) 
            callback(); // Call the callback function when animation is done
        showBars();
        return;
    }

    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];

    showBars([i,j]);

    setTimeout(function() {
        animate(swaps, callback); // Continue animation until done
    }, 4);
}


// Bubble Sort Algorithm
function bubbleSort(array) {

     // Start timing
    const startTime = performance.now();

    const swaps=[];

    for(let i = 0; i < size; i++) {
        let swap = 0;

        for(let j = 0; j < size - i; j++) {

            if(array[j] > array[j + 1]) {

                swaps.push([j, j+1]);
                // swapping
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swap += 1;
            }
        }     

        if(swap == 0)
            break;

    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML=`Execution time: ${timeTaken.toFixed(2)} milliseconds`;


    return swaps;
}

// Function to visualize the array as bars
function showBars(indices) {

    const container = document.getElementById("container"); // Get container for bars
    container.innerHTML = ''; // Clear previous bars

    // Creating and displaying bars
    for (let i = 0; i < size; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 10 + "%";
        bar.classList.add("bar");

        if(indices && indices.includes(i))
            bar.style.backgroundColor="teal";

        container.appendChild(bar);
    }
}
