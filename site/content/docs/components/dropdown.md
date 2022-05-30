---
layout: docs
title: Dropdown
description: Toggle list of items displayed as menu.
group: components
toc: true
---

## How it works

When click the trigger, JavaScript toggle dropdown menu's `display` style property between `none` and `block` to control the menu to show or hide.

Note that dropdown is build on [Popper](https://popper.js.org/), which provides dynamic positioning. Make sure to include Popper before shoe or use `shoe.bundle.min.js` / `shoe.min.js` which contains Popper.

## Examples

A simple dropdown triggered by a link.

{{< example >}}
<div class="flex not-prose">
  <a id="dropdownLinkTrigger" data-dropdown-toggle="dropdownNavbar" href="javascript:void(0);" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
  <div id="dropdownMenu" class="hidden absolute z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a>
      </li>
    </ul>
  </div>
</div>
<script>
(function() {
    let linkTrigger = document.getElementById("dropdownLinkTrigger");
    let target = document.getElementById("dropdownMenu");
    new shoe.Dropdown(linkTrigger, target);
})();
</script>

{{< /example >}}

## Placement

To control dropdown menu placement, set `placement` config option to one of `top`, `right`, `bottom`, `left`.

{{< example >}}
<div class="not-prose">
  <button id="dropdownTopButton" data-dropdown-toggle="dropdownTop" data-dropdown-placement="top" class="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown top <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg></button>
  <div id="dropdownTop" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a></li>
      </ul>
  </div>

  <button id="dropdownRightButton" data-dropdown-toggle="dropdownRight" data-dropdown-placement="right" class="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown right <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button>
  <div id="dropdownRight" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRightButton">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a></li>
      </ul>
  </div>

  <button id="dropdownBottomButton" data-dropdown-toggle="dropdownBottom" data-dropdown-placement="bottom" class="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown bottom <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
  <div id="dropdownBottom" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBottomButton">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a></li>
      </ul>
  </div>

  <button id="dropdownLeftButton" data-dropdown-toggle="dropdownLeft" data-dropdown-placement="left" class="mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Dropdown left</button>
  <div id="dropdownLeft" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLeftButton">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a></li>
      </ul>
  </div>
</div>

<script>
(function() {
    const topTrigger = document.getElementById("dropdownTopButton");
    const topTarget = document.getElementById("dropdownTop");
    const topDropdown = new shoe.Dropdown(topTrigger, topTarget, {placement: "top"});

    const rightTrigger = document.getElementById("dropdownRightButton");
    const rightTarget = document.getElementById("dropdownRight");
    const rightDropdown = new shoe.Dropdown(rightTrigger, rightTarget, {placement: "right"});

    const bottomTrigger = document.getElementById("dropdownBottomButton");
    const bottomTarget = document.getElementById("dropdownBottom");
    const bottomDropdown = new shoe.Dropdown(bottomTrigger, bottomTarget, {placement: "bottom"});

    const leftTrigger = document.getElementById("dropdownLeftButton");
    const leftTarget = document.getElementById("dropdownLeft");
    const leftDropdown = new shoe.Dropdown(leftTrigger, leftTarget, {placement: "left"});
})();
</script>
{{< /example >}}

## Config
| Name      | Type                                   | Default  | Description                         |
| --------- | -------------------------------------- | -------- | ----------------------------------- |
| placement | "top" \| "right" \| "bottom" \| "left" | "bottom" | Control the dropdown menu placement |

## Methods
| Method | Description                               |
| ------ | ----------------------------------------- |
| toggle | Toggle a dropdown menu to shown or hidden |
| show   | Show a dropdown menu                      |
| hide   | Hide a dropdown menu                      |
