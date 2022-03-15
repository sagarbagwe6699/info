var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')

var values = Array.from({length: window.innerWidth/10}, () => Math.floor(Math.random() * 40));

document.getElementById('count').innerHTML = `Number of elements: ${Math.floor(window.innerWidth/10)}`

function draw(x, end_index){
    var prev = 0
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for(let i=0; i<values.length; i++){
        c.beginPath()
        c.lineWidth = 5
        if(i > end_index){
            c.strokeStyle = "#51ab27"
            c.fillStyle = "#92e86b"
        }
        else if(i == x){
            c.strokeStyle = "#000"
            c.fillStyle = "#555"
        }
        else{
            c.strokeStyle = "#ab3427"
            c.fillStyle = "#f08c81"
        }
        c.rect(prev, (12 * values[i]), 5, window.innerHeight - (12 * values[i]))
        prev = prev + 5 + 5
        c.stroke()
        c.fill()
    }
}

var i = 0
var j = 0

function animate(){
    requestAnimationFrame(animate)
    if(i<values.length){
        if(j>=values.length - i - 1){
            j = 0
            i = i + 1
        }
        else{
            if(values[j] > values[j + 1]){
                let temp = values[j]
                values[j] = values[j + 1]
                values[j + 1] = temp
            }
            j = j + 1
        }
        draw(j, values.length - i - 1)
    }
}

animate()