import { init } from 'i18next'

init({
  lng: 'de',
  debug: true,
  resources: {
    de: {
      translation: {
        weekDays: {
          twoLettersArr: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
          twoLetters: {
            monday: 'Mo',
            tuesday: 'Di',
            wednesday: 'Mi',
            thursday: 'Do',
            friday: 'Fr',
            saturday: 'Sa',
            sunday: 'So',
          },
        },
        months: [
          'Jan',
          'Feb',
          'Mär',
          'Apr',
          'Mai',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Okt',
          'Nov',
          'Dez',
        ],
        shiftNames: {
          early: 'Frühschicht',
          late: 'Spätschicht',
        },
      },
    },
  },
})
