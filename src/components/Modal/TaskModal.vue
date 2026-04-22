    <script setup>
    import { IonButton, IonCheckbox, IonContent, IonDatetime, IonIcon, IonImg, IonInput, IonLabel, IonModal, IonSelect, IonSelectModal, IonSelectOption, IonTextarea } from '@ionic/vue'
    import { closeOutline} from 'ionicons/icons'
    import { ref, watch, computed } from 'vue'
    import { useStore } from 'vuex'
    import '@/scss/TaskModal.scss'

    const props = defineProps({
        isOpen: Boolean,
        task: Object,
    })

    const emit = defineEmits(['close', 'save'])

    const store = useStore()

    const columns = computed(() => store.state.column.columns)

    const form = ref({
        id: null,
        title: '',
        assignee: '',
        dueDate: '',
        columnId: '',
        priority: '',
        label: '',
        description: '',
        cover: '',
        checklist: [],
        attachment: [],
    })


    const defaultForm = () => ({
    id: null,
    title: '',
    assignee: '',
    dueDate: '',
    columnId: '',
    priority: '',
    label: '',
    description: '',
    cover: '',
    checklist: [],
    attachment: [],
    })

    const originalTask = ref(null)

    const attachmentInput = ref(null)

    watch(() => props.task, (val) => {
        if(val){
            originalTask.value = val
            form.value = val
        } else {
            form.value = defaultForm()
            originalTask.value = null
        }
    }, { immediate: true })

    const addChecklist = () => {
        form.value.checklist.push({ text: '', done: false })
    }

    const removeChecklist = (index) => {
        form.value.checklist.splice(index, 1)
    }

    const handleFile = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                form.value.attachment.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    url: reader.result
                })
            }

            reader.readAsDataURL(file)
        })
    }

    const removeAttachment = (index) => {
        form.value.attachment.splice(index, 1)
    }

    const close = () => {
        if (originalTask.value) {
            form.value = originalTask.value
        } else {
            form.value = defaultForm()
        }
        emit('close')
    }

    const handleSubmit = () => {
        emit('save', { ...form.value })
    }

    const triggerAttachment = () => {
        attachmentInput.value.click()
    }


    const fileInput = ref(null)

    const triggerFile = () => {
        console.log('trigger')
        fileInput.value.click()
    }

    const handleCover = (e) => {
        const file = e.target.files[0]
        if(!file) return

        const reader = new FileReader()
        reader.onload = () => {
            form.value.cover = reader.result
        }

        reader.readAsDataURL(file)
        
        console.log(form.cover)
    }

    </script>

    <template>
        <IonModal :is-open="isOpen" @did-dismiss="close">
            <IonContent class="ion-padding">
                <div class="header">
                    <div class="btn-close" @click="close">
                        ✕
                    </div>
                    <!-- <IonIcon :icon="closeOutline" @click="close"/> -->
                </div>

                <div class="cover" @click="triggerFile">
                    <IonImg v-if="form.cover" :src="form.cover" class="cover-img" />
                    <p v-else>+ Add Cover Image</p>

                    <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        hidden 
                        @change="handleCover"
                    />
                </div>

                <div class="container">
                    <h2>{{ form.title || 'Task Title' }}</h2>

                    <div class="row" style="justify-content: space-between;">
                        <div style="width: 100%;">
                            <label>Assignee</label>
                            <IonInput v-model="form.assignee" placeholder="Assigne"/>
                        </div>

                        <div style="width: 100%;">
                            <label>Due Date</label>
                            <IonDatetime presentation="date" v-model="form.dueDate" /> 
                        </div>
                    </div>

                    <div class="row" style="justify-content: space-between;">
                        <div style="width: 100%;">
                            <label>Board</label>
                            <IonSelect v-model="form.board">
                                <IonSelectOption value="low">Low</IonSelectOption>
                                <IonSelectOption value="medium">Medium</IonSelectOption>
                                <IonSelectOption value="high">High</IonSelectOption>
                            </IonSelect>
                        </div>

                        <div style="width: 100%;">
                            <label>Column</label>
                            <IonSelect v-model="form.columnId">
                                <IonSelectOption
                                    v-for="col in columns"
                                    :key="col.id"
                                    :value="col.id"
                                >
                                    {{ col.name }}
                                </IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div class="row" style="justify-content: space-between;">
                        <div style="width: 100%;">
                            <label>Priority</label>
                            <IonSelect v-model="form.priority">
                                <IonSelectOption value="low">Low</IonSelectOption>
                                <IonSelectOption value="medium">Medium</IonSelectOption>
                                <IonSelectOption value="high">High</IonSelectOption>
                            </IonSelect>
                        </div>

                        <div style="width: 100%;">
                            <label>Label</label>
                            <IonSelect v-model="form.label">
                                <IonSelectOption value="undefined">Undefined</IonSelectOption>
                                <IonSelectOption value="bug">Bug</IonSelectOption>
                                <IonSelectOption value="feature">Feature</IonSelectOption>
                                <IonSelectOption value="issue">Issue</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>Description</label>
                            <IonTextarea v-model="form.description"/>
                        </div>

                        <div>
                            <h4>Attachment</h4>
                            <p class="attachment" @click="triggerAttachment">Browse from device</p>

                            <input
                                type="file"
                                ref="attachmentInput"
                                hidden 
                                @change="handleFile"
                            />
                            <!-- <input type="file" @change="handleFile" /> -->

                            <div class="attachment-list">
                                <div
                                    v-for="(file, i) in form.attachment"
                                    :key="i"
                                    class="attachment-item"
                                >
                                    <img v-if="file.url.startsWith('data:image')" :src="file.url" />
                                    <div class="file-info">
                                        <p>{{ file.name }}</p>
                                    </div>

                                    <span class="delete" @click="removeAttachment(i)">✕</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4>Checklist</h4>
                            <div
                                v-for="(item, i) in form.checklist"
                                :key="i"
                                class="checklist-item"
                            >
                                <IonCheckbox v-model="item.done" />
                                <IonInput 
                                    v-model="item.text"
                                    class="checklist-input"
                                    placeholder="Subtask..."
                                />

                                <span class="delete" @click="removeChecklist(i)">X</span>
                            </div>
                            <IonButton @click="addChecklist">
                                + Add Subtask
                            </IonButton>
                        </div>
                    </div>
                    
                    <div class="actions">
                        <IonButton expand="block" @click="handleSubmit">Simpan</IonButton>
                        <IonButton expand="block" color="medium" @click="close">Batal</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    </template>