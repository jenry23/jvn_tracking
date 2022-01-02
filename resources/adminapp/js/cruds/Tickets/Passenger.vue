<template>
    <div class="full-screen-map">
        <div class="col-md-12">
            <div class="card">
                <center>
                    <div class="card-header">
                        <back-button></back-button>
                        <router-link
                            class="btn btn-info"
                            :to="{
                                name: 'tickets.scan',
                                params: {
                                    id: this.$route.params.id,
                                    status: pickup,
                                },
                            }"
                        >
                            PICKUP
                        </router-link>
                        <router-link
                            class="btn btn-danger"
                            :to="{
                                name: 'tickets.scan',
                                params: {
                                    id: this.$route.params.id,
                                    status: dropoff,
                                },
                            }"
                        >
                            DROPOFF
                        </router-link>
                    </div>
                    <div
                        class="card-body"
                        v-for="datas in passenger"
                        :key="datas.id"
                    >
                        <div v-if="datas.pickup == true">
                            <b>{{ datas.name }}</b> -
                            <i class="material-icons" style="color: green"
                                >check</i
                            >
                            <h5>
                                <b>Pickup Time: {{ datas.start_time }}</b>
                                <br />
                                <b>Dropoff Time: {{ datas.end_time }}</b>
                            </h5>
                        </div>
                        <div v-else>
                            <b>{{ datas.name }}</b> -
                            <i class="material-icons" style="color: red"
                                >block</i
                            >
                        </div>
                    </div>
                </center>
            </div>
        </div>
    </div>
</template>
<script>
import * as fb from "../../firebase";

export default {
    data() {
        return {
            passenger: [],
            pickup: "pickup",
            dropoff: "dropoff",
        };
    },
    mounted() {
        var id = this.$route.params.id;
        fb.ticketsCollection.doc(id).onSnapshot((response) => {
            var passengerList = response.data().passengerID;
            this.passenger = passengerList;
        });
    },
};
</script>
