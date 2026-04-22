<script setup>
import '@/scss/AvatarGroup.scss'
import ava1 from '@/assets/img/ava1.jpg'
import ava2 from '@/assets/img/ava2.jpg'
import ava3 from '@/assets/img/ava3.jpg'
import ava4 from '@/assets/img/ava4.jpg'
import ava5 from '@/assets/img/ava5.jpg'
import ava6 from '@/assets/img/ava6.jpg'
import { computed } from 'vue'

const props = defineProps(['maxCounts'])

const users = [
    ava1,
    ava2,
    ava3,
    ava4,
    ava5,
    ava6,
]

const maxVisible = 4

const avatars = computed(() => users.slice(0, props.maxCounts))
const extraCount = computed(() => users.length - props.maxCounts)
console.log(props.maxCounts, 'maxCount')
</script>

<template>
    <div class="avatar-group">
        <div
            v-for="(user, index) in avatars"
            :key="index"
            class="avatar"
            :style="{zIndex:10 - index}"
        >
            <img :src="user" />
        </div>

        <div v-if="extraCount > 0" class="avatar more">
            +{{ extraCount }}
        </div>
    </div>
</template>
