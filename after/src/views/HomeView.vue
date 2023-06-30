<script setup lang="ts">
import type { Film, FilmResult } from "@/models/Film";
import { onMounted, reactive, ref } from "vue";
import { unescape } from "lodash";

const films = reactive(new Array<Film>());
const busy = ref(false);

onMounted(async () => {
  busy.value = true;
  try {
    const response = await fetch("https://bechdel.azurewebsites.net/api/films");
    if (response.status === 200) {
      const filmResult = (await response.json()) as FilmResult;
      films.splice(0, films.length, ...filmResult.results);
    } else {
      throw "Failed to load films...";
    }
  } finally {
    busy.value = false;
  }
});

// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
</script>

<template>
  <main class="p-2">
    <h1 class="text-2xl font-bold">Films</h1>
    <div v-if="busy" class="bg-gray-800 text-white text-lg p-2">Loading...</div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      <div
        v-for="film in films"
        :key="film.imdbId"
        class="rounded-xl border flex border-slate-300 bg-slate-200 hover:bg-slate-300 cursor-pointer"
      >
        <img class="w-36 rounded-l-xl" :src="film.posterUrl" :alt="film.title" />
        <div class="p-1">
          <div class="text-lg font-bold">
            {{ unescape(film.title) }} ({{ film.year }})
          </div>
          <div>
            <span class="w-28 font-bold inline-block">Rating:</span>{{ film.rating }}
          </div>
          <div>
            <span class="w-28 font-bold inline-block">Budget:</span
            >{{ formatter.format(film.budget) }}
          </div>
          <div>
            <span class="w-28 font-bold inline-block">Revenue:</span
            >{{ formatter.format(film.domesticGross + film.internationalGross) }}
          </div>
          <div>
            <span class="w-28 font-bold inline-block">Bechdel Test:</span
            >{{ film.passed ? "Passed" : "Failed" }}
          </div>
          <div>
            <span class="w-28 font-bold inline-block">Result Reason:</span
            >{{ film.reason }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
