<script setup>
import { formatPrice } from '@/utils/formatPrice'

import { useLangStore } from '~/store/lang'

const langStore = useLangStore()

const props = defineProps({
    floor: {
        type: Object,
        required: true
    }
})
const formattedPrice = computed(() => {
    return formatPrice(props.floor.price)
})

const images = computed(() => {
    return props.floor.images
})

const currentIndex = ref(0)

const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const index = Math.floor(x / (rect.width / images.value.length))
    currentIndex.value = Math.min(Math.max(index, 0), images.value.length - 1)
}

const handleMouseLeave = () => {
    currentIndex.value = 0
}


</script>

<template>
    <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="rounded-t-lg w-full object-cover object-center h-[250px] sm:h-[350px] md:h-[450px] aspect-video relative overflow-hidden"
            @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <img v-for="(image, index) in images" :key="index" :src="image" :alt="`Image ${index + 1}`"
                class="absolute w-full h-full object-cover object-center transition-opacity duration-200"
                :class="{ 'opacity-0': index !== currentIndex, 'opacity-100': index === currentIndex }">
            <div class="absolute bottom-2 left-0 right-0 md:flex hidden justify-center gap-2 flex-wrap px-3">
                <button v-for="(image, index) in images" :key="index" class="w-3 h-1 rounded-full bg-white" :class="{ 'w-5 h-1 bg-slate-700': index === currentIndex }" @click="currentIndex = index"></button>
            </div>
        </div>

        <div class="p-5 ">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{langStore.lang === 'RU' ? props.floor.title.ru : props.floor.title.en}}
            </h2>
            <div class="mb-3 flex flex-wrap gap-2">
                <button v-for="item in props.floor.type" type="button"
                    class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                        item }}</button>
            </div>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ formattedPrice }}</span>
                <NuxtLink :to="`/floors/${props.floor.id}`" type="link"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ langStore.lang === 'RU' ? 'Подробнее' : 'More' }}</NuxtLink>
            </div>
        </div>
    </div>
</template>



<style lang="">

</style>