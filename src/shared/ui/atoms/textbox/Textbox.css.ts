import {style} from '@vanilla-extract/css';
import color from "@/shared/themes/colors"
import {fontSizes} from "@/shared/themes/fontSizes";

export const inputStyles = {
  default: style({
    fontSize: fontSizes.m,
    borderRadius: "4px",
    border: "none",
    width: "280px",
    height: "40px",
    backgroundColor: "#1F1F1F",
  }),
  hover: style({
    backgroundColor: "rgba(31, 31, 31, 0.7)",
  }),
  focused: style({
    backgroundColor: "rgba(31, 31, 31, 0.7)",
    border: "1px solid #FFFFFF",
    color: color.white,
  }),
  active: style({
    color: color.white,
  }),
  disabled: style({
    backgroundColor: "rgba(31, 31, 31, 0.4)",
    cursor: "not-allowed",
  })
}