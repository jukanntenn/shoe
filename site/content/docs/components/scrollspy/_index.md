---
layout: docs
title: Scrollspy
description: Spying on elements in a scrollable container, automatically highlights their related targets based on scroll position to indicate which element is currently active in the viewport.
group: components
toc: true
---

## How it works

Scrollspy spys on elements in a scrollable container and calculate the position of the "spied" elements to determine if a certain element is scrolled into view. If it is, the configured classname will be added to it's related target element. To make scrollspy work properly, you have to instantiate a `Scrollspy` instance with three parameters.

1. An array of target elements you want to highlight when the "spied" element is scrolled into view. The `id` of "spied" element must be referenced by target element via `href` attribute. If the natural structure of target elements is a tree, you must construct a nested array to represent the tree before passing it to `Scrollspy` instance.
2. "Spied" container, either `document.body` or user specified element.
3. A config object, see config section bellow for more details.

## Examples

### Spy on document.body

Check the <a href="{{< ref "demo1" >}}" target="_blank">live demo</a>.

In this example, headings of the article are "spied" elements, and anchors in the table of content are target elements, and the scrollable container is `document.body`. What we want is whenever a heading is scrolled into view, highlighting it's related item in the table of content. The JavaScript code is like bellow:

```javascript
(function () {
  function appendChildren(root, children) {
    return [].filter
      .call(root.children, (el) => el.nodeName === "LI")
      .forEach((liElem) => {
        const aElem = liElem.querySelector(":scope > a");
        // push the anchor element to target elements array
        children.push(aElem);
        const ulElem = liElem.querySelector(":scope > ul");
        // find anchors and push to target elements array recursively
        if (ulElem) {
          const nextElements = [];
          children.push(nextElements);
          appendChildren(ulElem, nextElements);
        }
      });
  }
  // target elements array
  const tree = [];
  appendChildren(document.getElementById("menu"), tree);
  // tree is a nested array represents the tree structure of all anchors like this:
  // [item1, [item1.1, item1.2, [item1.2.1, item1.2.2]], item2, item3...]
  // the plain item in the target elements array represents a tree node, and the array item represents subtree of it's previous item.
  new shoe.Scrollspy(tree, document.body, {
    activeClassName: "text-red-500",
  });
})();
```

### Spy on scrollable container

Scrollspy can also spys on user specified scrollable container instead of `document.body`.

{{< example >}}
<div class="flex">
    <div class="basis-1/4">
        <ul id="menu">
            <li><a href="#item-1">item1</a></li>
            <li>
                <a href="#item-2">item2</a>
                <ul>
                    <li>
                        <a href="#item-2-1">item2-1</a>
                    </li>
                    <li>
                        <a href="#item-2-2">item2-2</a>
                    </li>
                </ul>
            </li>
            <li><a href="#item-3">item3</a></li>
            <li><a href="#item-4">item4</a></li>
        </ul>
    </div>
    <div class="basis-3/4 h-52 overflow-y-scroll relative" id="article">
        <h4 id="item-1">Item 1</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
        <h4 id="item-2">Item 2</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
        <h4 id="item-2-1">Item 2-1</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
        <h4 id="item-2-2">Item 2-2</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
        <h4 id="item-3">Item 3</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
        <h4 id="item-4">Item 4</h4>
        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    </div>
</div>

<script>
(function () {
  function appendChildren(root, children) {
    return [].filter
      .call(root.children, (el) => el.nodeName === "LI")
      .forEach((liElem) => {
        const aElem = liElem.querySelector(":scope > a");
        children.push(aElem);
        const ulElem = liElem.querySelector(":scope > ul");
        if (ulElem) {
          const nextElements = [];
          children.push(nextElements);
          appendChildren(ulElem, nextElements);
        }
      });
  }
  const tree = [];
  appendChildren(document.getElementById("menu"), tree);
  new shoe.Scrollspy(tree, document.getElementById("article"), {
    activeClassName: "text-red-500",
  });
})();
</script>
{{< /example >}}

## Config
| Name            | Type               | Default  | Description                                                                    |
| --------------- | ------------------ | -------- | ------------------------------------------------------------------------------ |
| activeClassName | undefind \| string | undefind | Classes add to target element when it's referenced element scrolled into view. |

## Methods
| Method  | Description                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| refresh | Refresh the state. If the structure of target elements changed, this method must be called with the updated target elements array. |

