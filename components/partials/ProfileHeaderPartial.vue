<template>
  <div class="w-full">
    <div class="image-container sm:h-128">
      <slot name="image">
        <img
          class="object-cover"
          :src="require('../../assets/images/profile-image-fallback.jpg')"
          alt="Image"
        >
      </slot>
    </div>

    <div class="profile-header-block sm:-mt-24">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileHeaderPartial'
}
</script>

<style lang="postcss" scoped>
.image-container {
  @apply .overflow-hidden;
}

.profile-header-block {
  @apply .relative .bg-white .py-8 .px-12 .shadow-lg;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .profile-header-block {
    width: calc(100% - 30px);
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  img {
    max-width: 200%;
  }

  .profile-header-block {
    width: calc(100% - 20px);
    margin-left: calc(100% - calc(100% - 20px));
    @apply .px-6 .-mt-16;
  }
}
</style>
