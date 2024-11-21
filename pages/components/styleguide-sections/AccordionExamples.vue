<template>
  <div>
    <div class="container bg-grey-l4 p-8 mt-12">
      <h2>Accordions (rework to support multiple tabs in an accordion)</h2>
      <accordion-item>
        <template v-slot:header>
          <span class="text-h4">Accordion solo title</span>
        </template>
        Some content of accordion
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
      </accordion-item>
      <accordion-item>
        <template v-slot:header>
          <span class="text-h4">Accordion solo title</span>
        </template>
        Some content of accordion
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
      </accordion-item>
      <accordion-item>
        <template v-slot:header>
          <span class="text-h4">Accordion solo title</span>
        </template>
        Some content of accordion
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
      </accordion-item>
      <accordion-item>
        <template v-slot:header>
          <span class="text-h4">Accordion solo title</span>
        </template>
        Some content of accordion
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
      </accordion-item>
    </div>
    <div class="container bg-grey-l4 p-8 mt-12">
      <accordion :multi="true">
        <accordion-item>
          <template v-slot:header>
            <span class="text-h4">Accordion multi title</span>
          </template>
          Some content of accordion
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
        </accordion-item>
        <accordion-item>
          <template v-slot:header>
            <span class="text-h4">Accordion multi title</span>
          </template>
          Some content of accordion
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
        </accordion-item>
      </accordion>
    </div>
    <div class="container bg-grey-l4 p-8 mt-12">
      <accordion>
        <accordion-item>
          <template v-slot:header>
            <span class="text-h4">Accordion title</span>
          </template>
          Some content of accordion
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
        </accordion-item>
        <accordion-item>
          <template v-slot:header>
            <span class="text-h4">Accordion title</span>
          </template>
          Some content of accordion
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi mollitia, obcaecati saepe quis ipsam officiis vel numquam ut architecto debitis blanditiis recusandae fugit dolores animi deserunt est eaque reiciendis quod.</p>
        </accordion-item>
      </accordion>
    </div>
  </div>
</template>

<script>
import AccordionItem from '@/components/AccordionItem'
import Accordion from '@/components/Accordion'

export default {
  name: 'AccordionExamples',

  components: {
    Accordion,
    AccordionItem
  }
}
</script>

<style scoped>
</style>
