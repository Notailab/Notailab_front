<template>
  <header class="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="grid h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 px-4 lg:px-6 shadow">
      <div class="flex min-w-0 items-center gap-8">
        <button type="button" class="flex items-center gap-2 text-left" @click="emit('logo-click')">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0f766e,#22c55e)] text-white shadow-sm ring-1 ring-emerald-900/10">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6.75A2.75 2.75 0 016.75 4h5.5a2.75 2.75 0 012.75 2.75V20L12 17.75 9 20l-3-2.25V6.75z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h4M8 12h6" />
            </svg>
          </div>
          <span class="text-base font-bold tracking-[0.08em] text-emerald-900 md:text-lg">Notailab</span>
        </button>

        <nav v-if="tabs.length" class="hidden h-full items-stretch gap-6 md:flex">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="relative flex h-full items-center text-sm leading-none transition"
            :class="tab.key === activeTab ? 'font-medium text-emerald-700' : 'text-slate-500 hover:text-slate-900'"
            @click="emit('tab-click', tab.key)"
          >
            {{ tab.label }}
            <span
              v-if="tab.key === activeTab"
              class="absolute left-0 right-0 bottom-[-0.4rem] h-0.5 rounded-full bg-emerald-700"
            ></span>
          </button>
        </nav>
      </div>

      <div class="flex min-w-0 justify-center px-4">
        <slot name="center" />
      </div>

      <div class="flex shrink-0 items-center gap-4">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['tab-click', 'logo-click'])
</script>