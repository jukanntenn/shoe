---
layout: docs
title: Offcanvas
description: Build hidden sidebars.
group: components
toc: true
---

## How it works

Offcanvas act as a sidebar component that can be toggled via JavaScript. It can appears from any edge of the viewport. Any html element can be used as a trigger to toggle the attached offcanvas. When click the trigger, JavaScript toggle the offcanvas's `translate` style property between it's original value and `none` behind the scene. So it is important to set offcanvas's initial state properly.

## Examples

Examples in this page use [Tailwindcss](https://tailwindcss.com/) to apply styles.

{{< example >}}
<button id="button-trigger" class="bg-blue-500 text-white p-2 rounded-md text-sm mr-2">button trigger</button>
<a id="link-trigger" class="text-blue-500" href="#">link trigger</a>
<div id="offcanvas-example" class="-translate-x-full bg-white fixed inset-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100"></div>

<script>
(function() {
    const offcanvas = new shoe.Offcanvas(document.getElementById("offcanvas-example"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    const buttonTrigger = document.getElementById("button-trigger");
    const linkTrigger = document.getElementById("link-trigger");
    buttonTrigger.addEventListener("click", function(){offcanvas.toggle()});
    linkTrigger.addEventListener("click", function(e){e.preventDefault();offcanvas.toggle()});
})();
</script>

{{< /example >}}

## Backdrop

While offcanvas is open, a backdrop is created and appended to `document.body`. There is no class applys to the backdrop. You can set the backdrop class name via `backdropClassName` config option when instantiating the offcanvas instance. To prevent backdrop from creating, sets the `backdrop` config option to `false`.

{{< example >}}
<button id="gray-backdrop-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">gray backdrop</button>
<button id="transparent-backdrop-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">transparent backdrop</button>
<button id="none-backdrop-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">no backdrop</button>
<div id="gray-backdrop-offcanvas" class="-translate-x-full bg-white fixed inset-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100"></div>
<div id="transparent-backdrop-offcanvas" class="-translate-x-full bg-white fixed inset-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100"></div>
<div id="none-backdrop-offcanvas" class="-translate-x-full bg-white fixed inset-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100">
<button id="close-btn" class="p-3 m-5 text-black float-right">X</button>
</div>

<script>
(function() {
    const grayBackdropOffcanvas = new shoe.Offcanvas(document.getElementById("gray-backdrop-offcanvas"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    const grayBackdropTrigger = document.getElementById("gray-backdrop-trigger");
    grayBackdropTrigger.addEventListener("click", function(){grayBackdropOffcanvas.toggle()});

    const transparentBackdropOffcanvas = new shoe.Offcanvas(document.getElementById("transparent-backdrop-offcanvas"), {
      backdropClassName: "fixed inset-0 z-[700]"
    });
    const transparentBackdropTrigger = document.getElementById("transparent-backdrop-trigger");
    transparentBackdropTrigger.addEventListener("click", function(){transparentBackdropOffcanvas.toggle()});

    const noneBackdropOffcanvas = new shoe.Offcanvas(document.getElementById("none-backdrop-offcanvas"), {backdrop: false});
    const noneBackdropTrigger = document.getElementById("none-backdrop-trigger");
    noneBackdropTrigger.addEventListener("click", function(){noneBackdropOffcanvas.toggle()});
    document.getElementById("close-btn").addEventListener("click", function(){noneBackdropOffcanvas.toggle()});
})();
</script>
{{< /example >}}

## Placement

Setting `translate` style property to control the offcanvas initial placement, then the plugin handle all of the other things.

{{< example >}}
<button id="left-offcanvas-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">toggle left</button>
<button id="right-offcanvas-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">toggle right</button>
<button id="top-offcanvas-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">toggle top</button>
<button id="bottom-offcanvas-trigger" class="bg-blue-500 text-white p-2 mr-2 rounded-md text-sm">toggle bottom</button>
<div id="left-offcanvas" class="-translate-x-full bg-white fixed inset-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100"></div>
<div id="right-offcanvas" class="translate-x-full bg-white fixed inset-y-0 right-0 duration-300 z-[900] shadow w-2/3 md:w-1/5 min-h-screen opacity-100"></div>
<div id="top-offcanvas" class="-translate-y-full bg-white fixed inset-x-0 top-0 duration-300 z-[900] shadow h-2/3 md:h-1/5 min-w-screen opacity-100"></div>
<div id="bottom-offcanvas" class="translate-y-full bg-white fixed inset-x-0 bottom-0 duration-300 z-[900] shadow h-2/3 md:h-1/5 min-w-screen opacity-100"></div>

<script>
(function() {
    const leftOffcanvas = new shoe.Offcanvas(document.getElementById("left-offcanvas"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    document.getElementById("left-offcanvas-trigger").addEventListener("click", function(){leftOffcanvas.toggle()});

    const rightOffcanvas = new shoe.Offcanvas(document.getElementById("right-offcanvas"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    document.getElementById("right-offcanvas-trigger").addEventListener("click", function(){rightOffcanvas.toggle()});

    const topOffcanvas = new shoe.Offcanvas(document.getElementById("top-offcanvas"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    document.getElementById("top-offcanvas-trigger").addEventListener("click", function(){topOffcanvas.toggle()});

    const bottomOffcanvas = new shoe.Offcanvas(document.getElementById("bottom-offcanvas"), {
      backdropClassName: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[700]",
    });
    document.getElementById("bottom-offcanvas-trigger").addEventListener("click", function(){bottomOffcanvas.toggle()});
})();
</script>

{{< /example >}}

## Config
| Name              | Type               | Default  | Description                                           |
| ----------------- | ------------------ | -------- | ----------------------------------------------------- |
| backdrop          | boolean            | true     | Whether to create a backdrop while offcanvas is open. |
| backdropClassName | undefind \| string | undefind | Class name applys to backdrop.                        |

## Methods
| Method | Description                                      |
| ------ | ------------------------------------------------ |
| toggle | Toggles an offcanvas to shown or hidden. |
| show   | Shows an offcanvas                               |
| hide   | Hides an offcanvas                               |
