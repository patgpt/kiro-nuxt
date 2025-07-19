<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <TheFooter />
  </div>
</template>