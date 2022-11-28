<template>
  <uni-list>
    <uni-list-item v-for="i in list" :key="i._id"
                   clickable showArrow
                   link
                   :to="`/NearbyBooksShare/apply?ubid=`+i._id"
                   :title="i.book.title"
                   :note="`${i.book.year} ${i.book.author_name} ${i.book.isbn}`"
                   :thumb="i.book.pic"
    />
  </uni-list>
</template>

<script setup>
import {getLocation} from "@/features/common/services/useLocation";
import {findGps} from "@/NearbyBooksShare/models/UserBooks";
import Books from "@/NearbyBooksShare/models/Books";
import {me} from "@/features/common/services/mpserverless";

let list = $ref([])

Promise.all([
  getLocation(),
  me()
])
.then(([location, me]) => {
  const query = {
    // auth:{
    //   userId: {
    //     $not: me.userId
    //   }
    // }
  }
  findGps([location.longitude, location.latitude], 50000, query)
      .then((userBooks) => {
        userBooks = userBooks.filter(i => i.auth.userId !== me.userId)
        Books.find({
          _id: {
            $in: userBooks.map(i => i.bookid)
          }
        }).then(books => {
          list = userBooks.map(i => {
            i.book = books.find(ii => ii._id === i.bookid)
            return i
          })
        })
      })
}).catch(e => {
  uni.showToast({
    title: e.message,
    icon: 'none',
    duration: 5000
  })
})

uni.setNavigationBarTitle({title: '附近图书'})
</script>
