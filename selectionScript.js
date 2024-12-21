// Declare global variables
var array = [];
var size = 0;

function generateArray() {
    // Obtain the size value from the slider
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the slider
    console.log(size);

    // Inserting values randomly
    for(let i = 0; i < size; i++) 
        array[i] = Math.random() * (size - i);
    
    // Displaying bars
    showBars();
}

function sort() {

    const copy = [...array];
    const swaps = selectionSort(copy); 

    animate(swaps);
}

function animate(swaps) {
    
    if (swaps.length == 0) {
        showBars();
        return;
    }

    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];

    showBars([i,j]);

    setTimeout(function() {
        animate(swaps);
    }, 25);
}

function selectionSort(array) {

    // Start timing
    const startTime = performance.now();

    const swaps=[];

    for(let i = 0; i < size; i++) {

        let min_index = i;

        for(let j = i + 1; j < size; j++) {

            if (array[j] < array[min_index])
                    min_index = j;
        }  

        if(min_index != i) {
            swaps.push([i, min_index]);
            // swapping
            [array[i], array[min_index]] = [array[min_index], array[i]];
        }

    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML=`Execution time: ${timeTaken.toFixed(2)} milliseconds`;

    return swaps;
}

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
