<template>
  <div class="empty-state text-center py-5">
    <div class="empty-icon mb-3">
      <slot name="icon">
        <span class="default-icon">💬</span>
      </slot>
    </div>
    <h4 class="mb-2">{{ title }}</h4>
    <p class="text-muted mb-3">
      {{ description }}
    </p>
    <b-button
      v-if="showButton"
      :variant="buttonVariant"
      :to="to"
    >
      {{ buttonText }}
    </b-button>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  showButton: { type: Boolean, default: false },
  buttonText: { type: String, default: '' },
  buttonVariant: { type: String, default: 'primary' },
  to: { type: [String, Object], default: null }
})
</script>

<style scoped>
.empty-state {
  border-radius: 0.75rem;
  border: 1px dashed #dee2e6;
  background: #ffffff;
}

.default-icon {
  font-size: 2rem;
}
</style>
