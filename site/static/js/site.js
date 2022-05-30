(function () {
  // theme
  const themeSwitch = document.getElementById("themeSwitch");
  const themeCases = document.getElementById("themeCases");
  const themeDropdown = new shoe.Dropdown(themeSwitch, themeCases);

  const activateThemeCase = (theme) => {
    Object.keys(themeConfig).forEach((key) => {
      const themeCase = document.getElementById(themeConfig[key].selector);
      const paths = [...themeCase.getElementsByTagName("path")];
      if (key === theme) {
        themeCase.classList.add("text-sky-500");
        paths.forEach((el, idx) => {
          el.classList.remove(
            ...themeConfig[key].defaultClassName[idx].split(" ")
          );
          el.classList.add(...themeConfig[key].activeClassName[idx].split(" "));
        });
      } else {
        themeCase.classList.remove("text-sky-500");
        paths.forEach((el, idx) => {
          el.classList.remove(
            ...themeConfig[key].activeClassName[idx].split(" ")
          );
          el.classList.add(
            ...themeConfig[key].defaultClassName[idx].split(" ")
          );
        });
      }
    });
  };

  activateThemeCase(currTheme);

  Object.keys(themeConfig).forEach((key) => {
    const themeCase = document.getElementById(themeConfig[key].selector);
    themeCase.addEventListener("click", () => {
      currTheme = key;
      localStorage.theme = currTheme;
      activateThemeCase(currTheme);
      themeDropdown.hide();
      useTheme(currTheme);
    });
  });

  // sidebar
  const sidebar = new shoe.Offcanvas(document.getElementById("sidebar"), {
    backdropClassName:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-10",
  });
  const sidebarTrigger = document.getElementById("sidebar-trigger");
  sidebarTrigger.addEventListener("click", function () {
    sidebar.toggle();
  });

  // table of content
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
  const tocElem = document.getElementById("TableOfContents");
  if (tocElem) {
    appendChildren(tocElem.querySelector(":scope > ul"), tree);
    new shoe.Scrollspy(tree, document.body, {
      activeClassName: "active",
    });
  }
})();
