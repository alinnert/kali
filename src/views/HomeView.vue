<script setup lang="ts">
import AppHeadline from '@/components/basic/AppHeadline.vue'
</script>

<template>
  <AppHeadline>Kali</AppHeadline>

  <p>Kali ist ein Werkzeug, um verschiedene Arten von druckbaren Kalendern zu erzeugen.</p>

  <AppHeadline :level="2">Anleitung</AppHeadline>

  <ol class="list-decimal my-2 ml-6 [&>*]:pl-1">
    <li>
      Konfiguriere bei Bedarf deine
      <RouterLink to="/feiertage" class="text-sky-700 dark:text-sky-400 underline"
        >Feiertage</RouterLink
      >. Wähle dazu erst das <strong>Bundesland</strong> aus und dann ggf. welche speziellen
      Feiertage angezeigt werden sollen oder nicht.
    </li>
    <li>
      Wähle dann in der Navigation links den gewünschten Kalender aus und konfiguriere ihn nach
      deinen Bedürfnissen.
    </li>
    <li>
      Anschließend kann er über den Button "<em>Drucken</em>" (oben links) ausgedruckt werden. Es
      wird empfohlen im Drucken-Dialog <strong>a)</strong> die Einstellung "<em
        >Hintergrundgrafiken drucken</em
      >" zu <strong>aktivieren</strong> sowie <strong>b)</strong> die Einstellung "<em
        >Kopf- und Fußzeilen drucken</em
      >" zu <strong>deaktivieren</strong>.
    </li>
  </ol>

  <AppHeadline :level="2">Über Kali</AppHeadline>

  <ul class="[&_a]:text-sky-700 dark:[&_a]:text-sky-400 [&_a]:underline">
    <li><a href="https://github.com/alinnert/kali">Quellcode</a></li>
    <li>
      <a href="https://github.com/alinnert/kali/issues">Fehler melden und andere Anregungen</a>
    </li>
  </ul>
</template>
