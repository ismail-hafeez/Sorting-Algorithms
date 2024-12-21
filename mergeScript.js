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

    // start timing
    const startTime = performance.now();

    mergeSort(copy, 0, copy.length - 1, swaps);
    animate(swaps);


    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    console.log(timeTaken.toFixed(2));

    document.getElementById('result').innerHTML=`Execution time: ${timeTaken.toFixed(2)} milliseconds`;

}

function mergeSort(array, p, r, swaps) {
    if (p < r) {
        const q = Math.floor((p + r) / 2);  // Ensure q is an integer
        mergeSort(array, p, q, swaps);  // Sort the left half
        mergeSort(array, q + 1, r, swaps);  // Sort the right half
        merge(array, p, q, r, swaps);  // Merge the two halves
    }
}

function merge(array, p, q, r, swaps) {
    const n1 = q - p + 1;
    const n2 = r - q;

    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
        L[i] = array[p + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = array[q + 1 + j];
    }

    // Merge the temp arrays back into array[p..r]
    let i = 0, j = 0;
    let k = p;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            swaps.push([k, array[k]]); // Collect the position and value being swapped
            i++;
        } else {
            array[k] = R[j];
            swaps.push([k, array[k]]); // Collect the position and value being swapped
            j++;
        }
        k++;
    }

    // Copy any remaining elements of L[], if any
    while (i < n1) {
        array[k] = L[i];
        swaps.push([k, array[k]]); // Collect the position and value being swapped
        i++;
        k++;
    }

    // Copy any remaining elements of R[], if any
    while (j < n2) {
        array[k] = R[j];
        swaps.push([k, array[k]]); // Collect the position and value being swapped
        j++;
        k++;
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
    }, 30);  // Adjust the speed of animation here
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
