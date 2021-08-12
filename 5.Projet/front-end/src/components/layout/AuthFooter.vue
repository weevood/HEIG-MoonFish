<template>
  <footer class="max-w-lg mx-auto mb-8 md:my-3 text-center">
    <div class="text-white uppercase font-bold text-sm">
      <a href="#" class="hover:underline">Contact</a>
      <span class="mx-3">•</span>
      <a href="#" class="hover:underline">Privacy</a>
    </div>
    <LanguageSwitcher/>
    <span class="max-w-lg mb-2 mr-4 text-gray-600 text-xs absolute bottom-0 right-0 italic">Photo by <a
        href="https://unsplash.com/@conorsexton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Conor Sexton</a> on <a
        href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">unsplash.com</a></span>
  </footer>
</template>

<script>
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default {
  name: 'AuthFooter',
  components: { LanguageSwitcher }
}
</script>
