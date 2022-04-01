<template>
  <div class="w-50 top-16">
    <Combobox v-model="value">
      <div class="relative mt-1">
        <div
          class="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden"
        >
          <ComboboxInput
            class="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            :display-value="(option) => option.name"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon 
              class="w-5 h-5 text-gray-400" 
              aria-hidden="true" 
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="cursor-default select-none relative py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>
            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option.id"
              v-slot="{ isSelected, active }"
              as="template"
              :value="option"
            >
              <li
                class="cursor-default select-none relative py-2 pl-10 pr-4"
                :class="{
                  'text-white bg-teal-600': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': isSelected, 'font-normal': !isSelected }"
                >
                  {{ option.name }}
                </span>
                <span
                  v-if="isSelected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon 
                    class="w-5 h-5" 
                    aria-hidden="true" 
                  />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch, toRefs } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { IDropdownOption } from '../../../types'

export default defineComponent({
  name: 'DropDown',
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    SelectorIcon,
    CheckIcon,
  },
  props: {
    options: {
      type: Array as PropType<IDropdownOption[]>,
      required: true,
    },
    modelValue: { 
      type: Object as PropType<IDropdownOption>,
      default: () => {
        return { id: 0, name: '' }
      },
      requred: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { options } = toRefs(props)

    const value = computed({
      get: () => props.modelValue,
      set: (selected: IDropdownOption) => emit('update:modelValue', selected),
    })
    
    let query = ref('')

    let filteredOptions = computed(() =>
      query.value === ''
        ? options.value
        : options.value.filter((option) =>
            option.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.value.toLowerCase().replace(/\s+/g, '')),
          ),
    )

    return {
      value,
      query,
      filteredOptions,
    }
  },
})
</script>