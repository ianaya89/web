<template>
  <div :class="positionClass" class="bg-white max-w-xs shadow-lg popover-card">
    <div class="border-b border-grey-l3 p-6">
      <slot name="header" />
    </div>
    <div class="popover-body p-6">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popover',

  props: {
    position: {
      type: String,
      default: 'top',
      validator: value => {
        return (
          [
            'left',
            'right',
            'top',
            'bottom',
            'corner-top-right',
            'corner-right',
            'corner-left'
          ].indexOf(value) !== -1
        )
      }
    }
  },

  computed: {
    positionClass() {
      return 'tip-' + this.position
    }
  }
}
</script>


<style lang="postcss" scoped>
.popover-card {
  @apply .border .border-grey-l3 .relative;
  opacity: 1;
  z-index: 5;
  -webkit-transform: scale(1);
  transform: scale(1);
}

/* classes for "tips" can be changed as props for a direction we need */
/* "bg-white" can be a variable and when changes bg color of popover,*/
/* changes also color of tip (to border-grey, red, green, etc. */
.tip-left {
  &:before {
    @apply .border-t .border-l .border-grey-l3 .bg-white .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    position: absolute;
    left: -0.375rem;
    top: 1rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.tip-right {
  &:before {
    @apply .border-b .border-r .border-grey-l3 .bg-white .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    right: -0.375rem;
    top: 1rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.tip-top {
  &:before {
    @apply .border-t .border-r .border-grey-l3 .bg-white .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    left: 1rem;
    top: -0.375rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.tip-bottom {
  &:before {
    @apply .border-b .border-l .border-grey-l3 .bg-white .absolute;
    content: ' ';
    width: 0.625rem;
    height: 0.625rem;
    left: 1rem;
    bottom: -0.375rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

/* Corner tips */
/* we can use following classes also for chat bubbles as a prop */
/* "border-white" can be a variable and when changes bg color of popover,*/
/* changes also color of tip (to border-grey, red, green, etc. */
.tip-corner-top-right {
  &:before {
    @apply .border-r-5 .border-b-5 .border-white .absolute;
    top: -10px;
    right: 0px;
    content: ' ';
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    z-index: 15;
  }

  &:after {
    @apply .border-r-6 .border-b-6 .border-grey-l3 .absolute;
    top: -12px;
    right: -1px;
    content: ' ';
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    z-index: 14;
  }
}

.tip-corner-right {
  &:before {
    @apply .border-r-5 .border-b-5 .border-white .absolute;
    top: 0px;
    right: -10px;
    content: ' ';
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    z-index: 15;
    transform: rotate(90deg) scaleX(-1);
  }

  &:after {
    @apply .border-r-6 .border-b-6 .border-grey-l3 .absolute;
    top: -1px;
    right: -12px;
    content: ' ';
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    z-index: 14;
    transform: rotate(90deg) scaleX(-1);
  }
}

.tip-corner-left {
  &:before {
    @apply .border-r-5 .border-b-5 .border-white .absolute;
    top: 0px;
    left: -10px;
    content: ' ';
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    z-index: 15;
    transform: rotate(270deg) scaleY(1);
  }

  &:after {
    @apply .border-r-6 .border-b-6 .border-grey-l3 .absolute;
    top: -1px;
    left: -12px;
    content: ' ';
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    z-index: 14;
    transform: rotate(270deg) scaleY(1);
  }
}
</style>
