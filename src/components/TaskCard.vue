<script setup>
import { IonImg, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue';
import { createOutline } from 'ionicons/icons'
import AvatarGroup from './AvatarGroup.vue';
import '@/scss/TaskCard.scss'

defineProps(['task'])

</script>

<template>
    <IonCard>
        <IonCardContent>
            <div :class="task.cover ? 'buttonEditImage' : 'buttonEdit'">
                <IonIcon :icon="createOutline" color="primary" @click="$emit('edit', task)"/>
                <!-- <IonButton size="small" @click="$emit('edit', task)">Edit</IonButton> -->
            </div>
            <IonImg v-if="task.cover" :src="task.cover" class="cover"/>
            <div class="label">
                <span class="label-color">{{ task.label }}</span>
            </div>
            <div>
                {{ task.title }}
            </div>
            <div class="footer">
                <span>{{ task.dueDate }}</span>
                <AvatarGroup :maxCounts="3" />
            </div>
        </IonCardContent>
        <!-- <div>
            <AvatarGroup :maxCounts="3" />
        </div> -->
    </IonCard>
</template>
