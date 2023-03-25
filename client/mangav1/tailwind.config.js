/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile-S':'320px',
      'mobile-M':'375px',
      'mobile-L': '425px',


      'tablet': '768px',


      'desktop': '1024px',
      'desktop-L': '1440px',

    },
    extend: {
      backgroundImage:{
        'themeLogin':"url('https://e0.pxfuel.com/wallpapers/276/266/desktop-wallpaper-ps4-anime-theme-custom-anime.jpg')",
        'memeload':"url('https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif')"
      },
      boxShadow: {
        'lightRounder': ' 0px 0px 5px 1px white;'  ,    
        'ErrorRounder': ' 0px 0px 5px 1px red;'   
      },
      keyframes: {
        menuBurgermoveRight: {
          from: {
            left: '-25rem'
          },
          to: {
            left: '0rem'
          }
        },
        menuBurgermoveleft: {
          from: {
            left: '0rem'
          },
          to: {
            left: '-25rem'
          }
        },
        screenOpen: {
          from: {

            transform : 'scale(0.8)'
          },
          to: {
            transform : 'scale(1)'
          }
        }
      },
    },
  },
  plugins: [],
}