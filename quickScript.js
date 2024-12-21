// Declare global variables
var array = [];
var size = 0;

function generateArray() {
    // Obtain user input
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the input
    console.log(size);

    // Inserting values randomly
    array = [];
    for (let i = 0; i < size; i++)
        array[i] = Math.random() * (size - i);
    
    // Displaying bars
    showBars();
}


function sort() {
    const copy = [...array];
    const swaps = [];  // Collect quicksort steps

    // Start timing
    const startTime = performance.now();

    quickSort(copy, 0, copy.length - 1, swaps);
    animate(swaps);

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML=`Execution time: ${timeTaken.toFixed(2)} milliseconds`;
}

function quickSort(array, p, r, swaps) {
    if (p < r) {
        let q = partition(array, p, r, swaps);  // Collect partition steps
        quickSort(array, p, q - 1, swaps);  // Sort elements before partition
        quickSort(array, q + 1, r, swaps);  // Sort elements after partition
    }
}

function partition(array, p, r, swaps) {
    let pivot = array[r];  // Choose the last element as pivot
    let i = p - 1;  // i will track the boundary of smaller elements

    for (let j = p; j < r; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];  // Swap elements smaller than the pivot
            swaps.push([i, array[i]]);  // Collect the swap step
            swaps.push([j, array[j]]);  // Collect the swap step
        }
    }

    // Swap the pivot to its correct position
    [array[i + 1], array[r]] = [array[r], array[i + 1]];
    swaps.push([i + 1, array[i + 1]]);  // Collect the final swap step
    swaps.push([r, array[r]]);  // Collect the final swap step

    return i + 1;  // Return the partition index
}

// Animation function (same as merge sort)
function animate(swaps) {
    if (swaps.length == 0) {
        showBars();
        return;
    }

    const [index, value] = swaps.shift();
    array[index] = value;

    showBars([index]);  // Highlight the current element being swapped

    setTimeout(function() {
        animate(swaps);
    }, 15);  // Adjust the speed of animation here
}

function showBars(indices) {
    const container = document.getElementById("container"); // Get container for bars
    container.innerHTML = ''; // Clear previous bars

    // Creating and displaying bars
    for (let i = 0; i < size; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 10 + "%";
        bar.classList.add("bar");

        if (indices && indices.includes(i))
            bar.style.backgroundColor = "teal";  // Highlight the bars being swapped

        container.appendChild(bar);
    }
}
