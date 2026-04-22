<script setup>
import { IonButton, IonContent, IonInput, IonModal } from '@ionic/vue';
import { ref, watch } from 'vue'
import '@/scss/ColumnModal.scss'

const props = defineProps({
    isOpen: Boolean,
    column: Object,
})

const emit = defineEmits(['close', 'save'])

const name = ref('')

watch(() => props.column, (val) => {
    if(val){
        name.value = val.name
    } else {
        name.value = ''
    }
}, { immediate: true})

const close = () => emit('close')

const handleSubmit = () => {
    console.log(props.column, 'savbe')
    if(!name.value) return

    emit('save', {
        id: props.column?.id || Date.now().toString(),
        name: name.value
    })
}

</script>

<template>
    <IonModal :is-open="isOpen" @did-dismiss="close">
        <IonContent class="ion-padding">
            <h2>{{ column ? "Edit List" : "Add List" }}</h2>
            <IonInput
                v-model="name" 
                placeholder="Name List"
            />
            <div class="actions">
                <IonButton expand="block" @click="handleSubmit">Simpan</IonButton>
                <IonButton expand="block" color="medium" @click="close">Batal</IonButton>
            </div>
        </IonContent>
    </IonModal>
</template>