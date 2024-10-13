import {style, styleVariants} from "@vanilla-extract/css";
import {linearGradient} from "@/utils/linear-gradient/linearGradient";


const buttonBase = style({
  width: "240px",
  minWidth: "200px",
  height: "56px",
  textAlign: "center",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  ":hover": {
    opacity: ".7",
  },
  border: "none",
  boxShadow: "-4px 7px 5px #000000",
  whiteSpace: "nowrap",
});

const buttonVariants = styleVariants({
  default: {
    background: linearGradient(
      {
        colorStops: ["#173673", "#BF2A37"],
        toDirection: "to right",
      }
    ),
    color: "#FFF",
    borderRadius: "30px",
  },
  success: {
    background: "#28a745",
    color: "#FFF",
    borderImage: linearGradient(
      {
        colorStops: ['#FFF', '#000'],
        toDirection: 'to left',
      }
    ),
  },
  danger: {
    background: linearGradient(
      {
        colorStops: ['#ff7e5f', '#feb47b'],
        toDirection: 'to right',
      }
    ),
    color: "#FFF",
    borderImage: linearGradient(
      {
        colorStops: ['#FFF', '#000'],
        toDirection: 'to right',
      }
    ),
  },
});

export {buttonBase, buttonVariants}