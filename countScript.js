// Declare global variables
var array = [];
var size = 0;

// Function to generate the array
function generateArray() {

    // Obtain the size value from the slider
    size = parseFloat(document.getElementById("sizeSlider").value); // Retrieve the size from the slider
    console.log(size);

    for(let i = 0; i < size; i++) {
        array[i] = Math.floor(Math.random() * size); // Generate random integer between 0 and size
    }

    // Displaying bars
    showBars();
}

// Count Sort Algorithm with animation steps
function countSort(array) {

    // Start timing
    const startTime = performance.now();

    let swaps = []; // This will store the swaps for animation

    // Find the maximum number in the array
    let max = Math.max(...array);
    let countArray = new Array(max + 1).fill(0); // Count array initialized with zeros

    // Storing count of each element
    for (let i = 0; i < array.length; i++) {
        countArray[array[i]]++;
    }

    // Rebuilding sorted array and storing swaps for animation
    let sortedIndex = 0;
    for (let i = 0; i < countArray.length; i++) {
        while (countArray[i] > 0) {
            swaps.push([sortedIndex, i]);  // Push the index and value to animate
            array[sortedIndex++] = i;
            countArray[i]--;
        }
    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML=`Execution time: ${timeTaken.toFixed(2)} milliseconds`;


    return swaps; // Return swaps for animation
}

// Function to sort the array and animate count sort
function sort() {

    const copy = [...array];
    const swaps = countSort(copy); 

    animate(swaps);
}

// Custom animation function for count sort
function animate(swaps, callback) {
    if (swaps.length == 0) {
        if (callback) 
            callback(); // Call the callback function when animation is done
        showBars();
        return;
    }

    const [index, value] = swaps.shift();
    array[index] = value;  // Update the array with the sorted value

    showBars([index]);  // Highlight the index being updated

    setTimeout(function() {
        animate(swaps, callback); 
    }, 30);  
}

// Function to visualize the array as bars (no changes here)
function showBars(indices) {

    const container = document.getElementById("container"); // Get container for bars
    container.innerHTML = ''; // Clear previous bars

    // Creating and displaying bars
    for (let i = 0; i < size; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 10 + "%";
        bar.classList.add("bar");

        if (indices && indices.includes(i))
            bar.style.backgroundColor = "teal"; // Highlight the bars being updated

        container.appendChild(bar);
    }
}
