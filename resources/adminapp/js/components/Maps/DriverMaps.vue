<template>
    <div>
        <div class="map" style="width: 100vw; height: 100vh"></div>
    </div>
</template>

<script>
export default {
        name: "DriverMap",
        data(){
            return {
                platform: {},
                mmap: {},
            }
        },
        props:{
            apiKey: String,
            appId: String,

        },
}
</script>
