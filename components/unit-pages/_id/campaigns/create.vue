<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="campaign__create">
    <div class="campaign__header" data-cy="create-campaign-header">
      <div class="absolute left-0 my-auto">
        <app-button
          class="ml-8"
          data-cy="back-button"
          :btn-class="'secondary'"
          :title="$t('app.inventory.campaigns.create.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="flex-grow text-center hidden md:flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.inventory.campaigns.create.title') }}
        </h3>
      </div>
      <div class="absolute right-0 my-auto">
        <app-button
          class="mr-8"
          data-cy="create-button"
          :title="$t('app.inventory.campaigns.create.create_send')"
          :disabled="newCampaignSaving"
          :loader="newCampaignSaving"
          @clicked="createCampaign()"
        />
      </div>
    </div>
    <div class="campaign__body pt-12 mx-auto" data-cy="create-campaign-page">
      <h3 class="md:hidden px-8 md:px-0">
        {{ $t('app.inventory.campaigns.create.title') }}
      </h3>

      <div class="w-full flex flex-wrap md:-mx-3 px-8 md:px-0 mt-4 md:mt-0 mb-16 md:mb-0">
        <div class="w-full md:w-1/3 md:px-3 mb-8 md:mb-0">
          <div class="w-full text-h5 flex pb-2">
            <span class="font-medium ml-2">{{ $t('app.inventory.campaigns.create.details_step_title') }}</span> <span class="arrow right hidden md:block"><span class="arrow-end" /></span>
          </div>
          <div class="step-content">
            <v-form
              ref="newCampaignForm"
              v-model="newCampaignFormValid"
            >
              <app-input
                v-model="campaign.name"
                data-cy="name"
                :outline="true"
                :required="true"
                :sticky-label="true"
                :label="null"
                :rules="[
                  v => !!v || $t('app.inventory.campaigns.create.name.required')
                ]"
                :solo="true"
                :solo-label="$t('app.inventory.campaigns.create.name.label')"
              />
              <div class="w-full flex mt-4 md:mt-0">
                <div class="w-1/2 relative pr-2">
                  <datepicker
                    v-model="campaign.sendDate"
                    data-cy="date"
                    :rules="[v => (!!v && v.length > 0) || this.$t('app.inventory.campaigns.create.send_date.required')]"
                    :solo="true"
                    :required="true"
                    :autoclose="true"
                    :solo-label="$t('app.inventory.campaigns.create.send_date.label')"
                    :outline="true"
                  />
                </div>
                <div class="w-1/2 relative pl-2">
                  <timepicker
                    v-model="campaign.sendTime"
                    data-cy="time"
                    :rules="[v => (!!v && v.length > 0) || this.$t('app.inventory.campaigns.create.send_time.required')]"
                    :solo="true"
                    :required="true"
                    :autoclose="true"
                    :solo-label="$t('app.inventory.campaigns.create.send_time.label')"
                    :outline="true"
                  />
                </div>
              </div>
              <text-area
                v-model="campaign.message"
                class="mt-4 md:mt-0"
                data-cy="message"
                :outline="true"
                :required="true"
                :sticky-label="true"
                :rows="2"
                :label="null"
                placeholder=""
                :rules="[
                  v => !!v || $t('app.inventory.campaigns.create.description.required')
                ]"
                :solo="true"
                :solo-label="$t('app.inventory.campaigns.create.description.label')"
              />
            </v-form>

            <!--          <div class="relative pl-8 mt-4">-->
            <!--            <span class="absolute left-0 top-0 text-grey-l2 fas fa-info-circle pt-1" />-->
            <!--            <p class="text-grey-l1">-->
            <!--              &lt;!&ndash;              todo:: text&ndash;&gt;-->
            <!--              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.-->
            <!--            </p>-->
            <!--          </div>-->
          </div>
        </div>
        <div class="w-full md:w-1/3 md:px-3 mb-8 md:mb-0">
          <div class="w-full text-h5 flex pb-2">
            <span class="font-medium ml-2">{{ $t('app.inventory.campaigns.create.select_inventory_step_title') }}</span><span class="text-grey ml-2" data-cy="selected-inventories-count">( {{ selectedInventory.length + selectedPackages.length }}/{{ inventories.length + packages.length }} )</span> <span class="arrow right hidden md:block"><span class="arrow-end" /></span>
          </div>
          <div class="step-content with-scroll">
            <search
              :search-items="allItems"
              :search-attribute="['category.path', 'nameOverride']"
            >
              <div class="w-full flex">
                <app-button
                  data-cy="select-all-btn"
                  :title="!areAllInventoryItemsSelected ? $t('general.select_all') : $t('general.unselect_all')"
                  :btn-class="'link'"
                  @clicked="!areAllInventoryItemsSelected ? selectAllInventoryItems() : unselectAllInventoryItems()"
                />

                <app-button
                  class="ml-auto"
                  data-cy="expand-all-btn"
                  :title="!expandedAllInventory ? $t('general.expand_all') : $t('general.collapse_all')"
                  :btn-class="'link'"
                  @clicked="toggleAllInventory"
                />
              </div>

              <accordion ref="inventories" :multi="true">
                <accordion-item
                  v-for="(category, index) in Object.keys(groupedItemsByCategory)"
                  :key="index"
                  :top-border="index===0"
                  class="pl-2"
                  :body-classes="'pr-4'"
                  :opener-on-left="true"
                >
                  <template
                    v-slot:header
                    class=""
                  >
                    <inventory-icon
                      class="ml-2 w-8 h-8"
                      :category="{path:category}"
                      :is-package="availableMainCategories[category].target==='package'"
                    />
                    <span class="text-h7 font-medium uppercase py-5 ml-2">{{ $t('app.marketplace.categories.'+$helpers.normalizeCategoryName(category, availableMainCategories[category].target==='package')) }}</span>
                    <checkbox
                      :value="isCategorySelected(category)"
                      class="absolute right-0 top-0 p-0 mt-5"
                      :hide-details="true"
                      :indeterminate="isCategoryIndeterminate(category)"
                      :checkbox-value="category"
                      :label="null"
                      @input="onCategoryClick($event, category)"
                      @click.native.stop
                    />
                  </template>

                  <div
                    v-for="(item, index2) in groupedItemsByCategory[category]"
                    :key="index2"
                    data-cy="inventory-item"
                    class="w-full flex relative pt-4 pb-2 border-b border-grey-l4"
                  >
                    <inventory-icon
                      class="w-6 h-6"
                      :category="item.category"
                      :is-package="item.category.target === 'package'"
                    />
                    <span v-if="item.category.target!=='package'" class="font-medium ml-3">
                      {{ item.nameOverride || $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.tertiaryCategory(item.category))) }}
                    </span>
                    <span v-else class="font-medium ml-3">
                      {{ item.nameOverride || $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.firstCategory(item.category), true)) }}
                    </span>
                    <span v-if="item.category.target!=='package'" class="font-serif text-grey ml-1 leading-tight">- {{ $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.secondaryCategory(item.category))) }}</span>
                    <checkbox
                      v-if="item.category.target==='package'"
                      v-model="selectedPackages"
                      class="absolute right-0 top-0 mt-2"
                      :hide-details="true"
                      :checkbox-value="item.id"
                      :label="null"
                      @click.native.stop
                    />
                    <checkbox
                      v-else
                      v-model="selectedInventory"
                      class="absolute right-0 top-0 mt-2"
                      :hide-details="true"
                      :checkbox-value="item.id"
                      :label="null"
                      @click.native.stop
                    />
                  </div>
                </accordion-item>
              </accordion>

              <template v-slot:result="props">
                <div
                  v-if="props.result.length === 0"
                  class="text-grey w-full flex min-h-64"
                >
                  <div class="w-full flex justify-center">
                    <span class="text-p1">{{ $t('errors.no-search-result') }}</span>
                  </div>
                </div>

                <div
                  v-for="(item, index2) in props.result"
                  :key="index2"
                  class="w-full flex relative py-3 font-serif border-b border-grey-l4"
                >
                  <inventory-icon
                    class="w-8 h-8"
                    :category="item.category"
                    :is-package="item.category.target === 'package'"
                  />
                  <span v-if="item.category.target!=='package'" class="font-medium ml-3 my-auto">
                    {{ item.nameOverride || $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.tertiaryCategory(item.category))) }}
                  </span>
                  <span v-else class="font-medium ml-3 my-auto">
                    {{ item.nameOverride || $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.firstCategory(item.category), true)) }}
                  </span>
                  <span v-if="item.category.target!=='package'" class="font-serif text-grey ml-1 leading-tight my-auto">- {{ $t('app.marketplace.categories.'+$helpers.normalizeCategoryName($helpers.secondaryCategory(item.category))) }}</span>
                  <checkbox
                    v-if="item.category.target==='package'"
                    v-model="selectedPackages"
                    class="absolute right-0 top-0 mt-2"
                    :hide-details="true"
                    :checkbox-value="item.id"
                    :label="null"
                    @click.native.stop
                  />
                  <checkbox
                    v-else
                    v-model="selectedInventory"
                    class="absolute right-0 top-0 mt-2"
                    :hide-details="true"
                    :checkbox-value="item.id"
                    :label="null"
                    @click.native.stop
                  />
                </div>
              </template>
            </search>
          </div>
        </div>
        <div class="w-full md:w-1/3 md:px-3">
          <div class="step-content-wrapper">
            <span class="font-medium">{{ $t('app.inventory.campaigns.create.select_recipients_step_title') }}<span class="text-grey ml-2 font-normal" data-cy="selected-contacts-count">( {{ selectedContacts.length }}/{{ contacts.length }} )</span></span>
          </div>
          <div class="step-content with-button with-scroll">
            <search
              :search-items="contacts"
              :search-attribute="'name'"
            >
              <app-button
                v-if="contacts.length !== 0"
                class="mt-2"
                :title="!areAllContactsSelected ? $t('general.select_all') : $t('general.unselect_all')"
                :btn-class="'link'"
                data-cy="select-all-contacts-btn"
                @clicked="!areAllContactsSelected ? selectAllContacts() : unselectAllContacts()"
              />

              <div
                v-for="(contact, index) in contacts"
                :key="contact.id"
                data-cy="contact-item"
                class="w-full relative px-2 border-b py-3 border-grey-l3"
                :class="{'border-t' : index===0}"
              >
                <checkbox
                  v-model="selectedContacts"
                  class="mt-0"
                  :hide-details="true"
                  :checkbox-value="contact.id"
                  :label="null"
                >
                  <template v-slot:label>
                    <span class="w-full flex flex-col pl-1">
                      <span class="text-black text-menu font-medium">
                        {{ contact.company }} ({{ contact.name }})
                      </span>
                      <span class="text-grey font-serif text-p3">
                        {{ contact.email }}
                      </span>
                    </span>
                  </template>
                </checkbox>
              </div>

              <template v-slot:result="props">
                <div
                  v-if="props.result.length === 0"
                  class="text-grey w-full flex min-h-64"
                >
                  <div class="w-full flex justify-center">
                    <span class="text-p1">{{ $t('errors.no-search-result') }}</span>
                  </div>
                </div>

                <div
                  v-for="(contact, index) in props.result"
                  :key="contact.id"
                  class="w-full relative px-2 py-3 border-b border-grey-l3"
                  :class="{'border-t' : index===0}"
                >
                  <checkbox
                    v-model="selectedContacts"
                    class="mt-0"
                    :hide-details="true"
                    :checkbox-value="contact.id"
                    :label="null"
                  >
                    <template v-slot:label>
                      <span class="w-full flex flex-col">
                        <span class="text-black text-menu font-semibold">
                          {{ contact.company }} ({{ contact.name }})
                        </span>
                        <span class="text-grey text-p3">
                          {{ contact.email }}
                        </span>
                      </span>
                    </template>
                  </checkbox>
                </div>
              </template>
            </search>

            <div class="w-full relative flex items-center" :class="{'pt-4':contacts.length !== 0}">
              <app-button
                :title="'+ ' +$t('general.add_another')"
                :btn-class="'link'"
                data-cy="add-contact"
                @clicked="$refs.addAnotherModal.open()"
              />

              <app-button
                :title="'+ ' +$t('app.inventory.campaigns.create.import.title')"
                :btn-class="'link ml-4'"
                @clicked="$refs.importModal.open()"
              />
            </div>
          </div>
          <app-button
            ref="saveCampaign"
            class="mt-4 w-full"
            data-cy="create-send"
            :title="$t('app.inventory.campaigns.create.create_send')"
            :disabled="newCampaignSaving"
            :loader="newCampaignSaving"
            @clicked="createCampaign"
          />
        </div>
      </div>
    </div>
    <modal
      ref="importModal"
      :modal-size-classes="'min-h-screen sm:min-h-auto max-w-md'"
      :footer="false"
    >
      <template v-slot:header>
        {{ $t('app.inventory.campaigns.create.import.title') }}
        <div class="absolute top-0 right-0 text-menu">
          <app-button
            :title="''"
            class="py-4 px-2"
            btn-class="link"
            icon="lni-close"
            @clicked="$refs.importModal.close()"
          />
        </div>
      </template>
      <template v-slot:body>
        <upload
          :key="importContactsFileIndex"
          :extensions="importContactsExtensions"
          :accepted="importContactsAcceptedMimes"
          :path="importContactsPath"
          :size="10000000"
          :max="1"
          :solo-label="$t('app.inventory.campaigns.create.import.label')"
          param="file"
          icon="lni-add-file"
          @success="onContactsImportSuccess"
        />

        <div class="-mt-4 text-right font-serif text-grey text-p3 leading-tight">
          <a href="/files/campaign-import-contacts-example.xlsx">{{ $t('app.inventory.campaigns.create.import.download_example_file') }}</a>
        </div>

        <div v-if="importContactsResponse && importContactsResponse.ok == false">
          <hr class="h-px w-full my-4 bg-grey-l4">

          <p class="font-serif text-red font-semibold text-p3 leading-normal">
            {{ $t('app.inventory.campaigns.create.import.errors_help') }}
          </p>

          <table class="w-full mt-2">
            <thead>
              <tr class="border-b border-grey-l3">
                <th class="text-left text-grey font-normal p-2">
                  {{ $t('app.inventory.campaigns.create.import.row') }}
                </th>
                <th class="text-left text-grey font-normal p-2">
                  {{ $t('app.inventory.campaigns.create.import.errors') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(error, index) in importContactsResponse.errors" :key="index">
                <td class="py-4 px-2 font-serif leading-tight">
                  {{ error.row }}
                </td>
                <td class="py-4 px-2 font-serif leading-tight">
                  <span v-for="(errorText, errorIndex) in error.errors" :key="errorIndex" class="block">{{ errorText }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </modal>
    <modal
      ref="addAnotherModal"
      :cy-identifier="'add-contact-modal'"
      :modal-size-classes="'min-h-screen sm:min-h-auto max-w-sm'"
    >
      <template v-slot:header>
        {{ $t('app.inventory.campaigns.create.new_contact.add_contact') }}
        <div class="absolute top-0 right-0 text-menu">
          <app-button
            :title="''"
            class="py-4 px-2"
            btn-class="link"
            icon="lni-close"
            data-cy="close"
            @clicked="$refs.addAnotherModal.close()"
          />
        </div>
      </template>
      <template v-slot:body>
        <v-form
          ref="newContactForm"
          v-model="newContactFormValid"
        >
          <app-input
            ref="newContactName"
            v-model="newContact.name"
            :outline="true"
            data-cy="name"
            class="font-sans"
            :required="true"
            :sticky-label="true"
            :label="null"
            :rules="[
              v => !!v || $t('app.inventory.campaigns.create.new_contact.name.required')
            ]"
            :solo="true"
            :solo-label="$t('app.inventory.campaigns.create.new_contact.name.label')"
          />
          <app-input
            v-model="newContact.company"
            :outline="true"
            class="font-sans"
            data-cy="company"
            :required="true"
            :sticky-label="true"
            :label="null"
            :rules="[
              v => !!v || $t('app.inventory.campaigns.create.new_contact.company.required')
            ]"
            :solo="true"
            :solo-label="$t('app.inventory.campaigns.create.new_contact.company.label')"
          />
          <app-input
            v-model="newContact.email"
            :outline="true"
            class="font-sans"
            :required="true"
            data-cy="email"
            :sticky-label="true"
            :label="null"
            :rules="[
              v => !!v || $t('app.inventory.campaigns.create.new_contact.email.required'),
              v => /^.+@.+\..+$/.test(v) || $t('app.inventory.campaigns.create.new_contact.email.valid')
            ]"
            :solo="true"
            :solo-label="$t('app.inventory.campaigns.create.new_contact.email.label')"
          />
        </v-form>
      </template>
      <template v-slot:footer>
        <div class="w-full">
          <app-button
            ref="saveAddAnotherBtn"
            class="w-full -mt-24 mb-16"
            :title="$t('general.save_add_another')"
            :btn-class="'primary'"
            data-cy="add-another"
            :disabled="newContactSaving"
            :loader="newContactSaving"
            @clicked="saveAndAddAnother()"
          />
          <div class="w-full flex mt-4">
            <div class="w-1/2 pr-2">
              <app-button
                class="w-full"
                data-cy="cancel"
                :title="$t('general.cancel')"
                :btn-class="'secondary'"
                @clicked="$refs.addAnotherModal.close()"
              />
            </div>
            <div class="w-1/2 pl-2">
              <app-button
                ref="saveBtn"
                data-cy="save"
                :disabled="newContactSaving"
                class="w-full"
                :title="$t('general.save_close')"
                :btn-class="'primary'"
                :loader="newContactSaving"
                @clicked="save()"
              />
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import { concat, groupBy, keyBy, uniqBy } from 'lodash'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import TextArea from '@/components/TextArea'
import Datepicker from '@/components/Datepicker'
import Timepicker from '@/components/Timepicker'
import Upload from '@/components/Upload'
import {
  ContactsQuery,
  CreateCampaignMutation,
  SubmitContactMutation,
  UnitInventoryQuery
} from '@/services/graphql'
import AccordionItem from '@/components/AccordionItem'
import Checkbox from '@/components/Checkbox'
import { removeItemFromArray } from '@/services/helpers'
import Modal from '@/components/Modal'
import onBack from '@/services/mixins/onBack'
import InventoryIcon from '@/components/inventory/InventoryIcon'
import Search from '@/components/widgets/Search'
import { CampaignsPaginatedQuery } from '@/services/graphql/campaigns'
import Accordion from '@/components/Accordion'

export default {
  layout: 'default',

  name: 'Create',

  components: {
    Accordion,
    InventoryIcon,
    Modal,
    AccordionItem,
    TextArea,
    AppInput,
    AppButton,
    Datepicker,
    Timepicker,
    Checkbox,
    Search,
    Upload
  },

  mixins: [onBack],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitInventoryQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        this.availableMainCategories = uniqBy(
          this.$get(data.unit, 'entity.inventories', []),
          item => item.category.path.split(' / ')[0]
        ).map(item => item.category)

        this.availableMainCategories = concat(
          this.availableMainCategories,
          uniqBy(
            this.$get(data.unit, 'entity.packages', []),
            item => item.category.path.split(' / ')[0]
          ).map(item => item.category)
        )

        this.availableMainCategories = keyBy(
          this.availableMainCategories,
          item => item.path.split(' / ')[0]
        )
      }
    },

    contacts: {
      ...ContactsQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  data: () => ({
    availableMainCategories: [],
    expandedAllInventory: false,
    contacts: [],
    campaignMin: moment().format('YYYY-MM-DD HH:mm:ss'),
    campaign: {
      name: null,
      message: null,
      sendDate: null,
      sendTime: null
    },
    newContact: {
      name: null,
      email: null,
      company: null
    },
    newContactFormValid: false,
    newCampaignFormValid: false,
    newContactSaving: false,
    newCampaignSaving: false,
    selectedInventory: [],
    selectedPackages: [],
    selectedContacts: [],
    showCampaignDatepicker: false,
    showCampaignTimepicker: false,
    importContactsFileIndex: 0,
    importContactsResponse: null,
    importContactsExtensions: ['xls', 'xlsx'],
    importContactsAcceptedMimes:
      'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }),

  computed: {
    importContactsPath() {
      return '/campaign/contacts/import/' + this.$route.params.id
    },

    areAllInventoryItemsSelected() {
      return (
        this.selectedInventory.length + this.selectedPackages.length ===
        this.allItems.length
      )
    },

    areAllContactsSelected() {
      return this.selectedContacts.length === this.contacts.length
    },

    inventories() {
      return this.$get(this.unit, 'entity.inventories', []).sort(
        (a, b) => a.category.id - b.category.id
      )
    },

    packages() {
      return this.$get(this.unit, 'entity.packages', []).sort(
        (a, b) => a.category.id - b.category.id
      )
    },

    allItems() {
      return concat(this.inventories, this.packages)
    },

    groupedInventoryByCategory() {
      return groupBy(this.inventories, item => {
        return item.category.path.split(' / ')[0]
      })
    },

    groupedPackagesByCategory() {
      return groupBy(this.packages, item => {
        return item.category.path.split(' / ')[0]
      })
    },

    groupedItemsByCategory() {
      return Object.assign(
        {},
        this.groupedInventoryByCategory,
        this.groupedPackagesByCategory
      )
    },

    isCategorySelected() {
      return categoryName => {
        if (this.availableMainCategories[categoryName].target === 'package') {
          return this.selectedPackages.filter(item =>
            this.groupedPackagesByCategory[categoryName]
              .map(item => item.id)
              .includes(item)
          ).length === this.groupedPackagesByCategory[categoryName].length
            ? categoryName
            : null
        } else {
          return this.selectedInventory.filter(item =>
            this.groupedInventoryByCategory[categoryName]
              .map(item => item.id)
              .includes(item)
          ).length === this.groupedInventoryByCategory[categoryName].length
            ? categoryName
            : null
        }
      }
    },

    isCategoryIndeterminate() {
      return categoryName => {
        if (this.availableMainCategories[categoryName].target === 'package') {
          return this.selectedPackages.filter(item =>
            this.groupedPackagesByCategory[categoryName]
              .map(item => item.id)
              .includes(item)
          ).length > 0 && !this.isCategorySelected(categoryName)
            ? true
            : null
        } else {
          return this.selectedInventory.filter(item =>
            this.groupedInventoryByCategory[categoryName]
              .map(item => item.id)
              .includes(item)
          ).length > 0 && !this.isCategorySelected(categoryName)
            ? true
            : null
        }
      }
    }
  },

  mounted() {
    // eslint-disable-next-line standard/computed-property-even-spacing
    const duplicatingCampaign = this.$store.getters[
      'campaign/duplicateCampaign'
    ]
    if (duplicatingCampaign !== null) {
      this.campaign = {
        name: duplicatingCampaign.name,
        message: duplicatingCampaign.message,
        sendDate: null,
        sendTime: null
      }
      this.selectedContacts = duplicatingCampaign.recipients.map(
        item => item.id
      )
      this.selectedInventory = duplicatingCampaign.inventoryItems.map(
        item => item.id
      )
    }
  },

  methods: {
    toggleAllInventory() {
      this.expandedAllInventory = !this.expandedAllInventory
      if (this.expandedAllInventory) {
        this.$refs.inventories.showAll()
      } else {
        this.$refs.inventories.hideAll()
      }
    },

    onContactsImportSuccess($event) {
      this.importContactsFileIndex++

      this.importContactsResponse = $event.response

      this.$apollo.queries.contacts.refetch()

      if (this.importContactsResponse.ok) {
        this.$refs.importModal.close()

        this.$toast.success(
          this.$t('app.inventory.campaigns.create.import.import_success')
        )
      } else {
        this.$toast.error(
          this.$t('app.inventory.campaigns.create.import.import_error')
        )
      }
    },

    async submitNewCampaign() {
      this.newCampaignSaving = true
      const campaignToSend = Object.assign(
        {
          send_at: moment(
            this.campaign.sendDate + ' ' + this.campaign.sendTime + ':00'
          )
            .utc()
            .format('Y-MM-DD HH:mm:ss'),
          organizationUnit: {
            connect: this.unitId
          },
          inventoryItems: {
            connect: this.selectedInventory
          },
          packageItems: {
            connect: this.selectedPackages
          },
          recipients: {
            connect: this.selectedContacts
          }
        },
        this.campaign
      )
      delete campaignToSend.sendDate
      delete campaignToSend.sendTime

      try {
        await this.$apollo
          .mutate({
            ...CreateCampaignMutation,
            variables: {
              input: campaignToSend
            },
            refetchQueries: [
              {
                ...CampaignsPaginatedQuery,
                variables: {
                  page: 1,
                  size: 10,
                  id: this.unitId
                }
              }
            ]
          })
          .then(() => {
            this.campaign = {
              name: null,
              message: null,
              sendDate: null,
              sendTime: null
            }
            this.$toast.success(
              this.$t('app.inventory.campaigns.create.messages.success')
            )
            this.$router.push(
              this.localePath({
                name: 'unit-id-inventory-campaigns',
                params: { id: this.unitId }
              })
            )
          })
      } catch (err) {
        this.$toast.error(
          this.$t('app.inventory.campaigns.create.messages.error')
        )
      }
      this.newCampaignSaving = false
    },

    createCampaign() {
      const validatedForm = this.$refs.newCampaignForm.validate()
      const validContacts = this.selectedContacts.length !== 0
      const validItems =
        this.selectedInventory.length !== 0 ||
        this.selectedPackages.length !== 0

      if (!validContacts) {
        this.$toast.error(
          this.$t('app.inventory.campaigns.create.recipients.required')
        )
      }

      if (!validItems) {
        this.$toast.error(
          this.$t('app.inventory.campaigns.create.items.required')
        )
      }

      if (validatedForm && validContacts && validItems) {
        this.submitNewCampaign()
      }
      this.$refs.saveCampaign.loaded()
    },

    async submitNewContact() {
      this.newContact.organizationUnit = {
        connect: this.unitId
      }
      this.newContactSaving = true
      try {
        await this.$apollo
          .mutate({
            ...SubmitContactMutation,
            variables: {
              input: this.newContact
            }
          })
          .then(({ data }) => {
            this.newContact = {
              name: null,
              email: null,
              company: null
            }
            this.$toast.success(
              this.$t(
                'app.inventory.campaigns.create.new_contact.messages.success'
              )
            )
            this.contacts.push(data.createContact)
            this.selectedContacts.push(data.createContact.id)
          })
      } catch (err) {
        this.$toast.error(
          this.$t('app.inventory.campaigns.create.new_contact.messages.error')
        )
      }
      this.newContactSaving = false
    },

    save() {
      if (this.$refs.newContactForm.validate()) {
        this.submitNewContact()
        this.$refs.saveBtn.loaded()
        this.$refs.addAnotherModal.close()
      }
    },

    saveAndAddAnother() {
      if (this.$refs.newContactForm.validate()) {
        this.submitNewContact()
        this.$refs.saveAddAnotherBtn.loaded()
        this.$refs.newContactName.$el.focus()
      }
    },

    selectAllContacts() {
      this.selectedContacts = [
        ...new Set(this.contacts.map(contact => contact.id))
      ]
    },

    unselectAllContacts() {
      this.selectedContacts = []
    },

    selectAllInventoryItems() {
      this.selectedInventory = [
        ...new Set(this.inventories.map(item => item.id))
      ]

      this.selectedPackages = [...new Set(this.packages.map(item => item.id))]
    },

    unselectAllInventoryItems() {
      this.selectedInventory = []
      this.selectedPackages = []
    },

    onCategoryClick(newVal, categoryName) {
      if (this.availableMainCategories[categoryName].target === 'package') {
        this.onPackageCategoryClick(newVal, categoryName)
      } else if (newVal === null) {
        this.groupedInventoryByCategory[categoryName]
          .map(category => category.id)
          .map(
            removedInventoryItem =>
              (this.selectedInventory = removeItemFromArray(
                this.selectedInventory,
                removedInventoryItem
              ))
          )
      } else {
        this.selectedInventory = [
          ...new Set(
            this.selectedInventory.concat(
              this.groupedInventoryByCategory[newVal].map(
                category => category.id
              )
            )
          )
        ]
      }
    },

    onPackageCategoryClick(newVal, categoryName) {
      if (newVal === null) {
        this.groupedPackagesByCategory[categoryName]
          .map(category => category.id)
          .map(
            removedInventoryItem =>
              (this.selectedPackages = removeItemFromArray(
                this.selectedPackages,
                removedInventoryItem
              ))
          )
      } else {
        this.selectedPackages = [
          ...new Set(
            this.selectedPackages.concat(
              this.groupedPackagesByCategory[newVal].map(
                category => category.id
              )
            )
          )
        ]
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.campaign__create {
  .campaign__header {
    @apply .bg-white .border-b .border-grey-l4 .py-4 .flex .relative;
    height: 80px;
  }

  .campaign__body {
    max-width: 1424px;

    ul.items-types {
      @apply .w-full .border-b .border-grey-l3 .pb-2 .mb-4;

      li {
        @apply .inline .px-2 .text-grey .relative .cursor-pointer;

        &.active {
          @apply .text-black .cursor-default;

          &:before {
            @apply .-mb-px .border-b-2 .border-red .absolute .left-0 .right-0;
            bottom: -0.5rem;
            content: ' ';
            height: 1px;
          }
        }
      }
    }
  }

  .accordion-header {
    justify-content: flex-start !important;
  }

  .arrow {
    @apply .my-auto .ml-2 .flex-grow;

    &.right {
      > .arrow-end {
        &:before,
        &:after {
          width: 9px;
        }

        &:before {
          transform: rotate(40deg);
        }

        &:after {
          transform: rotate(-40deg);
        }
      }
    }

    > .arrow-end {
      @apply .bg-grey-l3 .h-2px .relative .block;

      &:before,
      &:after {
        @apply .bg-grey-l3 .h-2px .block .absolute .right-0 .top-0;
        content: '';
      }

      &:before {
        transform-origin: top right;
      }

      &:after {
        transform-origin: bottom right;
      }
    }
  }
  .step-content-wrapper {
    @apply .w-full .text-h5 .pb-2;
  }

  .step-content {
    @apply .w-full .bg-white .px-4 .py-6;
    max-height: calc(100vh - 16rem);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.06);

    &.with-scroll {
      @apply .overflow-y-scroll .overflow-x-hidden;
    }

    &.with-button {
      max-height: calc(100vh - 20rem);
    }
  }
}

@screen md {
  .campaign__create {
    .step-content {
      @apply .min-w-88 .max-w-sm;
      min-height: calc(100vh - 16rem);

      &.with-button {
        min-height: calc(100vh - 20rem);
      }
    }
  }
}

.modal {
  max-width: 30rem !important;
}
</style>
