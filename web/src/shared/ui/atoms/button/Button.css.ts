import {style} from '@vanilla-extract/css';
import {linearGradient} from '@/shared/ui/util/linearGradient';
import {color} from "@/shared/themes/color.css";

export const baseStyle = style({
  width: '240px',
  minWidth: '200px',
  height: '56px',
  textAlign: 'center',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    opacity: '.7',
  },
  border: 'none',
  boxShadow: '-4px 7px 5px #000000',
  whiteSpace: 'nowrap',
});

export const appearances = {
  primary: style({
    background: linearGradient(
      {
        colorStops: [
          color.linerGradientBlue,
          color.linerGradientRed,
        ],
        toDirection: 'to right',
      }
    ),
    color: color.white,
    borderRadius: '30px',
  }),
};
