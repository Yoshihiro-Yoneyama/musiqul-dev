// polished（Storybook 8 の推移的依存）の型を直接 import していたため、同じ形の型をローカルに定義する
export type LinearGradientConfiguration = {
  readonly colorStops: string[];
  readonly toDirection?: string;
};

export function linearGradient({
                          colorStops,
                          toDirection,
                        }: LinearGradientConfiguration): string {
  return `linear-gradient(${toDirection}, ${colorStops.join(', ')})`;
}
