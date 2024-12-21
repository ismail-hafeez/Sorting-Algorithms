// Declare global variables
var array = [];
var size = 0;

function generateArray() {
    // Obtain the size value from the slider
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the slider
    console.log(size);

    // Inserting values randomly
    array = [];
    for (let i = 0; i < size; i++)
        array[i] = Math.random() * (size - i);
    
    // Displaying bars
    showBars();
}

function sortMerge() {
    const copy = [...array];
    const swaps = [];  // Collect merge steps

    // Start timing
    const startTime = performance.now();

    heapSort(copy, swaps);
    animate(swaps);

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML = `Execution time: ${timeTaken.toFixed(2)} milliseconds`;
}

// Heap Sort with swap recording
function heapSort(arr, swaps) {
    let length = arr.length;

    // Build the max heap
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(arr, length, i, swaps);
    }

    // Extract elements from heap one by one
    for (let i = length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
        swaps.push([0, arr[0]]);  // Record the swap
        swaps.push([i, arr[i]]);  // Record the swap
        heapify(arr, i, 0, swaps); // Heapify the root element
    }

    return arr;
}

// Heapify with swap recording
function heapify(arr, length, i, swaps) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
        swaps.push([i, arr[i]]);  // Record the swap
        swaps.push([largest, arr[largest]]);  // Record the swap
        heapify(arr, length, largest, swaps);
    }
}


// Animation function
function animate(swaps) {
    if (swaps.length == 0) {
        showBars();
        return;
    }

    const [index, value] = swaps.shift();
    array[index] = value;

    showBars([index]); // Highlight the current element being swapped

    setTimeout(function() {
        animate(swaps);
    }, 20);  // Adjust the speed of animation here
}

// Function to display the array as bars
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
