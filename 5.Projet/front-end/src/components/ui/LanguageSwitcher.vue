<template>
  <div class="max-w-lg mb-2 ml-4 absolute bottom-0 left-0">
    <select v-model="$i18n.locale" @change="onChange($event)"
            class="px-4 py-2 rounded focus:outline-none bg-transparent font-bold text-white text-center appearance-none">
      <option v-for="(lang, i) in languages" :key="`Lang${i}`" :value="lang">{{ flags[lang] }}</option>
    </select>
  </div>
</template>

<script>
import { LANGUAGES } from '@/config/constants';

export default {
  name: 'LanguageSwitcher',

  data() {
    return {
      languages: LANGUAGES
    }
  },

  computed: {
    flags: function() {
      let flags = {};
      for (const lang of this.languages) {
        let flag = lang.toUpperCase()
        switch (lang) {
          case 'en':
            flag = `🏴󠁧󠁢󠁥󠁮󠁧󠁿 - ${ flag }`;
            break;
          case 'fr':
            flag = `🇫🇷 - ${ flag }`;
            break;
          case 'de':
            flag = `🇩🇪 - ${ flag }`;
            break;
          case 'it':
            flag = `🤌 - ${ flag }`;
            break;
          default:
            break;
        }
        flags[lang] = flag
      }
      return flags;
    }
  },

  methods: {
    onChange(event) {
      localStorage.setItem('lang', event.target.value);
    }
  }
}
</script>
