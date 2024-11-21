<template>
  <div class="container">
    <h2>Avatars</h2>

    <avatar :alt="'Some alt'" :rounded="false" :icon-sign="'fab fa-facebook-f'" />
    <avatar :alt="'Some alt'" :rounded="false" :icon-sign="'fab fa-instagram'" />
    <avatar :alt="'Some alt'" :rounded="false" :icon-sign="'fab fa-youtube'" />
    <avatar :alt="'Some alt'" :rounded="false" :icon-sign="'fab fa-twitter'" />
    <avatar :alt="'Some alt'" />
    <avatar :alt="'Some alt'" src="https://media.licdn.com/dms/image/C4D03AQEeT5YocyuD9Q/profile-displayphoto-shrink_800_800/0?e=1559174400&v=beta&t=UL0JLaZX5EL4OZMX8DkUdY4N9mmo8Lxh59rzTjmTJJk" />

    <avatar-info-strip />
    <avatar-info-strip />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import AvatarInfoStrip from '@/components/AvatarInfoStrip'

export default {
  name: 'AvatarExamples',

  components: {
    Avatar,
    AvatarInfoStrip
  }
}
</script>

<style scoped>
</style>
