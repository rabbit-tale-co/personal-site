import { useMemo } from 'react';
import chroma from 'chroma-js';

function useColorShades(baseColor: string) {
  const color = chroma(baseColor);

  const shades = useMemo(() => {
    return {
      50: chroma.mix(baseColor, '#ffffff', 0.9).hex(),
      100: chroma.mix(baseColor, '#ffffff', 0.8).hex(),
      200: chroma.mix(baseColor, '#ffffff', 0.7).hex(),
      300: chroma.mix(baseColor, '#ffffff', 0.6).hex(),
      400: chroma.mix(baseColor, '#ffffff', 0.5).hex(),
      500: chroma.mix(baseColor, '#ffffff', 0.4).hex(),
      600: chroma.mix(baseColor, '#ffffff', 0.3).hex(),
      700: chroma.mix(baseColor, '#ffffff', 0.2).hex(),
      800: chroma.mix(baseColor, '#ffffff', 0.1).hex(),
      900: baseColor,
      950: chroma.mix(baseColor, '#000000', 0.4).hex(),
    }
  }, [baseColor])

  return shades
}

export default useColorShades;