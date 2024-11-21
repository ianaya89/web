/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  theme: {
    extend: {
      /*
      |-----------------------------------------------------------------------------
      | Colors                                  https://tailwindcss.com/docs/colors
      |-----------------------------------------------------------------------------
      |
      | The color palette defined above is also assigned to the "colors" key of
      | your Tailwind config. This makes it easy to access them in your CSS
      | using Tailwind's theme helper. For example:
      |
      | .error { color: theme('colors.red') }
      |
      */

      colors: {
        transparent: 'rgba(0,0,0,0)',

        'landing-vertical-line': 'rgba(255,255,255,.75)',
        'light-line': 'rgba(255,255,255,.25)',

        'column-chart': '#ff553f',
        'pie-chart': {
          0: '#FF331A',
          1: '#FF8071',
          2: '#FCADA2',
          3: '#F7C5C1',
          4: '#FAE2DD',
          5: '#FAEEED',
          6: '#fff2f1'
        },

        gold: '#D2C175',
        yellow: '#FFC107',

        'grey-d1': '#404040',
        grey: '#797979',
        'grey-l1': '#A9A9A9',
        'grey-l2': '#D2D5DD',
        'grey-l3': '#D4D4D4',
        'grey-l4': '#F2F2F2',
        'grey-l5': '#fafafa',

        'red-d1': '#DB311B',
        red: '#FF553F',
        'red-l1': 'rgba(255,85,63,0.75)',
        'red-l2': 'rgba(255,85,63,0.6)',
        'red-l3': 'rgba(255,85,63,0.5)',
        'red-l4': 'rgba(255,85,63,0.33)',
        'red-l5': 'rgba(255,85,63,0.2)',
        'red-l6': 'rgba(254,232,231)',

        'green-d1': '#158463',
        green: '#21CE99',
        'green-l1': 'rgba(33,206,153,0.75)',
        'green-l2': 'rgba(33,206,153,0.6)',
        'green-l3': 'rgba(33,206,153,0.5)',
        'green-l4': 'rgba(33,206,153,0.33)',
        'green-l5': 'rgba(33,206,153,0.2)',

        'blue-d1': '#007EA8',
        blue: '#20C9FF',
        'blue-l1': 'rgba(32,201,255,0.75)',
        'blue-l2': 'rgba(32,201,255,0.6)',
        'blue-l3': 'rgba(32,201,255,0.5)',
        'blue-l4': 'rgba(32,201,255,0.33)',
        'blue-l5': 'rgba(32,201,255,0.2)'
      },

      /*
      |-----------------------------------------------------------------------------
      | Screens                      https://tailwindcss.com/docs/responsive-design
      |-----------------------------------------------------------------------------
      |
      | Screens in Tailwind are translated to CSS media queries. They define the
      | responsive breakpoints for your project. By default Tailwind takes a
      | "mobile first" approach, where each screen size represents a minimum
      | viewport width. Feel free to have as few or as many screens as you
      | want, naming them in whatever way you'd prefer for your project.
      |
      | Tailwind also allows for more complex screen definitions, which can be
      | useful in certain situations. Be sure to see the full responsive
      | documentation for a complete list of options.
      |
      | Class name: .{screen}:{utility}
      |
      */

      screens: {
        xxl: '1600px'
      },

      inset: {
        full: '100%',
        '8': '2rem'
      },

      'z-index': {
        100: 100
      },

      /*
      |-----------------------------------------------------------------------------
      | Fonts                                    https://tailwindcss.com/docs/fonts
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your project's font stack, or font families.
      | Keep in mind that Tailwind doesn't actually load any fonts for you.
      | If you're using custom fonts you'll need to import them prior to
      | defining them here.
      |
      | By default we provide a native font stack that works remarkably well on
      | any device or OS you're using, since it just uses the default fonts
      | provided by the platform.
      |
      | Class name: .font-{name}
      |
      */

      fontFamily: {
        sans: [
          'Akrobat',
          'system-ui',
          'BlinkMacSystemFont',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        serif: [
          'Source Sans Pro',
          'Constantia',
          'Lucida Bright',
          'Lucidabright',
          'Lucida Serif',
          'Lucida',
          'DejaVu Serif',
          'Bitstream Vera Serif',
          'Liberation Serif',
          'Georgia',
          'serif'
        ],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
        icon: ['"Font Awesome 5 Free"']
      },

      /*
      |-----------------------------------------------------------------------------
      | Text sizes                         https://tailwindcss.com/docs/text-sizing
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your text sizes. Name these in whatever way
      | makes the most sense to you. We use size names by default, but
      | you're welcome to use a numeric scale or even something else
      | entirely.
      |
      | By default Tailwind uses the "rem" unit type for most measurements.
      | This allows you to set a root font size which all other sizes are
      | then based on. That said, you are free to use whatever units you
      | prefer, be it rems, ems, pixels or other.
      |
      | Class name: .text-{size}
      |
      */

      fontSize: {
        p6: '0.5rem', // 11px
        p5: '0.75rem', // 12px
        p4: '0.8125rem', // 13px
        p3: '0.875rem', // 14px
        p2: '0.9375rem', // 15px
        p1: '1.3125rem', // 21px
        menu: '1rem', // 16px
        h7: '1.125rem', // 18px
        h6: '1.25rem', // 20px
        h5: '1.375rem', // 22px
        h4: '1.5rem', // 24px
        h3: '2rem', // 32px
        h2: '3rem', // 48px
        h1: '4.375rem' // 70px
      },

      /*
      |-----------------------------------------------------------------------------
      | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your letter spacing values, or as we call
      | them in Tailwind, tracking.
      |
      | Class name: .tracking-{size}
      |
      */

      letterSpacing: {
        tight: '-0.05em',
        extrawide: '0.05em'
      },

      /*
      |-----------------------------------------------------------------------------
      | Border widths                     https://tailwindcss.com/docs/border-width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your border widths. Take note that border
      | widths require a special "default" value set as well. This is the
      | width that will be used when you do not specify a border width.
      |
      | Class name: .border{-side?}{-width?}
      |
      */

      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '40': '2.5rem'
      },

      spacing: {
        auto: 'auto',
        px: '1px',
        '2px': '2px',
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '18': '-4.5rem',
        '20': '5rem',
        '22': '5.5rem',
        '24': '6rem',
        '32': '8rem',
        '33': '9rem',
        '34': '9.5rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem', // 320px
        '96': '24rem',
        '120': '30rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem',
        '1/3': '33%',
        '1/4': '25%'
      },

      /*
      |-----------------------------------------------------------------------------
      | Width                                    https://tailwindcss.com/docs/width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your width utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based numeric scale, a percentage
      | based fraction scale, plus some other common use-cases. You
      | can, of course, modify these values as needed.
      |
      |
      | It's also worth mentioning that Tailwind automatically escapes
      | invalid CSS class name characters, which allows you to have
      | awesome classes like .w-2/3.
      |
      | Class name: .w-{size}
      |
      */

      width: {
        '6/7': '85%',
        'half-screen': '50vw'
      },

      /*
      |-----------------------------------------------------------------------------
      | Height                                  https://tailwindcss.com/docs/height
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your height utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based numeric scale plus some other
      | common use-cases. You can, of course, modify these values as
      | needed.
      |
      | Class name: .h-{size}
      |
      */

      height: {
        almostScreen: '80vh'
      },

      /*
      |-----------------------------------------------------------------------------
      | Minimum width                        https://tailwindcss.com/docs/min-width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your minimum width utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | couple common use-cases by default. You can, of course, modify
      | these values as needed.
      |
      | Class name: .min-w-{size}
      |
      */

      minWidth: {
        '1/2': '50%',
        '2/3': '66.66667%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '5/6': '83.33333%',
        '6': '1.5rem',
        '16': '4rem',
        '28': '7rem',
        '32': '8rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem'
      },

      /*
      |-----------------------------------------------------------------------------
      | Minimum height                      https://tailwindcss.com/docs/min-height
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your minimum height utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | few common use-cases by default. You can, of course, modify these
      | values as needed.
      |
      | Class name: .min-h-{size}
      |
      */

      minHeight: {
        auto: 'auto',
        px: '1px',
        '2': '0.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '92': '22rem',
        '128': '32rem',
        '256': '40rem',
        '75vh': '75vh',
        screen: '100vh'
      },

      /*
      |-----------------------------------------------------------------------------
      | Maximum width                        https://tailwindcss.com/docs/max-width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your maximum width utility sizes. These can
      | be percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based scale and a "full width" size,
      | which is basically a reset utility. You can, of course,
      | modify these values as needed.
      |
      | Class name: .max-w-{size}
      |
      */

      maxWidth: {
        '4xs': '8rem',
        '3xs': '12rem',
        xxs: '16rem',
        sm: '30rem',
        md: '40rem',
        lg: '50rem',
        xl: '60rem',
        '2xl': '70rem',
        '3xl': '80rem',
        '4xl': '90rem',
        '5xl': '100rem',
        '32': '8rem',
        '64': '16rem',
        '80': '20rem',
        none: 'none',
        '1/2': '50%'
      },

      /*
      |-----------------------------------------------------------------------------
      | Maximum height                      https://tailwindcss.com/docs/max-height
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your maximum height utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | couple common use-cases by default. You can, of course, modify
      | these values as needed.
      |
      | Class name: .max-h-{size}
      |
      */

      maxHeight: {
        '14': '3.5rem',
        '16': '4rem',
        '24': '6rem',
        '64': '16rem',
        '120': '30rem',
        '128': '32rem',
        none: 'none',
        almostScreen: '80vh'
      },

      /*
      |-----------------------------------------------------------------------------
      | Shadows                                https://tailwindcss.com/docs/shadows
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your shadow utilities. As you can see from
      | the defaults we provide, it's possible to apply multiple shadows
      | per utility using comma separation.
      |
      | If a `default` shadow is provided, it will be made available as the non-
      | suffixed `.shadow` utility.
      |
      | Class name: .shadow-{size?}
      |
      */

      boxShadow: {
        default: '0 2px 4px 0 rgba(0,0,0,0.10)',
        md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
        lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
        xl: '0 30px 50px 0 rgba(0,0,0,0.15)',
        outline: '0 0 0 3px rgba(52,144,220,0.5)',
        linebottom: 'inset 0px -1px 0px 0px #d4d4d4',
        horizontal:
          '0 -6px white, 0 6px white, -7px 0 13px -6px rgba(0,0,0,0.12), 7px 0 13px -6px rgba(0,0,0,0.12)'
      },

      /*
      |-----------------------------------------------------------------------------
      | Opacity                                https://tailwindcss.com/docs/opacity
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your opacity utility values. By default we
      | provide a sensible numeric scale. You can, of course, modify these
      | values as needed.
      |
      | Class name: .opacity-{name}
      |
      */

      opacity: {
        '5': '.05',
        '10': '.10'
      }
    }
  },

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive', 'hover'],
    cursor: ['responsive'],
    display: ['responsive'],
    fill: [],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive', 'hover'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    stroke: [],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontStyle: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive']
  },

  corePlugins: {},

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: []
}
