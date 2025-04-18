/*
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    aria-hidden="true" 
    role="img" 
    class="iconify iconify--logos" 
    width="256" height="256" 
    preserveAspectRatio="xMidYMid meet" 
    viewBox="0 0 200 200"
>
  <path
    stroke="black"
    stroke-width="4"
    fill="purple"
    d="M 90 0 L 200 100 L 90 200 L 92 160 L 145 115 L 10 115 L 10 85 L 145 85 L 90 30 Z"
    />
<svg/>

<svg
  height="90"
  width="90"
  viewbox="0 0 20 20"
>
  <path
    fill="purple"
    stroke="black"
    stroke-width="1"
    d="M 0 0 L 20 0 L 20 10 L 18 10 L 16 12 L 14 10 L 0 10 Z"
  >
    
  </path>
</svg>
<!-- <svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    aria-hidden="true" 
    role="img" 
    class="iconify iconify--logos" 
    width="256" height="256" 
    preserveAspectRatio="xMidYMid meet" 
    viewBox="0 0 256 257"
>
  <path
    stroke="black"
    stroke-width="4"
    fill="purple"
    d="M 125 0 L 256 125 L 125 256 L 125 220 L 200 140 L 0 140 L 0 110 L 200 110 L 125 40 Z"
<svg/> -->

////////////////////////////////

<svg
  heigth="80"
  width="80"
  viewbox="0 0 40 40"
>
  <g>
    <circle cx="20" cy="20" r="19" stroke="green" stroke-width="1" fill="none" class="circulo">
    </circle>
    <line x1="10" y1="20" x2="18" y2="28" stroke="green" stroke-wigdh="1" />
    <line x1="18" y1="28" x2="32" y2="12" stroke="green" stroke-width="1" />
  </g>
</svg>
<svg
  heigth="80"
  width="80"
  viewbox="0 0 40 40"
>
  <path stroke="blue" fill="none" stroke-width="1"
    d="M 0 20 A 9 9 0 1 1 40 20 M 0 20 A 9 9 0 0 0 40 20"
    class="hola"
  >
  </path>
  <g class="hola2">
    <line x1="10" y1="20" x2="18" y2="28" stroke-wigdh="1" />
    <line x1="18" y1="28" x2="32" y2="12" stroke-width="1" />
  </g>
</svg>

.circulo {
  animation: spin 3s infinite ease-in-out;
}

.hola {
  animation: spin 3s forwards ease-in;
}

.hola2 {
  animation: check 3s forwards ease-in-out;
}

@keyframes spin {
  from {
    fill: whitesmoke;
    stroke-width:1;
  }
  to {
    fill: green;
    stroke-width:2;
  }
}

@keyframes check {
  from {
    stroke: green;
  }
  to {
    stroke: white;
  }
}

//////////////// Icons TEst

<svg height="150" width="150" viewbox="-2 -2 45 45">
  <polygon points="20,2 40,40 0,40 20,2 " stroke="orange" fill="none" id="triangle"/>
  <g stroke="purple" fill="none" id="excla">
    <!-- <rect x="19" y="10" width="2" height="20" ry="2" rx="0" stroke="purple" /> -->
    <path d="M 18 14 C 18 8, 22 8, 22 14 M 18 13 L 21 30 M 21 30 L 22 13" id="test" fill="blue"/>
    <circle cx=21 cy=34 r=2 />
  </g>
</svg>

<svg height="150" width="150" viewbox="-2 -2 45 45">
  <circle cx="20" cy="20" r="20" stroke="red" fill="none" stroke-width="1">

  </circle>
  <g stroke="purple" stroke-width="2">
    <path
      d="M 10 10 L 30 32 M 30 10 L 10 32"
    />
    <!-- <line x1="0" y1="0" x2="10" y2="10" rx="1" ry="1" /> -->
  </g>
</svg>

<svg
    height="150"
    width="150"
    viewbox="-2 -2 45 45"
    className="CompleteLoader"
>
    <g className="circleGroup">
        <circle cx="20" cy="20" r="20" stroke="#01ff01" strokeWidth="2" fill="none" />
    </g>
    <g className="checkGroup">
        <line x1="10" y1="20" x2="18" y2="28" stroke="#01ff01" strokeWidth="2" />
        <line x1="18" y1="28" x2="32" y2="12" stroke="#01ff01" strokeWidth="2" />
    </g>
</svg>
#triangle {
  stroke-dasharray: 10 40;
  animation: fillTriangle5 2s infinite linear;
}

#excla {
  animation: fillExcla 2s infinite linear;
}

@keyframes fillExcla {
  from {
    stroke - dasharray: 3 5;
  }to {
    stroke - dasharray: 20 5;
  }
}
@keyframes fillTriangle {
  from {
    stroke - dasharray: 40;
  }
  to {
    stroke - dasharray: 80 120;
  }
}

@keyframes fillTriangle2 {
  0 % {
    stroke- dasharray: 10;
}
25 % { stroke- dasharray: 40;}
50 % {
  stroke- dasharray: 80;
  }
75 % { stroke- dasharray: 120;}
100 % {
  stroke- dasharray: 150;
  }
}

@keyframes fillTriangle3 {
  0 % {
    stroke- dasharray: 20;
}
100 % {
  stroke- dasharray: 150;
  }
}

@keyframes fillTriangle4 {
  from {
    stroke - dasharray: 5 0;
  }
  to {
    stroke - dasharray: 5;
  }
}

@keyframes fillTriangle5 {
  0 % {
    stroke- dasharray: 10 40;
}
100 % {
  stroke- dasharray: 150 40;
  }
}

*/