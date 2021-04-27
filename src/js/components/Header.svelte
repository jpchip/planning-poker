<!-- App.svelte -->
<script lang='typescript'>
    let darkMode = false;
    import { onMount } from 'svelte';

    onMount(async () => {
		const darkThemeSelected =
            localStorage.getItem("darkSwitch") !== null &&
            localStorage.getItem("darkSwitch") === "dark";
        darkMode = darkThemeSelected;
        darkThemeSelected
            ? document.body.setAttribute("data-theme", "dark")
            : document.body.removeAttribute("data-theme");
	});
    
    function handleChange () {
        if (darkMode) {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("darkSwitch", "dark");
        } else {
            document.body.removeAttribute("data-theme");
            localStorage.removeItem("darkSwitch");
        }
    }
  </script>
    <style>
        /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}
    </style>
  
  <nav class="navbar fixed-top navbar-light bg-light">
    <div class="container-fluid">
      <span class="siteTitle">Planning Poker</span>
      <label class="switch">
        <input type="checkbox" bind:checked={darkMode} on:change={handleChange}>
        <span class="slider round"></span>
      </label>
    </div>
  </nav>
  
 