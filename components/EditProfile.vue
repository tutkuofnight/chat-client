<script setup>
import useUserStore from "@/store/user"
import { useToast } from "primevue/usetoast";

const userStore = useUserStore()

const visible = ref(false)
const toast = useToast();
const fileupload = ref();

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const saveChanges = () => {
    fileupload.value.upload();
    visible.value = false
}

</script>

<template>
    <Button class="profile-btn" :unstyled="true" @click="visible = true">
        <Avatar :image="`/images/${userStore.user.profileImage || 'default-avatar.jpg'}`" size="small" shape="circle" />
    </Button>
    <Dialog class="profile-dialog" v-model:visible="visible" modal header="Edit Profile" :style="{ width: '50rem' }">
        <div class="upload-profile-image">
            <Avatar :image="`/images/${userStore.user.profileImage || 'default-avatar.jpg'}`" size="xlarge" style="width: 100px; height: auto;"
                shape="circle" />
            <div class="upload-area">
                <p>Change Profile Image</p>
                <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*"
                    :maxFileSize="1000000" @upload="onUpload" />
            </div>
        </div>
        <div class="text-field">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="bottom">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="saveChanges()"></Button>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
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