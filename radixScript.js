// Declare global variables
var array = [];
var size = 0;

// Function to generate the array
function generateArray() {
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the slider
    console.log(size);

    array = [];
    for (let i = 0; i < size; i++) {
        array[i] = Math.floor(Math.random() * size); // Generate random integer between 0 and size
    }

    // Displaying bars
    showBars();
}

// Get the maximum element in the array
function getMax(arr) {
    return Math.max(...arr);
}

// Count Sort for Radix, collect the steps (swaps) for animation
function countSortForRadix(arr, exp, swaps) {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);

    // Count occurrences based on the digit represented by exp
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    // Cumulative count to determine sorted order
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Building the output array and recording swaps
    for (let i = arr.length - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        swaps.push([count[index] - 1, arr[i]]); // Record swap steps
        count[index]--;
    }

    // Copying the sorted values back to the original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

// Radix Sort with animation
function radixSort(arr) {
    const swaps = [];
    const startTime = performance.now();

    let max = getMax(arr);

    // Apply count sort for each digit (1s, 10s, 100s)
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSortForRadix(arr, exp, swaps);
    }

    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    document.getElementById('result').innerHTML = `Execution time: ${timeTaken.toFixed(2)} milliseconds`;

    return swaps; // Return the swaps for animation
}

// Function to sort the array and animate radix sort
function sort() {
    const copy = [...array];
    const swaps = radixSort(copy); 

    animate(swaps);
}

// Custom animation function
function animate(swaps, callback) {
    if (swaps.length === 0) {
        if (callback) 
            callback(); // Call the callback function when animation is done
        showBars();
        return;
    }

    const [index, value] = swaps.shift();
    array[index] = value;  // Update the array with the sorted value

    showBars([index]);  // Highlight the index being updated

    setTimeout(function() {
        animate(swaps, callback); // Continue animation
    }, 30);  // Adjust the speed of animation here
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

        if (indices && indices.includes(i)) {
            bar.style.backgroundColor = "teal"; // Highlight the bars being updated
        }

        container.appendChild(bar);
    }
}
