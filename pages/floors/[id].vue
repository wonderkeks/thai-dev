<script setup>
import { useObjectsQuery } from '~/components/floors/useObjectsQuery';
import { replaceLineBreaks } from '@/utils/replaseLineBreaks'
import { formatPrice } from '@/utils/formatPrice'
import { useLangStore } from '~/store/lang'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
const route = useRoute()

const { data, isLoading } = useObjectsQuery(+route.params.id)

const langStore = useLangStore()

</script>

<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else-if="data" class="w-full bg-white rounded-lg">
        <div class="rounded-lg md:w-1/2 w-full object-cover object-center h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] aspect-video relative overflow-hidden mx-auto">
            <carousel class="w-full h-full" :items-to-show="1" :autoplay="6000">
                <slide v-for="(img, index) in data.images" :key="index">
                    <img class="object-cover object-center w-full h-full" :src="img" alt="">
                </slide>

                <template #addons>
                    <navigation />
                </template>
            </carousel>
        </div>
        <div class="p-5 ">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ langStore.lang === 'RU'
                ?
                data.title.ru : data.title.en}}
            </h2>
            <div class="mb-3 flex flex-wrap gap-2">
                <button v-for="item in data.type" type="button"
                    class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                        item }}</button>
            </div>
            <div class="mb-3">
                <p v-html="replaceLineBreaks(langStore.lang === 'RU' ? data.description.ru : data.description.en)"
                    class="font-normal text-gray-700 dark:text-gray-400"></p>
            </div>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ formatPrice(data.price) }}</span>
            </div>
        </div>
    </div>

</template>



<style lang="">

</style>