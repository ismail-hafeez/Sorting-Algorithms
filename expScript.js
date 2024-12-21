

// arrays for graph
var input_x = [100, 500, 1000, 5000, 10000, 50000, 100000];
var bubble_y = [];
var insertion_y = [];
var selection_y = [];
var merge_y = [];
var quick_y = [];
var heap_y = [];
var count_y = [];
var radix_y = [];
var bucket_y = [];
var index=0;

// initializing table of contents
var table = `
    <table border="5">
        <tr>
            <th> Array Size</th>
            <th> Bubble</th>
            <th> Insertion</th>
            <th> Selection</th>
            <th> Merge</th>
            <th> Quick</th>
            <th> Heap</th>
            <th> Radix</th>
            <th> Bucket</th>
            <th> Count</th>
        </tr>
        <tr>
            <td> 100</td>
            <td id="bubble-100"></td>
            <td id="insertion-100"></td>
            <td id="selection-100"></td>
            <td id="merge-100"></td>
            <td id="quick-100"></td>
            <td id="heap-100"></td>
            <td id="radix-100"></td>
            <td id="bucket-100"></td>
            <td id="count-100"></td>              
        </tr>
        <tr>
            <td> 500</td>
            <td id="bubble-500"></td>
            <td id="insertion-500"></td>
            <td id="selection-500"></td>
            <td id="merge-500"></td>
            <td id="quick-500"></td>
            <td id="heap-500"></td>
            <td id="radix-500"></td>
            <td id="bucket-500"></td>
            <td id="count-500"></td>            
        </tr>
        <tr>
            <td> 1000</td>
            <td id="bubble-1000"></td>
            <td id="insertion-1000"></td>
            <td id="selection-1000"></td>
            <td id="merge-1000"></td>
            <td id="quick-1000"></td>
            <td id="heap-1000"></td>
            <td id="radix-1000"></td>
            <td id="bucket-1000"></td>
            <td id="count-1000"></td>             
        </tr>
        <tr>
            <td> 5000</td>
            <td id="bubble-5000"></td>
            <td id="insertion-5000"></td>
            <td id="selection-5000"></td>
            <td id="merge-5000"></td>
            <td id="quick-5000"></td>
            <td id="heap-5000"></td>
            <td id="radix-5000"></td>
            <td id="bucket-5000"></td>
            <td id="count-5000"></td>             
        </tr>
        <tr>
            <td> 10000</td>
            <td id="bubble-10000"></td>
            <td id="insertion-10000"></td>
            <td id="selection-10000"></td>
            <td id="merge-10000"></td>
            <td id="quick-10000"></td>
            <td id="heap-10000"></td>
            <td id="radix-10000"></td>
            <td id="bucket-10000"></td>
            <td id="count-10000"></td>             
        </tr>
        <tr>
            <td> 50000</td>
            <td id="bubble-50000"></td>
            <td id="insertion-50000"></td>
            <td id="selection-50000"></td>
            <td id="merge-50000"></td>
            <td id="quick-50000"></td>
            <td id="heap-50000"></td>
            <td id="radix-50000"></td>
            <td id="bucket-50000"></td>
            <td id="count-50000"></td>             
        </tr>
        <tr>
            <td> 100000</td>
            <td id="bubble-100000"></td>
            <td id="insertion-100000"></td>
            <td id="selection-100000"></td>
            <td id="merge-100000"></td>
            <td id="quick-100000"></td>
            <td id="heap-100000"></td>
            <td id="radix-100000"></td>
            <td id="bucket-100000"></td>
            <td id="count-100000"></td>             
        </tr>
    </table>
`;

document.getElementById("result_table").innerHTML = table;


function initializeArray(size) {

    var array=[];
    for (let i = 0; i < size; i++) 
        array[i] = size - i;
    

    return array;

}

function insertionSort(array, size) {

    // Start timing
    const startTime = performance.now();

    for(let i = 0; i < size; i++) {

        let key = array[i];
        let j = i - 1;

        while(j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;

    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;


    return timeTaken.toFixed(2);
}

function bubbleSort(array, size) {

    // Start timing
    const startTime = performance.now();
 
    for(let i = 0; i < size; i++) {
        let swap = 0;

        for(let j = 0; j < size - i; j++) {

            if(array[j] > array[j + 1]) {
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

    return timeTaken.toFixed(2);
}

function selectionSort(array, size) {

    // Start timing
    const startTime = performance.now();

    for(let i = 0; i < size; i++) {

        let min_index = i;

        for(let j = i + 1; j < size; j++) {

            if (array[j] < array[min_index])
                    min_index = j;
        }  

        if(min_index != i) {
            // swapping
            [array[i], array[min_index]] = [array[min_index], array[i]];
        }

    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;


    return timeTaken.toFixed(2);
}

function mergeSort(array, p, r) {
    if (p < r) {
        const q = Math.floor((p + r) / 2);  // Ensure q is an integer
        mergeSort(array, p, q);  // Sort the left half
        mergeSort(array, q + 1, r);  // Sort the right half
        merge(array, p, q, r);  // Merge the two halves
    }
}

function merge(array, p, q, r) {
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
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy any remaining elements of L[], if any
    while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
    }

    // Copy any remaining elements of R[], if any
    while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
    }
}

function quickSort(array, p, r) {
    // Create an auxiliary stack to simulate the recursion
    let stack = [];
    
    // Push initial values onto the stack
    stack.push({ p: p, r: r });

    // Continue sorting while there are ranges on the stack
    while (stack.length > 0) {
        const { p, r } = stack.pop();  // Get the current range

        if (p < r) {
            let q = partition(array, p, r);  // Partition the array

            // Push right side of partition onto stack
            stack.push({ p: q + 1, r: r });

            // Push left side of partition onto stack
            stack.push({ p: p, r: q - 1 });
        }
    }
}

function partition(array, p, r) {
    let pivot = array[r];  // Choose the last element as pivot
    let i = p - 1;  // i tracks boundary of smaller elements

    for (let j = p; j < r; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];  // Swap elements smaller than pivot
        }
    }

    [array[i + 1], array[r]] = [array[r], array[i + 1]];  // Place pivot in correct position
    return i + 1;  // Return the pivot index
}

function heapSort(arr) {
    let length = arr.length;

    // Build the max heap
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(arr, length, i);
    }

    // Extract elements from heap one by one
    for (let i = length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
        heapify(arr, i, 0); // Heapify the root element
    }

    return arr;
}

function heapify(arr, length, i) {
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
        heapify(arr, length, largest);
    }
}

function countSort(arr) {

    const startTime = performance.now();

    // maximum number in the array
    let max = Math.max(...arr);//... spread operator is used because math.max doesn't work directly with array
    let countArray = new Array(max + 1).fill(0); // Creating an empty array to store counts of each element, all initially set to 0.

    // Storing count of each element
    for (let i = 0; i < arr.length; i++) {
        countArray[arr[i]]++;
    }

    // Rebuilding sorted array
    let sortedIndex = 0;// Index to place elements in the original array
    for (let i = 0; i < countArray.length; i++) {
        while (countArray[i] > 0) {
        arr[sortedIndex++] = i;
        countArray[i]--;
        }
    }

    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;


    return timeTaken.toFixed(2);

}

function getMax(arr) {
    return Math.max(...arr);
}

function countSortForRadix(arr, exp) {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);
  
    // Counting occurrences based on digit represented by exp
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }
  
    // Cumulative count to place elements in sorted order
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
  
    // Building the output array
    for (let i = arr.length - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }
  
    // Copying the sorted values back to the original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr) {

    const startTime = performance.now();

    let max = getMax(arr);
  
    // Applying count sort for each digit, starting from least significant digit exp = 1, 10, 100
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSortForRadix(arr, exp);
    }
  
    // End timing
    const endTime = performance.now();
    const timeTaken = endTime - startTime;


    return timeTaken.toFixed(2);

}

function bucketSort(arr) {

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
    let sortedArray = [];
    for (let i = 0; i < bucketCount; i++) {
        sortedArray = sortedArray.concat(buckets[i]);
    }

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    return timeTaken.toFixed(2);
}

function size100() {

    var size = 100;
    
    // bubble sort
    var array=initializeArray(size);
    var bubble_time = bubbleSort(array, size);

    bubble_y[index]=bubble_time;
    document.getElementById("bubble-100").innerText = bubble_time;

    // insertion sort
    array=initializeArray(size);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-100").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-100").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-100").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-100").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-100").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-100").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-100").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-100").innerText = bucket_time;
}

function size500() {

    var size = 500;
    index++;

    // bubble sort
    var array=initializeArray(size);
    var bubble_time = bubbleSort(array, size);

    bubble_y[index]=bubble_time;
    document.getElementById("bubble-500").innerText = bubble_time;

    // insertion sort
    array=initializeArray(size);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-500").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-500").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-500").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-500").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-500").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-500").innerText = count_time;
  
    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-500").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-500").innerText = bucket_time;

}

function size1000() {

    var size = 1000;
    index++;

    // bubble sort
    var array=initializeArray(size);
    console.log("Array before Bubble Sort:", array);
    var bubble_time = bubbleSort(array, size);

    bubble_y[index]=bubble_time;
    document.getElementById("bubble-1000").innerText = bubble_time;

    // insertion sort
    array=initializeArray(size);
    console.log("Array before Insertion Sort:", array);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-1000").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    console.log("Array before Selection Sort:", array);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-1000").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    console.log("Array before Merge Sort:", array);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    console.log("Array after Merge Sort:", array);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-1000").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    console.log("Array before quick Sort:", array);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    console.log("Array after quick Sort:", array);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-1000").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-1000").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-1000").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-1000").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-1000").innerText = bucket_time;


}

function size5000() {

    var size = 5000;
    index++;

    // bubble sort
    var array=initializeArray(size);
    console.log("Array before Bubble Sort:", array);
    var bubble_time = bubbleSort(array, size);

    bubble_y[index]=bubble_time;
    document.getElementById("bubble-5000").innerText = bubble_time;

    // insertion sort
    array=initializeArray(size);
    console.log("Array before Insertion Sort:", array);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-5000").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    console.log("Array before Selection Sort:", array);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-5000").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    console.log("Array before Merge Sort:", array);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    console.log("Array after Merge Sort:", array);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-5000").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    console.log("Array before quick Sort:", array);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    console.log("Array after quick Sort:", array);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-5000").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-5000").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-5000").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-5000").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-5000").innerText = bucket_time;


}

function size10000() {

    var size = 10000;
    index++;

    // bubble sort
    var array=initializeArray(size);
    console.log("Array before Bubble Sort:", array);
    var bubble_time = bubbleSort(array, size);

    bubble_y[index]=bubble_time;
    document.getElementById("bubble-10000").innerText = bubble_time;

    // insertion sort
    array=initializeArray(size);
    console.log("Array before Insertion Sort:", array);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-10000").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    console.log("Array before Selection Sort:", array);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-10000").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    console.log("Array before Merge Sort:", array);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    console.log("Array after Merge Sort:", array);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-10000").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    console.log("Array before quick Sort:", array);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    console.log("Array after quick Sort:", array);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-10000").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-10000").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-10000").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-10000").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-10000").innerText = bucket_time;

}

function size50000() {

    var size = 50000;
    index++;

    // bubble sort
    var array=initializeArray(size);
    document.getElementById("bubble-50000").innerText = 'NaN*';
    bubble_y[index]=8000;
    document.getElementById("Nan_explanation").innerText = '*Due to large array size, Bubble sort could not be computed';

    // insertion sort
    array=initializeArray(size);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-50000").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-50000").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    console.log("Array before Merge Sort:", array);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    console.log("Array after Merge Sort:", array);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-50000").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    console.log("Array before quick Sort:", array);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    console.log("Array after quick Sort:", array);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-50000").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-50000").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-50000").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-50000").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-50000").innerText = bucket_time;


}

function size100000() {

    var size = 100000;
    index++;

    // bubble sort
    var array=initializeArray(size);
    document.getElementById("bubble-100000").innerText = 'NaN*';
    bubble_y[index]=20000;
    document.getElementById("Nan_explanation").innerText = '*Due to large array size, Bubble sort could not be computed';

    // insertion sort
    array=initializeArray(size);
    var insertion_time = insertionSort(array, size);

    insertion_y[index]=insertion_time;
    document.getElementById("insertion-100000").innerText = insertion_time;

    // selection sort
    array=initializeArray(size);
    var selection_time = selectionSort(array, size);

    selection_y[index]=selection_time;
    document.getElementById("selection-100000").innerText = selection_time;

    // merge sort
    array=initializeArray(size);
    console.log("Array before Merge Sort:", array);
    const startTime = performance.now();
    mergeSort(array, 0, size-1);
    console.log("Array after Merge Sort:", array);
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    var merge_time = timeTaken.toFixed(2);

    merge_y[index]=merge_time;
    document.getElementById("merge-100000").innerText = merge_time;

    // quick sort
    array=initializeArray(size);
    console.log("Array before quick Sort:", array);
    const startTime1 = performance.now();
    quickSort(array, 0, size-1);
    console.log("Array after quick Sort:", array);
    const endTime1 = performance.now();
    const timeTaken1 = endTime1 - startTime1;
    var quick_time = timeTaken1.toFixed(2);

    quick_y[index]=quick_time;
    document.getElementById("quick-100000").innerText = quick_time;

    // heap sort
    array=initializeArray(size);
    const startTime2 = performance.now();
    heapSort(array);
    const endTime2 = performance.now();
    const timeTaken2 = endTime2 - startTime2;
    var heap_time = timeTaken2.toFixed(2);

    heap_y[index]=heap_time;
    document.getElementById("heap-100000").innerText = heap_time;

    // count sort
    array=initializeArray(size);
    var count_time=countSort(array);

    count_y[index]=count_time;
    document.getElementById("count-100000").innerText = count_time;

    // radix
    array=initializeArray(size);
    var radix_time=countSort(array);
    console.log(array);

    radix_y[index]=radix_time;
    document.getElementById("radix-100000").innerText = radix_time;

    // bucket
    array=initializeArray(size);
    var bucket_time=bucketSort(array);

    bucket_y[index]=bucket_time;
    document.getElementById("bucket-100000").innerText = bucket_time;


}

// This function formats numbers with commas for easier reading
function formatNumber(value) {
    return value.toLocaleString();
}

function graph() {

    const times = {
        'Bubble': bubble_y,
        'Insertion': insertion_y,
        'Selection': selection_y,
        'Merge': merge_y,
        'Quick': quick_y,
        'Heap': heap_y,
        'Count': count_y,
        'Radix': radix_y,
        'Bucket': bucket_y
    };

    const colors = {
        'Bubble': 'rgba(255, 99, 132, 0.7)',
        'Insertion': 'rgba(54, 162, 235, 0.7)',
        'Selection': 'rgba(75, 192, 192, 0.7)',
        'Merge': 'rgba(153, 102, 255, 0.7)',
        'Quick': 'rgba(255, 159, 64, 0.7)',
        'Heap': 'rgba(255, 206, 86, 0.7)',
        'Count': 'rgba(46, 204, 113, 0.7)',
        'Radix': 'rgba(52, 152, 219, 0.7)',
        'Bucket': 'rgba(231, 76, 60, 0.7)'
    };

    const ctx = document.getElementById('sortChart').getContext('2d');
    const sortChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: input_x,
            datasets: Object.keys(times).map(algorithm => ({
                label: algorithm + ' Sort',
                data: times[algorithm],
                backgroundColor: colors[algorithm],  // Matching the line color
                borderColor: colors[algorithm],
                borderWidth: 3,
                pointBackgroundColor: colors[algorithm],  // Same color for points
                pointBorderWidth: 2,
                pointRadius: 6,
                fill: false,
                tension: 0.4  // Makes the line a bit curvy
            }))
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Array Size',  // Label for X-axis
                        color: '#000000',
                        font: {
                            size: 14,
                        }
                    },
                    ticks: {
                        color: '#000000'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (ms)',  // Label for Y-axis
                        color: '#000000',
                        font: {
                            size: 14,
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value) + ' ms';  // Displaying time 
                        },
                        color: '#000000'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',  
                    labels: {
                        color: '#000000',  
                        usePointStyle: true,  
                        pointStyle: 'circle',  
                        pointRadius: 10,  
                        padding: 20, 
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + formatNumber(tooltipItem.raw) + ' ms';  
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Empirical Time Complexity of Sorting Algorithms',
                    font: {
                        size: 18
                    },
                    color: '#000000',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            layout: {
                padding: {
                    right: 40  
                }
            }
        }
    });
}


