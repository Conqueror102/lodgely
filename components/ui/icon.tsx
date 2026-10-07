import type { CSSProperties } from "react";

/** Locally hosted Icons8 iOS icons. Credit is included in the site footer. */
export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const style: CSSProperties = {
    display: "inline-block", width: size, height: size, flexShrink: 0,
    verticalAlign: "middle", backgroundColor: "currentColor",
    maskImage: `url('/icons8/${name}.png')`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
    WebkitMaskImage: `url('/icons8/${name}.png')`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
  };
  return <span style={style} aria-hidden="true" />;
}
