import { style } from "@vanilla-extract/css";

export const container = style({
  padding: 20,
  backgroundColor: "pink",
  fontSize: 50,
  color: "#fff",
});

export const BodyContainer = style({
  backgroundColor: "#000000"
})

export const FlexContainer = style({
  display: "flex",
  height: "100vh"
});

export const SideMenuContainer = style({
  width: "250px",
  padding: "20px"
})

export const ChildrenContainer = style({
  flex: "1",
  color: "#ffffff",
  padding: "100px"
})

