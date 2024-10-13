import {LinearGradientConfiguration} from "polished/lib/types/linearGradientConfiguration";

export function linearGradient({
                          colorStops,
                          toDirection,
                        }: LinearGradientConfiguration): string {
  return `linear-gradient(${toDirection}, ${colorStops.join(', ')})`;
}
