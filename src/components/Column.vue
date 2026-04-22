<script setup>
import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import TaskCard from './TaskCard.vue';
import { IonButton, IonButtons, IonContent, IonIcon, IonPopover } from '@ionic/vue';
import { addCircleOutline, ellipsisVerticalOutline} from 'ionicons/icons'
import draggable from 'vuedraggable'
import '@/scss/Column.scss'

const props = defineProps(['column'])

const store = useStore()

const list = ref([])

// const tasks = computed(() =>
//     // store.state.task.tasks.filter(t => t.columnId === props.column.id)
//     store.getters['task/taskByColumn'](props.column.id)
// )

const localTasks = ref([])

const tasks = computed(() => {
  return store.state.task.tasks.filter(
    t => t.columnId === props.column.id
  )
})

// watchEffect(() => {
//   localTasks.value = store.state.task.tasks.filter(
//     t => t.columnId === props.column.id
//   )
// })

const popOverOpen = ref(false)

const event = ref(null)

const openPopOver = (e = event) => {
    event.value = e
    popOverOpen.value = true
}

const onAdd = (e) => {
  const task = e.item.__draggable_context.element

  store.dispatch('task/updateTask', {
    ...task,
    columnId: props.column.id
  })
}
const onDragEnd = (e) => {
  const task = e.item.__draggable_context.element

  if (task.columnId !== props.column.id) {
    store.dispatch('task/updateTask', {
      ...task,
      columnId: props.column.id
    })
  }
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}

const isDragging = ref(false)

const handleAdd = () => {
  if (isDragging.value) return // 🔥 block saat drag
  emit('add')
}

</script>

<template>
    <div class="column" @click.stop>
        <div class="headerCard">
            <div class="actionsCard">
                <h3 >{{ column.name }}</h3>
                <span @click="$emit('add')" class="buttonAddTask">+</span>
                <IonIcon @click="openPopOver($event)" :icon="ellipsisVerticalOutline" style="cursor: pointer;" />
                <IonPopover :is-open="popOverOpen" :event="event" @did-dismiss="popOverOpen = false">
                    <IonContent class="ion-padding" @click="$emit('editColumn', column), popOverOpen = false" style="cursor: pointer;" >
                        Edit List
                    </IonContent>
                    <IonContent class="ion-padding" @click="$emit('deleteColumn', column), popOverOpen = false" style="cursor: pointer;" >
                        Delete List
                    </IonContent>
                </IonPopover>
            </div>
        </div>
        <!-- <pre>{{ localTasks }}</pre> -->
        <draggable
            :list="tasks"
            group="tasks"
            item-key="id"
            @end="onDragEnd"
            class="draggable-area"
             @add="onAdd"
            @start="isDragging = true"
            >
            <template #item="{ element }">
                <TaskCard :task="element" @edit="$emit('edit', $event)"/>
            </template>
            <template #footer>
              <div v-if="tasks.length === 0" class="empty-drop">
                Drop here
              </div>
            </template>
        </draggable>
        <!-- <TaskCard
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @edit="$emit('edit', $event)"
        /> -->
    </div>
</template>

<style>
.column {
    min-width: 250px;
    background: #f4f5f7;
    padding: 10px;
    border-radius: 10px;
}
.draggable-area {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-drop {
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}

.dragging {
  pointer-events: none;
}
</style>