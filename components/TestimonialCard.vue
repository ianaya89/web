<template>
  <div class="flex flex-col px-4 max-w-xs">
    <div class="w-full">
      <div class="testimonial-img mb-3">
        <img
          :src="require('../assets/images/testimonials/' + $get(testimonial,'image',''))"
          alt="event image"
          class=""
          style="max-width: 6rem;"
        >
      </div>
      <div class="testimonial-name mb-3">
        <h4>{{ $get(testimonial,'name','-') }}</h4>
      </div>
      <div class="testimonial-position mb-3">
        {{ $get(testimonial,'position','-') }}
      </div>
      <div class="testimonial-content">
        <span class="relative italic">{{ $get(testimonial,'testimonial','-') }} <svg-icon class="absolute w-7 sm:w-9 h-7 sm:h-9 opacity-10" name="ui-elements/quotation-up" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialCard',

  components: {},

  props: {
    testimonial: {
      type: Object,
      required: true
    }
  },

  computed: {},

  methods: {}
}
</script>

<style scoped>
.testimonial-img {
  border-radius: 100%;
  display: inline-block;
  overflow: hidden;
}

.testimonial-content {
  padding-right: 40px;
}

.testimonial-content .absolute {
  left: 100%;
  top: -25px;
  margin-left: 3px;
}

@media (max-width: 450px) {
  .testimonial-content .absolute {
    top: -15px;
    margin-left: 0;
  }
}
</style>
