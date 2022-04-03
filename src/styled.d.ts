import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    open?: boolean;
    dataOpen?: boolean;
    mastheadBg?: string;
    mastheadColor?: string;
    menuBg?: string;
    menuFg?: string;
    primaryBg?: string;
    primaryColor?: string;
    headingColor?: string;

    math: any;

    circleBg?: string,
    circleColor?: string,

    calendarCurrentBg?: string,
    calendarCloseBg?: string,

    primaryDark?: string,
    primaryLight?: string,
    primaryHover?: string,
    mobile?: string,
  }
}