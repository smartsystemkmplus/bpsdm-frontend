import color from '@constants/color';
import {
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
  Tooltip,
  VariantColorsResolver,
} from '@mantine/core';

/**
 * Responsible for customizing the variant colors of the components.
 *
 * - The `input` parameter is an object that contains the following properties:
 *  - `variant` (string): The variant of the component.
 *  - `color` (DefaultMantineColor): The color of the component.
 *  - `theme` (MantineTheme): The theme of the component.
 *  - `autoContrast` (boolean): A boolean value that indicates whether the component should have an auto contrast.
 *  - `gradient` (MantineGradient): The gradient of the component.
 *
 * Full documentation: https://mantine.dev/styles/variants-sizes/
 */

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (input.variant === 'primary') {
    return {
      background: color.primary.main,
      hover: color.primary.hover,
      color: color.base.white,
      border: 'none',
    };
  }

  // Add 'light-border' variant to Mantine's components
  if (input.variant === 'light-border') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `${rem(1)} solid ${rgba(parsedColor.value, 0.4)}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  variantColorResolver,
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'IBM Plex Sans, sans-serif' },
  colors: {
    primary: [
      '#CBEBFF',
      '#88D2FF',
      '#4EBCFF',
      '#1CA9FF',
      '#0096F9',
      '#0080D3',
      '#014780',
      '#005B96',
      '#004C7D',
      '#003F68',
    ],
  },
  primaryColor: 'primary',
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
      },
    }),
  },
});

export default theme;
