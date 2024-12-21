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

// Function to perform bucket sort and collect sorting steps
function bucketSort(arr) {
    const swaps = [];
    const startTime = performance.now();

    let max = Math.max(...arr);
    let bucketCount = 10;
    let buckets = Array.from({ length: bucketCount }, () => []);

    // Placing array elements in different buckets based on value
    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] / max) * (bucketCount - 1)); // Normalized index for the buckets
        buckets[bucketIndex].push(arr[i]);
    }

    // Sorting individual buckets
    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    // Merging all buckets to get the sorted array
    let sortedIndex = 0;
    for (let i = 0; i < bucketCount; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[sortedIndex] = buckets[i][j];
            swaps.push([sortedIndex, buckets[i][j]]); // Record the update steps
            sortedIndex++;
        }
    }

    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    document.getElementById('result').innerHTML = `Execution time: ${timeTaken.toFixed(2)} milliseconds`;

    return swaps; // Return the steps for animation
}

// Function to sort the array and animate bucket sort
function sort() {
    const copy = [...array];
    const swaps = bucketSort(copy); 

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
