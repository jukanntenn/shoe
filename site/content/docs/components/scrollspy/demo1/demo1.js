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
  new shoe.Scrollspy(tree, document.body, {
    activeClassName: "text-red-500",
  });
})();
