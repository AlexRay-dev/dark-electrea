import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { sortBy } from 'lodash'
import dayjs from 'dayjs'
import axios from 'axios'

import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const toast = useToast()

export const useUtilStore = defineStore({
  id: 'utilStore',
  state: () => ({
    genres: ['Dark Electro', 'EBM', 'Aggrotech', 'Industrial', 'Black Industrial', 'Black Metal', 'Raw Black Metal', 'Melodic Death'].sort(),
    countries: [
      { value: '', title: 'Любая', code: '' },
      { value: 'Afghanistan', title: 'Афганистан', code: 'af' },
      { value: 'Åland Islands', title: 'Аландские острова', code: 'ax' },
      { value: 'Albania', title: 'Албания', code: 'al' },
      { value: 'Algeria', title: 'Алжир', code: 'dz' },
      { value: 'American Samoa', title: 'Американские Самоа', code: 'as' },
      { value: 'Andora', title: 'Андора', code: 'ad' },
      { value: 'Angola', title: 'Ангола', code: 'ao' },
      { value: 'Anguilla', title: 'Ангилья', code: 'ai' },
      { value: 'Antarctica', title: 'Антарктика', code: 'aq' },
      { value: 'Antigua and Barbuda', title: 'Антигуа и Барбуда', code: 'ag' },
      { value: 'Argentina', title: 'Аргентина', code: 'ar' },
      { value: 'Armenia', title: 'Армения', code: 'am' },
      { value: 'Aruba', title: 'Аруба', code: 'aw' },
      { value: 'Australia', title: 'Австралия', code: 'au' },
      { value: 'Austria', title: 'Австрия', code: 'at' },
      { value: 'Azerbaijan', title: 'Азербайджан', code: 'az' },
      { value: 'Bahamas', title: 'Багамы', code: 'bs' },
      { value: 'Bahrain', title: 'Бахрейн', code: 'bh' },
      { value: 'Bangladesh', title: 'Бангладеш', code: 'bd' },
      { value: 'Barbados', title: 'Барбадос', code: 'bb' },
      { value: 'Belarus', title: 'Беларусь', code: 'by' },
      { value: 'Belgium', title: 'Бельгия', code: 'be' },
      { value: 'Belize', title: 'Белиз', code: 'bz' },
      { value: 'Benin', title: 'Бенин', code: 'bj' },
      { value: 'Bermuda', title: 'Бермуды', code: 'bm' },
      { value: 'Bhutan', title: 'Бутан', code: 'bt' },
      { value: 'Bolivia', title: 'Боливия', code: 'bo' },
      { value: 'Bosnia and Herzegovina', title: 'Босния и Герцеговина', code: 'ba' },
      { value: 'Botswana', title: 'Ботсвана', code: 'bw' },
      { value: 'Bouvet Island', title: 'Остров Буве', code: 'bv' },
      { value: 'Brazil', title: 'Бразилия', code: 'br' },
      { value: 'Brunei Darussalam', title: 'Бруней', code: 'bn' },
      { value: 'Bulgaria', title: 'Болгария', code: 'bg' },
      { value: 'Burkina Faso', title: 'Буркина Фасо', code: 'bf' },
      { value: 'Burundi', title: 'Бурунди', code: 'bi' },
      { value: 'Cambodia', title: 'Камбоджия', code: 'kh' },
      { value: 'Cameroon', title: 'Камерун', code: 'cm' },
      { value: 'Canada', title: 'Канада', code: 'ca' },
      { value: 'Cape Verde', title: 'Капе Верде', code: 'cv' },
      { value: 'Cayman Islands', title: 'Каймановы острова', code: 'ky' },
      { value: 'Central African Republic', title: 'Центральная Африканская Республика', code: 'cf' },
      { value: 'Chad', title: 'Чад', code: 'td' },
      { value: 'Chile', title: 'Чили', code: 'cl' },
      { value: 'China', title: 'Китай', code: 'cn' },
      { value: 'Christmas Island', title: 'Остров Рождества (Австралия)', code: 'cx' },
      { value: 'Cocos (Keeling) Islands', title: 'Кокосовые острова', code: 'cd' },
      { value: 'Colombia', title: 'Колумбия', code: 'co' },
      { value: 'Comoros', title: 'Коморы', code: 'km' },
      { value: 'Congo', title: 'Конго', code: 'cg' },
      { value: 'Congo, The Democratic Republic of the', title: 'Демократическая Республика Конго', code: 'cd' },
      { value: 'Cook Islands', title: 'Острова Кука', code: 'ck' },
      { value: 'Costa Rica', title: 'Коста Рика', code: 'cr' },
      { value: 'Croatia', title: 'Хорватия', code: 'hr' },
      { value: 'Cuba', title: 'Куба', code: 'cu' },
      { value: 'Cyprus', title: 'Кипр', code: 'cy' },
      { value: 'Czech Republic', title: 'Чешская Республика', code: 'cz' },
      { value: 'Czechia', title: 'Чешская Республика', code: 'cz' },
      { value: 'Denmark', title: 'Дания', code: 'dk' },
      { value: 'Djibouti', title: 'Джибути', code: 'dj' },
      { value: 'Dominica', title: 'Доминика', code: 'dm' },
      { value: 'Dominican Republic', title: 'Доминиканская Республика', code: 'do' },
      { value: 'Ecuador', title: 'Эквадор', code: 'ec' },
      { value: 'Egypt', title: 'Египет', code: 'eg' },
      { value: 'El Salvador', title: 'Сальвадор', code: 'sv' },
      { value: 'Equatorial Guinea', title: 'Экваториальная Гвинея', code: 'gq' },
      { value: 'Eritrea', title: 'Эритрея', code: 'er' },
      { value: 'Estonia', title: 'Эстония', code: 'ee' },
      { value: 'Ethiopia', title: 'Эфиопия', code: 'et' },
      { value: 'Falkland Islands (Malvinas)', title: 'Фолклендские острова', code: 'fk' },
      { value: 'Faroe Islands', title: 'Фарерские острова', code: 'fo' },
      { value: 'Fiji', title: 'Фиджи', code: 'fj' },
      { value: 'Finland', title: 'Финляндия', code: 'fi' },
      { value: 'France', title: 'Франция', code: 'fr' },
      { value: 'French Guiana', title: 'Гвиана (департамент Франции)', code: 'gf' },
      { value: 'French Polynesia', title: 'Французская Полинезия', code: 'pf' },
      { value: 'Gabon', title: 'Габон', code: 'ga' },
      { value: 'Gambia', title: 'Гамбия', code: 'gm' },
      { value: 'Georgia', title: 'Грузия', code: 'ge' },
      { value: 'Germany', title: 'Германия', code: 'de' },
      { value: 'Ghana', title: 'Гана', code: 'gh' },
      { value: 'Greece', title: 'Греция', code: 'gr' },
      { value: 'Greenland', title: 'Гринландия', code: 'gl' },
      { value: 'Grenada', title: 'Гренада', code: 'gd' },
      { value: 'Guadeloupe', title: 'Гваделупа', code: 'gp' },
      { value: 'Guam', title: 'Гуам', code: 'gu' },
      { value: 'Guatemala', title: 'Гватемала', code: 'gt' },
      { value: 'Guernsey', title: 'Гернси', code: 'gg' },
      { value: 'Guinea', title: 'Гвинея', code: 'gn' },
      { value: 'Guinea-Bissau', title: 'Гвинея-Бисау', code: 'gw' },
      { value: 'Guyana', title: 'Гайна', code: 'gy' },
      { value: 'Haiti', title: 'Гаити', code: 'ht' },
      { value: 'Holy See (Vatican City State)', title: 'Ватикан', code: 'va' },
      { value: 'Honduras', title: 'Гондурас', code: 'hn' },
      { value: 'Hong Kong', title: 'Гонк Конг', code: 'hk' },
      { value: 'Hungary', title: 'Венгрия', code: 'hu' },
      { value: 'Iceland', title: 'Исландия', code: 'is' },
      { value: 'India', title: 'Индия', code: 'in' },
      { value: 'Indonesia', title: 'Индонезия', code: 'id' },
      { value: 'International', title: 'Интернациональная', code: '' },
      { value: 'Iran, Islamic Republic Of', title: 'Иран', code: 'ir' },
      { value: 'Iraq', title: 'Ирак', code: 'iq' },
      { value: 'Ireland', title: 'Ирландия', code: 'ie' },
      { value: 'Isle of Man', title: 'Остров Мэн', code: 'im' },
      { value: 'Israel', title: 'Израиль', code: 'il' },
      { value: 'Italy', title: 'Италия', code: 'it' },
      { value: 'Jamaica', title: 'Ямайка', code: 'jm' },
      { value: 'Japan', title: 'Япония', code: 'jp' },
      { value: 'Jersey', title: 'Джерси', code: 'je' },
      { value: 'Jordan', title: 'Иордания', code: 'jo' },
      { value: 'Kazakhstan', title: 'Казахстан', code: 'kz' },
      { value: 'Kenya', title: 'Кения', code: 'ke' },
      { value: 'Kiribati', title: 'Кирибати', code: 'ki' },
      { value: 'Korea, Republic of', title: 'Южная Корея', code: 'kp' },
      { value: 'Kuwait', title: 'Кувейт', code: 'kw' },
      { value: 'Kyrgyzstan', title: 'Кыргызстан', code: 'kg' },
      { value: 'Latvia', title: 'Латвия', code: 'lv' },
      { value: 'Lebanon', title: 'Ливан', code: 'lb' },
      { value: 'Lesotho', title: 'Лесото', code: 'ls' },
      { value: 'Liberia', title: 'Либерия', code: 'lr' },
      { value: 'Liechtenstein', title: 'Лихтенштейн', code: 'li' },
      { value: 'Lithuania', title: 'Литва', code: 'lt' },
      { value: 'Luxembourg', title: 'Люксембург', code: 'lu' },
      { value: 'North Macedonia', title: 'Северная Македония', code: 'mk' },
      { value: 'Madagascar', title: 'Мадагаскар', code: 'mg' },
      { value: 'Malawi', title: 'Малавия', code: 'mw' },
      { value: 'Malaysia', title: 'Малазия', code: 'my' },
      { value: 'Maldives', title: 'Мальдивы', code: 'mv' },
      { value: 'Mali', title: 'Мали', code: 'ml' },
      { value: 'Malta', title: 'Мальта', code: 'mt' },
      { value: 'Marshall Islands', title: 'Маршалловы Острова', code: 'mh' },
      { value: 'Martinique', title: 'Мартиника', code: 'mq' },
      { value: 'Mauritania', title: 'Мавритания', code: 'mr' },
      { value: 'Mauritius', title: 'Маврикий', code: 'mu' },
      { value: 'Mayotte', title: 'Майотта', code: 'yt' },
      { value: 'Mexico', title: 'Мексика', code: 'mx' },
      { value: 'Micronesia, Federated States of', title: 'Микронезия', code: 'fm' },
      { value: 'Moldova, Republic of', title: 'Молдова', code: 'md' },
      { value: 'Monaco', title: 'Монако', code: 'mc' },
      { value: 'Mongolia', title: 'Монголия', code: 'mn' },
      { value: 'Montserrat', title: 'Монтсеррат', code: 'ms' },
      { value: 'Morocco', title: 'Мороко', code: 'ma' },
      { value: 'Mozambique', title: 'Мозамбик', code: 'mz' },
      { value: 'Myanmar', title: 'Мьянма', code: 'mm' },
      { value: 'Namibia', title: 'Намибия', code: 'na' },
      { value: 'Nauru', title: 'Науру', code: 'nr' },
      { value: 'Nepal', title: 'Непал', code: 'np' },
      { value: 'Netherlands', title: 'Нидерланды', code: 'nl' },
      { value: 'New Caledonia', title: 'Новая Каледония', code: 'nc' },
      { value: 'New Zealand', title: 'Новая Зеландия', code: 'nz' },
      { value: 'Nicaragua', title: 'Никарагуа', code: 'ni' },
      { value: 'Niger', title: 'Нигер', code: 'ne' },
      { value: 'Nigeria', title: 'Нигерия', code: 'ng' },
      { value: 'Niue', title: 'Ниуэ', code: 'nu' },
      { value: 'Norfolk Island', title: 'Норфолк', code: 'nf' },
      { value: 'Northern Mariana Islands', title: 'Северные Марианские Острова', code: 'mp' },
      { value: 'Norway', title: 'Норвегия', code: 'no' },
      { value: 'Oman', title: 'Оман', code: 'om' },
      { value: 'Pakistan', title: 'Пакистан', code: 'pk' },
      { value: 'Palau', title: 'Палау', code: 'pw' },
      { value: 'Palestinian Territory, Occupied', title: 'Палестина', code: 'ps' },
      { value: 'Panama', title: 'Панама', code: 'pa' },
      { value: 'Papua New Guinea', title: 'Папуа — Новая Гвинея', code: 'pg' },
      { value: 'Paraguay', title: 'Парагвай', code: 'py' },
      { value: 'Peru', title: 'Перу', code: 'pe' },
      { value: 'Philippines', title: 'Филипины', code: 'ph' },
      { value: 'Pitcairn', title: 'Острова Питкэрн', code: 'pn' },
      { value: 'Poland', title: 'Польша', code: 'pl' },
      { value: 'Portugal', title: 'Португалия', code: 'pt' },
      { value: 'Puerto Rico', title: 'Пуэрто-Рико', code: 'pr' },
      { value: 'Qatar', title: 'Катар', code: 'qa' },
      { value: 'Reunion', title: 'Реюньон', code: 're' },
      { value: 'Romania', title: 'Румыния', code: 'ro' },
      { value: 'Russia', title: 'Россия', code: 'ru' },
      { value: 'Rwanda', title: 'Руанда', code: 'rw' },
      { value: 'Samoa', title: 'Самоа', code: 'ws' },
      { value: 'San Marino', title: 'Сан Марино', code: 'sm' },
      { value: 'Saudi Arabia', title: 'Саудовская Аравия', code: 'sa' },
      { value: 'Senegal', title: 'Сенегал', code: 'sn' },
      { value: 'Seychelles', title: 'Сейшеллы', code: 'sc' },
      { value: 'Sierra Leone', title: 'Сьерра-Леоне', code: 'sl' },
      { value: 'Singapore', title: 'Сингапур', code: 'sg' },
      { value: 'Slovakia', title: 'Словакия', code: 'sk' },
      { value: 'Slovenia', title: 'Словения', code: 'si' },
      { value: 'Somalia', title: 'Сомали', code: 'so' },
      { value: 'South Africa', title: 'Южная Африка', code: 'za' },
      { value: 'Spain', title: 'Испания', code: 'es' },
      { value: 'Sri Lanka', title: 'Шри Ланка', code: 'lk' },
      { value: 'Sudan', title: 'Судан', code: 'sd' },
      { value: 'Suriname', title: 'Суринам', code: 'sr' },
      { value: 'Sweden', title: 'Швеция', code: 'se' },
      { value: 'Switzerland', title: 'Швейцария', code: 'ch' },
      { value: 'Syrian Arab Republic', title: 'Сирия', code: 'sy' },
      { value: 'Taiwan, Province of China', title: 'Тайвань', code: 'tw' },
      { value: 'Tajikistan', title: 'Таджикистан', code: 'tj' },
      { value: 'Tanzania, United Republic of', title: 'Танзания', code: 'tz' },
      { value: 'Thailand', title: 'Таиланд', code: 'th' },
      { value: 'Togo', title: 'Того', code: 'tg' },
      { value: 'Tokelau', title: 'Токелау', code: 'tk' },
      { value: 'Tonga', title: 'Тонга', code: 'to' },
      { value: 'Trinidad and Tobago', title: 'Тринидад и Тобаго', code: 'tt' },
      { value: 'Tunisia', title: 'Тунис', code: 'tn' },
      { value: 'Turkey', title: 'Турция', code: 'tr' },
      { value: 'Turkmenistan', title: 'Туркменистан', code: 'tm' },
      { value: 'Uganda', title: 'Уганда', code: 'ug' },
      { value: 'Ukraine', title: 'Украина', code: 'ua' },
      { value: 'United Arab Emirates', title: 'Объединённые Арабские Эмираты', code: 'ae' },
      { value: 'United Kingdom', title: 'Великобритания', code: 'gb' },
      { value: 'United States', title: 'США', code: 'us' },
      { value: 'Uruguay', title: 'Уругвай', code: 'uy' },
      { value: 'Uzbekistan', title: 'Узбекистан', code: 'uz' },
      { value: 'Venezuela', title: 'Венесуэла', code: 've' },
      { value: 'Viet Nam', title: 'Вьетнам', code: 'vn' },
      { value: 'Yemen', title: 'Йемен', code: 'ye' },
      { value: 'Zambia', title: 'Замбия', code: 'zm' },
      { value: 'Zimbabwe', title: 'Зимбабве', code: 'zw' },
      { value: 'Unknown', title: 'Неизвестно', code: '' },
    ],
    statuses: [
      { title: 'Любой', value: '' },
      { title: 'Активны', value: 'Active' },
      { title: 'Распались', value: 'Split-up' },
      { title: 'В заморозке', value: 'On hold' },
      { title: 'Неизвестно', value: 'Unknown' },
      { title: 'Сменили название', value: 'Changed name' }
    ],
    stats: {
      bandsCount: 0,
      albumsCount: 0,
      peopleCount: 0,
      activeBandsCount: 0,
      onHoldBandsCount: 0,
      splitUpBandsCount: 0,
      changeNameBandsCount: 0,
      unknownBandsCount: 0,
    }
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------
    async getStats() {
      const { data } = await axios.get('/api/stats')
      this.stats = data.data
    },
    // ---------------------------------------POST---------------------------------------

    // ---------------------------------------PATCH---------------------------------------
    axiosErrorHandler(error) {
      toast.error(`Текст ошибки:\n${error.response.data.error}`)
    },
    formattedAlbumYear(releaseDate) {
      let formattedYear = ''
      const format1 = dayjs(releaseDate, 'MMMM D[th], YYYY').format('DD.MM.YYYY')
      const format2 = dayjs(releaseDate, 'MMMM D[rd], YYYY').format('DD.MM.YYYY')
      const format3 = dayjs(releaseDate, 'YYYY-MM-DD').format('DD.MM.YYYY')

      if (format1 !== 'Invalid Date') formattedYear = format1
      else if (format2 !== 'Invalid Date') formattedYear = format2
      else if (format3 !== 'Invalid Date') formattedYear = format3
      else formattedYear = releaseDate

      return formattedYear
    }
  },
  getters: {
    sortedCountries() {
      return sortBy(this.countries, 'title')
    }
  }
})
