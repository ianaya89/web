<template>
  <social-sharing :url="url" inline-template>
    <ul class=" flex items-center">
      <li>
        <network network="facebook">
          <a class="block opacity-25 hover:opacity-100 p-4" @click.prevent>
            <img src="../../assets/images/social/facebook.svg" alt="Facebook share" class="block w-8">
          </a>
        </network>
      </li>
      <li>
        <network network="linkedin">
          <a class="block opacity-25 hover:opacity-100 p-4" @click.prevent>
            <img src="../../assets/images/social/linkedin.svg" alt="Linkedin share" class="block w-8">
          </a>
        </network>
      </li>
      <li>
        <network network="twitter">
          <a class="block opacity-25 hover:opacity-100 p-4" @click.prevent>
            <img src="../../assets/images/social/twitter.svg" alt="Twitter share" class="block w-8">
          </a>
        </network>
      </li>
    </ul>
  </social-sharing>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>
