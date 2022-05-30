import Offcanvas from "./offcanvas";

test("smoke", () => {
  expect(1 + 1).toBe(2);
});

test("getName", () => {
  const offcanvas = new Offcanvas("offcanvas");
  expect(offcanvas.getName()).toBe("offcanvas");
});
