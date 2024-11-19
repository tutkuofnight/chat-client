<script setup>
import useUserStore from "@/store/user"
import { useToast } from "primevue/usetoast";

const userStore = useUserStore()

const visible = ref(false)
const toast = useToast()
const fileupload = ref()
const previewImage = ref()

const popover = ref()
const togglePopover = e => {
    popover.value.toggle(e)
}

const onUpload = (e) => {
    let file = fileupload.value.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        previewImage.value = reader.result
    }
};

const saveChanges = async () => {
    const res = await userStore.updateProfileImage(fileupload.value.files[0])
    console.log(res)
}
const previewImageController = computed(() => {
    if (previewImage.value) {
        return previewImage.value
    }
    return `/images/${userStore.user?.profileImage}`
})
</script>

<template>
    <div>
        <Button class="profile-btn" :unstyled="true" @click="togglePopover">
            <Avatar v-if="userStore.user" :image="`/images/${userStore.user.profileImage}`" size="small" shape="circle" />
        </Button>

        <Popover ref="popover">
            <div>
                <p style="padding: 5px 0;">Profile</p>
                <div class="popover-content">
                    <Button label="Edit Profile" severity="secondary" outlined  @click="visible = true"></Button>
                    <Button label="Sign out" severity="secondary" outlined></Button>
                </div>
            </div>
        </Popover>

        <Dialog class="profile-dialog" v-model:visible="visible" modal header="Edit Profile"
            :style="{ width: '25rem' }">
            <div class="upload-profile-image">
                <Avatar :image="previewImageController" size="xlarge"
                    style="width: 100px; height: auto;" shape="circle" />
                <div class="upload-area">
                    <p>Change Profile Image</p>
                    <FileUpload ref="fileupload" mode="basic" name="profileImage" accept="image/*"
                        :maxFileSize="1000000" @upload="onUpload($event)" @change="onUpload" /> 
                </div>
            </div>
            <div class="bottom">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="saveChanges()"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped>
.popover-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.profile-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.profile-dialog {
    .p-dialog-content {
        display: flex;
        justify-content: center;
    }

    .upload-profile-image {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;

        .upload-area {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    .text-field {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;

        label {
            font-weight: 500;
        }
    }

    .bottom {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
}
</style>