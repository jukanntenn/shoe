---
layout: docs
title: Installation
description: writing...
group: getting-started
toc: true
---

## CDN via XXX

the easiest way to add Shoe to your project is using CDN. Copy and paste one of the following `<script>`s near the end of your pages, right before the closing </body> tag, to enable them.

### Bundle
`shoe.bundle.js` and `shoe.bundle.min.js` already include Popper for dropdown component.

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```

### Seperate
If you decide to go with the separate scripts solution, Popper must come first (if you’re using tooltips or popovers), and then our JavaScript plugins.

```html
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
```

### Modules

writing...

## Package Managers

### NPM
```
npm install shoe
```

### PNPM
```
pnpm add shoe
```

### Yarn
```
yarn add shoe
```


