<template>
  <v-app>
    <section class="blog p-12 bg-grey-l3">
      <svg-icon name="inventory/3" />

      <h1 class="font-medium uppercase mb-4">
        All components preview
      </h1>

      <checkbox-examples />
      <growth-examples />
      <slider-examples />
      <dropdown-examples />
      <button-examples />
      <badge-examples />
      <input-examples />
      <switcher-examples />
      <area-examples />
      <labels-examples />
      <label-data-examples />
      <sidebar-examples />
      <progress-bar-examples />
      <popover-examples />
      <modal-examples />
      <card-examples />
      <datepicker-examples />
      <accordion-examples />
      <avatar-examples />
      <chart-examples />
      <tooltip-examples />
      <timeline-examples />
      <label-chart-examples />
      <icon-check-examples />
      <upload-examples />
      <gmap-examples />
    </section>
  </v-app>
</template>

<script>
import DropdownExamples from '@/pages/components/styleguide-sections/DropdownExamples'
import ButtonExamples from '@/pages/components/styleguide-sections/ButtonExamples'
import BadgeExamples from '@/pages/components/styleguide-sections/BadgeExamples'
import InputExamples from '@/pages/components/styleguide-sections/InputExamples'
import AreaExamples from '@/pages/components/styleguide-sections/AreaExamples'
import SwitcherExamples from '@/pages/components/styleguide-sections/SwitcherExamples'
import LabelsExamples from '@/pages/components/styleguide-sections/LabelsExamples'
import LabelDataExamples from '@/pages/components/styleguide-sections/LabelDataExamples'
import SidebarExamples from '@/pages/components/styleguide-sections/SidebarExamples'
import ProgressBarExamples from '@/pages/components/styleguide-sections/ProgressBarExamples'
import PopoverExamples from '@/pages/components/styleguide-sections/PopoverExamples'
import ModalExamples from '@/pages/components/styleguide-sections/ModalExamples'
import CardExamples from '@/pages/components/styleguide-sections/CardExamples'
import DatepickerExamples from '@/pages/components/styleguide-sections/DatepickerExamples'
import AccordionExamples from '@/pages/components/styleguide-sections/AccordionExamples'
import AvatarExamples from '@/pages/components/styleguide-sections/AvatarExamples'
import ChartExamples from '@/pages/components/styleguide-sections/ChartExamples'
import TooltipExamples from '@/pages/components/styleguide-sections/TooltipExamples'
import TimelineExamples from '@/pages/components/styleguide-sections/TimelineExamples'
import LabelChartExamples from '@/pages/components/styleguide-sections/LabelChartExamples'
import IconCheckExamples from '@/pages/components/styleguide-sections/IconCheckExamples'
import UploadExamples from '@/pages/components/styleguide-sections/UploadExamples'
import GmapExamples from '@/pages/components/styleguide-sections/GmapExamples'
import GrowthExamples from '@/pages/components/styleguide-sections/GrowthExamples'
import SliderExamples from '@/pages/components/styleguide-sections/SliderExamples'
import CheckboxExamples from '@/pages/components/styleguide-sections/CheckboxExamples'

export default {
  layout: 'default',

  head: {
    title: 'Blog'
  },

  components: {
    CheckboxExamples,
    GrowthExamples,
    IconCheckExamples,
    ButtonExamples,
    DropdownExamples,
    BadgeExamples,
    InputExamples,
    SwitcherExamples,
    AreaExamples,
    LabelsExamples,
    LabelDataExamples,
    SidebarExamples,
    ProgressBarExamples,
    PopoverExamples,
    ModalExamples,
    CardExamples,
    DatepickerExamples,
    AccordionExamples,
    LabelChartExamples,
    AvatarExamples,
    ChartExamples,
    TooltipExamples,
    TimelineExamples,
    UploadExamples,
    GmapExamples,
    SliderExamples
  },

  data: () => ({
    switcherA: true,
    switcherB: false,
    inputModel: 'Hello man',
    areaModel: 'Hey some long text'
  }),

  methods: {
    clickBtn() {
      setTimeout(() => {
        this.$refs.loadingBtn.loaded()
      }, 2000)
    },
    checkValueOfRef(refName) {
      alert(this.$refs[refName].getValue())
      this.$refs.inputBtn.loaded()
    },
    checkSwitcherAValue() {
      alert(this.switcherA)
    },

    checkValueOfData(dataName) {
      alert(this[dataName])
    }
  }
}
</script>

<style lang="postcss">
</style>
