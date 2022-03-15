var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth - 80
canvas.height = window.innerHeight - 80
var c = canvas.getContext('2d')

var values = Array.from({length: (window.innerWidth - 80)/2}, () => Math.floor(Math.random() * 500));

document.getElementById('count').innerHTML = `Number of elements: ${Math.floor((window.innerWidth - 80)/4)}`

function draw(end_index){
    var prev = 0
    c.clearRect(0, 0, window.innerWidth - 80, window.innerHeight - 80)
    for(let i=0; i<values.length; i++){
        c.beginPath()
        c.lineWidth = 1
        if(i >= end_index){
            c.strokeStyle = "#51ab27"
            c.fillStyle = "#92e86b"
        }
        else{
            c.strokeStyle = "#ab3427"
            c.fillStyle = "#f08c81"
        }
        c.rect(prev, values[i], 1, window.innerHeight - 80 - values[i])
        prev = prev + 1 + 1
        c.stroke()
        c.fill()
    }
}

function sort(arr){
    var n = arr.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i)
{
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

var n = values.length;

draw()

sort(values);
// setTimeout(() => {
//     values = values.sort()
//     draw()
// }, 5000)
// values = values.sort()

var i = n - 1

function animate(){
    requestAnimationFrame(animate)
    if(i > 0){
        var temp = values[0];
        values[0] = values[i];
        values[i] = temp;
        heapify(values, i, 0);
        draw(i)
        i = i - 1
    }
    else{
        draw(0)
    }
    // One by one extract an element from heap
    // for (var i = n - 1; i > 0; i--) {
    //     // Move current root to end
    //     var temp = arr[0];
    //     arr[0] = arr[i];
    //     arr[i] = temp;

    //     // call max heapify on the reduced heap
    //     heapify(arr, i, 0);
    // }
}

animate()