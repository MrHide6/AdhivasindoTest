<script setup lang="ts">
import '@/scss/PageView.scss'
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, isPlatform } from '@ionic/vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import BoardColumn from '@/components/Column.vue'
import TaskModal from '@/components/Modal/TaskModal.vue';
import ColumnModal from '@/components/Modal/ColumnModal.vue';
import { lockClosedOutline, chevronDownOutline, swapVerticalOutline, funnelOutline, personAddOutline} from 'ionicons/icons';
import AvatarGroup from '@/components/AvatarGroup.vue';

const store = useStore()

const columns = computed(() => store.getters['column/allColumn'])

const showAlert = ref(false)

const columnDelete = ref(null)

const isOpen = ref(false)

const selectedTask = ref(null)

const isColumnOpen = ref(false)

const selectedColumn = ref(null)

const openModal = (task = null) => {
    selectedTask.value = task
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const openModalColumn = (column = null) => {
    selectedColumn.value = column
    isColumnOpen.value = true
}

const closeModalColumn = () => {
    isColumnOpen.value = false
}

const saveTask = (task) => {
    if(task.id){
        store.dispatch('task/updateTask', task)
    } else {
        store.dispatch('task/addTask', {
            ...task,
            id: Date.now()
        })
    }
    closeModal()
}

const saveColumn = (column) => {
    if(selectedColumn.value){
        store.dispatch('column/updateColumn', column)
    } else {
        store.dispatch('column/addColumn', column)
    }
    closeModalColumn()
}

const handleDeleteColumn = (column) => {
    columnDelete.value = column.id
    showAlert.value = true
}


</script>

<template>
    <IonAlert
        :is-open="showAlert"
        header="Confirmation"
        message="Delete List ?"
        :buttons="[
            {text: 'Cancel', role: 'Cancel'},
            {
                text: 'Delete', 
                handler: () => {
                    store.dispatch('column/deleteColumn', columnDelete)
                    showAlert = false
                }
            }
        ]" 
    />
    <ColumnModal
        :is-open="isColumnOpen"
        :column="selectedColumn"
        @close="closeModalColumn"
        @save="saveColumn" 
    />
    <TaskModal 
        :is-open="isOpen"
        :task="selectedTask"
        @close="closeModal"
        @save="saveTask"
    />
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonGrid >
                    <IonRow class="header">
                        <IonCol class="left">
                            <div class="left">
                                <IonIcon :icon="lockClosedOutline" />
                                <span style="font-size: 20px;">Adhivasindo</span>
                                <IonIcon :icon="chevronDownOutline"/>
                            </div>
                            <div>
                                <AvatarGroup :maxCounts="5"/>
                            </div>
                            <div class="buttonInvite">
                                <IonIcon :icon="personAddOutline" />
                                <span>Invite</span>
                            </div>
                        </IonCol>
                        <IonCol size="auto">
                            <div class="right">
                                <div class="buttonFilter">
                                    <IonIcon :icon="funnelOutline" />
                                    <span>Filter</span>
                                </div>
                                <div class="buttonExport">
                                    <IonIcon :icon="swapVerticalOutline" />
                                    <span>Export / Import</span>
                                </div>
                                <IonSearchbar placeholder="Search Task" />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <div class="board">
                <BoardColumn
                    v-for="col in columns"
                    :key="col.id"
                    :column="col"
                    @edit="openModal"
                    @editColumn="openModalColumn"
                    @add="openModal"
                    @deleteColumn="handleDeleteColumn"
                />
                <div class="add-column" @click="openModalColumn()">
                    <span class="plus">+</span>
                    <span>Add new List</span>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>

<style>
.board{
    display: flex;
    gap: 16px;
    padding: 16px;
    overflow-x: auto;
}
</style>