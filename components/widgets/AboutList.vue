<template>
  <div>
    <profile-header-partial>
      <template v-slot:image>
        <img
          class="object-cover w-full"
          src="https://develop--so-app.netlify.com/bg-about.4ca141b781ff6c87816d.jpg"
          alt="Image"
        >
      </template>

      <div class="w-full">
        <h3>{{ $t('app.profile.about.title') }}</h3>

        <div class="w-full flex mt-8">
          <div class="w-1/3 -mt-3">
            <data-label :label="$t('app.profile.about.teams.label')">
              {{ $t('app.profile.about.teams.value') }}
            </data-label>
            <data-label :label="$t('app.profile.about.sponsors.label')">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="$t('app.profile.about.sponsors.value')" />
            </data-label>
          </div>
          <div class="w-2/3">
            <p class="text-grey-l1">
              {{ $t('app.profile.about.vision.label') }}
            </p>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="font-medium" v-html="$t('app.profile.about.vision.value')" />
          </div>
        </div>
      </div>
    </profile-header-partial>

    <div class="profile-content-space mt-16 mb-16">
      <div class="w-full">
        <h3>{{ $t('app.profile.about.team.title') }}</h3>
      </div>

      <div class="flex flex-wrap w-full mt-8 -mx-6">
        <div v-for="employee in employees" :key="employee.email" class="w-1/3 px-6 py-4">
          <employee
            :src="require('../../assets/images/contact/'+employee.photo)"
            :alt="employee.fullName"
            :position="employee.position"
            :email="employee.email"
            :full-name="employee.fullName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import DataLabel from '@/components/DataLabel'
import Employee from '@/components/widgets/Employee'

export default {
  components: {
    ProfileHeaderPartial,
    Employee,
    DataLabel
  },

  data: () => ({
    employees: [
      {
        fullName: 'Christian Karembeu',
        position: 'Partner',
        email: 'info@sponsoronline.eu',
        photo: 'ck.jpg'
      },
      {
        fullName: 'Maximilian von Portatius',
        position: 'General Manager',
        email: 'max@sponsoronline.eu',
        photo: 'mvp.jpeg'
      },
      {
        fullName: 'Andreas Tsochantaris',
        position: 'Head of Sales',
        email: 'andreas@sponsoronline.eu',
        photo: 'andreas_square.jpeg'
      },
      {
        fullName: 'Matej Kraus',
        position: 'Research Manager',
        email: 'matej@sponsoronline.eu',
        photo: 'mk.jpg'
      },
      {
        fullName: 'Edgar Oliver',
        position: 'Partnership Manager',
        email: 'edgar@sponsoronline.eu',
        photo: 'edgar.jpg'
      },
      {
        fullName: 'Carolina Klees',
        position: 'Partnership Coordinator',
        email: 'carolina@sponsoronline.eu',
        photo: 'carolina.jpg'
      }
    ]
  })
}
</script>

<style lang="postcss" scoped>
.profile-content-space {
  padding-left: calc(100% - calc(100% - 100px));
}
</style>
