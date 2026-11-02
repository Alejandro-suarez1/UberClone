import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

export const fontAssets = {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
};

export const fonts = {
  display: 'SpaceGrotesk_700Bold',
  heading: 'SpaceGrotesk_600SemiBold',
  numeric: 'SpaceGrotesk_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodyBold: 'Inter_600SemiBold',
};

export const typography = {
  hero:     { fontFamily: fonts.display,    fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  title:    { fontFamily: fonts.display,    fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  heading:  { fontFamily: fonts.heading,    fontSize: 20, lineHeight: 26 },
  subtitle: { fontFamily: fonts.bodyMedium, fontSize: 16, lineHeight: 22 },
  body:     { fontFamily: fonts.body,       fontSize: 14, lineHeight: 20 },
  caption:  { fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  label:    { fontFamily: fonts.bodyBold,   fontSize: 11, lineHeight: 14, letterSpacing: 1.2, textTransform: 'uppercase' },
  money:    { fontFamily: fonts.numeric,    fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  button:   { fontFamily: fonts.heading,    fontSize: 16, lineHeight: 20, letterSpacing: 0.3 },
};