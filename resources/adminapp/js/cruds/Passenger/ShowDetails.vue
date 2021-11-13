<template>
    <div>
        <p>{{passenger}}</p>
         <button size="lg" class="mx-2">
      <button :disabled="prev_btn" @click="previous" >&laquo;</button>
      <button :disabled="next_btn" @click="next">&raquo;</button>
    </button>
    </div>
</template>
<script>
import * as fb from '../../../firebase'

export default {
 data () {
  return {
   passenger: [],
   limit: 10,
   lastVisible: '',
   firstVisible: '',
   next_btn: false,
   prev_btn: true
  }
 },
 methods: {
  next () {
   if (!this.next_btn) {
   // bind data with passenger
   this.passenger = fb.passengerColletion.orderBy('name').startAfter(this.lastVisible).limit(this.limit)
    // this.$bind('passenger', fb.passengerColletion.orderBy('name').startAfter(this.lastVisible).limit(this.limit))
    // set last and first visible items
    fb.passengerColletion.orderBy('name').startAfter(this.lastVisible).limit(this.limit).get().then(documentSnapshots => {
     this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
     this.firstVisible = documentSnapshots.docs[0]
    }).then(() => {
     // Peep  on the next  next query to see if it gives zero
     fb.passengerColletion.orderBy('name').startAfter(this.lastVisible).limit(this.limit).get()
      .then(snap => {
       if (snap.size === 0) {
        //disable button if the next peeped result gets zero
        this.next_btn = true
        // enable previous button
        this.prev_btn = false
       } else {
        // enable next button if peeped result is not zero
        this.next_btn = false
        // enable previous button
        this.prev_btn = false
       }
      })
    })
   }
  },
  previous () {
   // Ensure previous is not zero
   fb.passengerCollection.orderBy('name').endBefore(this.firstVisible).limitToLast(this.limit).get().then(snap => { return snap.size })
   .then(size => {
    //confirm is not zero here
    if (size !== 0) {
     //bind the previous to passenger
       this.passenger =  fb.passengerCollection.orderBy('name').endBefore(this.firstVisible).limitToLast(this.limit);
     // Set last and first visible
     fb.passengerCollection.orderBy('name').endBefore(this.firstVisible).limitToLast(this.limit).get().then(documentSnapshots => {
      this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      this.firstVisible = documentSnapshots.docs[0]
     }).then(() => {
      // peep the next previous query
      fb.passengerCollection.orderBy('name').endBefore(this.firstVisible).limitToLast(this.limit).get()
       .then(snap => {
        if (snap.size === 0) {
         //if next peeped previous button gets 0 disable
         this.prev_btn = true
         this.next_btn = false
        } else {
         //if next peeped result is does not get 0 enable buttons
         this.prev_btn = false
         this.next_btn = false
        }
       })
     })
    }
   })
  }
 },
 mounted () {
  // run first query and bind data
  this.passenger =  fb.passengerCollection.orderBy('name').limit(this.limit);
  // set last and first Visible
  fb.passengerCollection.orderBy('name').limit(this.limit).get().then(documentSnapshots => {
   this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
   this.firstVisible = documentSnapshots.docs[0]
  }).then(() => {
            // peep to check if next should be on or off
            fb.passengerCollection.orderBy('name').startAfter(this.lastVisible).limit(this.limit).get()
                .then(snap => {
                    if (snap.size === 0) {
                        this.next_btn = true
                    }
                })
        })
 }
}
</script>